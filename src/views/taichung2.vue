<template>
  <div class="side-body">
    <div class="container d-flex">
      <div class="row left">
        <div class="side-bar d-flex">
          <div class="time">
            <p>更新時間：<span class="change-time">{{ this.changeTime }}</span></p>
          </div>
          <h1>預設<span class="second">{{ countdownTime }}</span>秒更新</h1>
          <div class="container d-flex hardly">
            <input v-model="countdownTime" type="number" min="1" max="60" placeholder="最多60s" name="second" required
              oninput="validity.valid||(value='')" :disabled="isDisabled"><span>秒</span>
            <input class="page-link" type="button" value="Start" @click="clickTimer(countdownTime)" :class="{'disabled': btnDisabled}">
            <input class="page-link" type="button" value="Stop" @click="clearTimer2()" :class="{'disabled': !btnDisabled}">
          </div>
          <div class="statistics">
            <div class="voting-stations">
              <p>完成報票投開票所數：<span v-if="stats.done ? stats.done : '0'">{{ stats.done }}</span></p>
              <p>該頁面投開票所數：<span v-if="stats.totalTicket ? stats.totalTicket : '0'">{{ stats.totalTicket }}</span></p>
            </div>
            <div class="login-person">
              <p>未登入人數：<span v-if="stats.notLogin ? stats.notLogin : '0'">{{ stats.notLogin }}</span></p>
              <p>該頁面人數：<span v-if="stats.totalPerson ? stats.totalPerson : '0'">{{ stats.totalPerson }}</span></p>
            </div>
          </div>
        </div>
      </div>
      <div class="container right">
        <Pagerouter :visi-bility = "visibility"></Pagerouter>
        <table>
          <Taichung :taichung="newData"></Taichung>
        </table>
      </div>
    </div>
  </div>

</template>

<script>
  import dayjs from 'dayjs'
  import Taichung from '@/components/Taichung'
  import Pagerouter from '@/components/Pagerouter'

  export default {
    components: {
      Taichung,
      Pagerouter
    },
    data() {
      return {
        timerTime: 8,
        newData: [],
        isDisabled: false,
        currentTime: "",
        changeTime: '',
        timerIsRunning: false,
        exitTime: '',
        pause: '',
        timer: '',
        countdownTime: 8,
        visibility: 'pageFour',
        stats: {
          notLogin: Number,
          totalPerson: Number,
          totalTicket: Number,
          done: Number
        }
      }
    },
    methods: {
      getData() {
        const Api = `${process.env.VUE_APP_APIPATH}/GetMonitorTicket4`
        this.axios.get(Api)
          .then(response => {
            if (response.status === 200 || response.data.IsSuccess === true) {
              let responseTime = response.data.ResponseTime
              let getresponseTime = responseTime.substring(11, 19).replace(/\:/g, "：")
              this.changeTime = getresponseTime
              let res = response.data.Data
              res.forEach(oldData => {
                oldData.Done != true ? oldData.Done = '' : oldData.Done = 'Y'
                if (oldData.LoginDate != null) {
                  let logTime = dayjs(oldData.LoginDate).valueOf() //登入時間
                  oldData.LoginDate = logTime
                }
                if (oldData.UpdateDate != null) {
                  let upTime = dayjs(oldData.UpdateDate).valueOf() //上傳時間
                  oldData.UpdateDate = upTime
                }
              })
              this.newData = res;
              this.getVotes(this.newData)
            }
          })
          .catch(error => {
            console.log(error);
          })
      },
      clickTimer(timerTime) {
        this.exitTime = setInterval(this.getData, 1000 * timerTime);
        this.isDisabled = !this.isDisabled;
      },
      getVotes(data) {
        //頁面人數(手機判斷)
        const phone = Array.from(new Set(data.map(item => {
          return item.Phone
        })))
        this.stats.totalPerson = phone.length
        //未登入人數
        const set = new Set()
        const result = data.filter(item => !set.has(item.Phone) ? set.add(item.Phone) : false)
        const login = result.filter(login => login.LoginDate === null)
        this.stats.notLogin = login.length
        //投開票所數
        const areaName = Array.from(new Set(data.map(item => {
          return item.SpotNo
        })))
        this.stats.totalTicket = areaName.length
        //完成報票投開票所數
        const doneSet = new Set()
        const doneResult = data.filter(item => !doneSet.has(item.SpotNo) ? doneSet.add(item.SpotNo) : false)
        const done = doneResult.filter(done => done.Done === 'Y')
        this.stats.done = done.length
      },
      time() {
        const now = new Date();
        let h = (now.getHours() < 10 ? '0' : '') + now.getHours();
        let m = (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
        let s = (now.getSeconds() < 10 ? '0' : '') + now.getSeconds();
        let time = h + "：" + m + "：" + s;
        return time
      },
      clearTimer2() { //清除紀錄
        clearInterval(this.exitTime);
        this.countdownTime = 8;
        this.isDisabled = !this.isDisabled;
      },
    },
    computed: {
      btnDisabled() {
        return this.isDisabled ? true : false
      }
    },
    created() {
      this.getData()
      this.clickTimer(this.timerTime)
    },
  }

</script>
