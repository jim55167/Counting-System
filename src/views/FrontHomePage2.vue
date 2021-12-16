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
          <!-- <div class="btn-box d-flex">
            <button class="stop-btn" @click="clickPause"><i
                class="fas fa-check"></i>{{ timerIsRunning ? "Star" : "Stop"}}(<u>S</u>)</button>
            <button class="end-btn" @click="clearData"><i class="fas fa-sign-out-alt"></i>結束(<u>X</u>)</button>
          </div> -->
          <div class="statistics">
            <div class="voting-stations">
              <p>完成報票投開票所數：<span>{{ stats.done }}</span></p>
              <p>該頁面投開票所數：<span>{{ stats.totalTicket }}</span></p>
            </div>
            <div class="login-person">
              <p>未登入人數：<span>{{ stats.notLogin }}</span></p>
              <p>該頁面人數：<span>{{ stats.totalPerson }}</span></p>
            </div>
          </div>
          <!-- <div class="container d-flex hardly">
            <input v-model="countdownTime" type="number" min="0" max="60" placeholder="最多60s" name="second" required
              oninput="validity.valid||(value='')"><span>秒</span>
            <input type="button" value="調整頻率" @click="clickTimer(countdownTime)">
            <input type="button" value="清除紀錄" @click="clearTimer2()">
          </div> -->
        </div>
      </div>
      <div class="container right">
        <Pagerouter :visi-bility = "visibility"></Pagerouter>
        <table>
          <Filterdata :filter-data="newPageData"></Filterdata>
        </table>
      </div>
    </div>
  </div>

</template>

<script>
  import dayjs from 'dayjs'
  import Filterdata from '@/components/Filterdata'
  import Pagerouter from '@/components/Pagerouter'

  export default {
    components: {
      Filterdata,
      Pagerouter
    },
    data() {
      return {
        timerTime: 8,
        newPageData: [],
        isDisabled: false,
        currentTime: "",
        changeTime: '',
        timerIsRunning: false,
        pause: '',
        timer: '',
        countdownTime: 8,
        visibility: 'pageTwo',
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
        const Api = `${process.env.VUE_APP_APIPATH}/ElectApi/ElectGontoForMonitor/GetMonitorTicket2`
        this.axios.get(Api).then(response => {
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
              this.newPageData = res;
              this.getVotes(this.newPageData)
            }
          })
          .catch(error => {
            console.log(error);
          })
      },
      getVotes(data) {
        //頁面人數
        const name = Array.from(new Set(data.map(item => {
          return item.Name
        })))
        this.stats.totalPerson = name.length
        //未登入人數
        const set = new Set()
        const result = data.filter(item => !set.has(item.Name) ? set.add(item.Name) : false)
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
      // setTimer() {
      //   this.pause = setInterval(() => {
      //     this.currentTime = this.time()
      //   }, 1000);
      // },
      // clearTimer() {
      //   clearInterval(this.pause);
      //   clearInterval(this.exitTime);
      //   this.countdownTime = 0
      // },
      clearTimer2() {
        clearInterval(this.exitTime);
        this.countdownTime = 8
        this.isDisabled = !this.isDisabled
      },
      // clickPause() {
      //   this.timerIsRunning = !this.timerIsRunning;
      //   if (!this.timerIsRunning) {
      //     this.setTimer()
      //   } else {
      //     this.clearTimer();
      //   }
      // },
      clickTimer(timerTime) {
        this.exitTime = setInterval(this.getData, 1000 * timerTime);
        this.isDisabled = !this.isDisabled;
      },
      // clearData() {
      //   this.newPageData = []
      //   this.countdownTime = 0
      //   clearInterval(this.exitTime);
      // },
    },
    computed: {
      btnDisabled() {
        return this.isDisabled ? true : false
      }
    },
    created() {
      // this.setTimer()
      this.getData()
      this.clickTimer(this.timerTime)
    },
  }

</script>
