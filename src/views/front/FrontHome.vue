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
              <p>完成報票投開票所數：<span>{{ stats.done }}</span></p>
              <p>該頁面投開票所數：<span>{{ stats.totalTicket }}</span></p>
            </div>
            <div class="login-person">
              <p>未登入人數：<span>{{ stats.notLogin }}</span></p>
              <p>該頁面人數：<span>{{ stats.totalPerson }}</span></p>
            </div>
          </div>
        </div>
      </div>
      <div class="container right">
        <div class="card-header">
          <ul class="nav nav-tabs card-header-tabs">
            <li class="nav-item">
              <router-link class="nav-link" to="/FtvSystem" :class="{'active' : visibility == 'pageOne'}"
                @click="visibility = 'pageOne'">外場一</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/FtvSystemPage" :class="{'active' : visibility == 'pageTwo'}"
                @click="visibility = 'pageTwo'">外場二</router-link>
            </li>
          </ul>
        </div>
        <table>
          <thead>
            <tr class="title">
              <th class="click btn-color" @click="starSort('AreaName')">地區
                <span class="icon" :class="{'inverse': isReverse}" v-if="sortName === 'AreaName'">
                  <i class=" fas fa-angle-up text-success"></i>
                </span>
              </th>
              <th class="click btn-color" @click="starSort('SpotNo')">投開票所
                <span class="icon" :class="{'inverse': isReverse}" v-if="sortName === 'SpotNo'">
                  <i class=" fas fa-angle-up text-success"></i>
                </span>
              </th>
              <th class="click btn-color" @click="starSort('Name')">姓名
                <span class="icon" :class="{'inverse': isReverse}" v-if="sortName === 'Name'">
                  <i class=" fas fa-angle-up text-success"></i>
                </span>
              </th>
              <th class="click btn-color" @click="starSort('Phone')">手機
                <span class="icon" :class="{'inverse': isReverse}" v-if="sortName === 'Phone'">
                  <i class=" fas fa-angle-up text-success"></i>
                </span>
              </th>
              <th class="click btn-color" @click="starSort('LoginDate')">報到/登入
                <span class="icon" :class="{'inverse': isReverse}" v-if="sortName === 'LoginDate'">
                  <i class=" fas fa-angle-up text-success"></i>
                </span>
              </th>
              <th class="click btn-color" @click="starSort('AgreeTickets')">同意
                <span class="icon" :class="{'inverse': isReverse}" v-if="sortName === 'AgreeTickets'">
                  <i class=" fas fa-angle-up text-success"></i>
                </span>
              </th>
              <th class="click btn-color" @click="starSort('RejectTickets')">不同意
                <span class="icon" :class="{'inverse': isReverse}" v-if="sortName === 'RejectTickets'">
                  <i class=" fas fa-angle-up text-success"></i>
                </span>
              </th>
              <th class="click btn-color" @click="starSort('InvalidTickets')">無效票
                <span class="icon" :class="{'inverse': isReverse}" v-if="sortName === 'InvalidTickets'">
                  <i class=" fas fa-angle-up text-success"></i>
                </span>
              </th>
              <th class="click btn-color" @click="starSort('UpdateDate')">輸入時間
                <span class="icon" :class="{'inverse': isReverse}" v-if="sortName === 'UpdateDate'">
                  <i class=" fas fa-angle-up text-success"></i>
                </span>
              </th>
              <th class="click btn-color" @click="starSort('Done')">結束
                <span class="icon" :class="{'inverse': isReverse}" v-if="sortName === 'Done'">
                  <i class=" fas fa-angle-up text-success"></i>
                </span>
              </th>
            </tr>
            <tr class="material" v-for="(datum, index) in sortData" :key="index"
              :class="{'active': currentIndex === datum.SpotNo}" @click="liclick(datum.SpotNo)">
              <td>{{ datum.AreaName }}</td>
              <td>{{ datum.SpotNo }}</td>
              <td>{{ datum.Name }}</td>
              <td>{{ datum.Phone }}</td>
              <td>{{ datum.LoginDate ? moment(datum.LoginDate).format("HH:mm:ss") : null }}</td>
              <td>{{ datum.AgreeTickets }}</td>
              <td>{{ datum.RejectTickets }}</td>
              <td>{{ datum.InvalidTickets }}</td>
              <td>{{ datum.UpdateDate ? moment(datum.UpdateDate).format("HH:mm:ss") : null }}</td>
              <td>{{ datum.Done }}</td>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  </div>

</template>

<script>
  import moment from 'moment';
  moment().format();

  export default {
    data() {
      return {
        timerTime: 8,
        newData: [],
        isDisabled: false,
        sortName: "",
        isReverse: false,
        currentTime: "",
        changeTime: '',
        timerIsRunning: false,
        exitTime: '',
        pause: '',
        timer: '',
        countdownTime: 8,
        visibility: 'pageOne',
        currentIndex: String,
        stats: {
          notLogin: Number,
          totalPerson: Number,
          totalTicket: Number,
          done: Number
        }
      }
    },
    methods: {
      moment,
      getData() {
        const Api = `${process.env.VUE_APP_APIPATH}/ElectApi/ElectForMonitor/GetMonitorTicket1`
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
                  let logTime = moment(oldData.LoginDate).valueOf() //登入時間
                  oldData.LoginDate = logTime
                }
                if (oldData.UpdateDate != null) {
                  let upTime = moment(oldData.UpdateDate).valueOf() //上傳時間
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
      clearTimer2() { //清除紀錄
        clearInterval(this.exitTime);
        this.countdownTime = 8;
        this.isDisabled = !this.isDisabled;
      },
      starSort(name) {
        this.isReverse = !this.isReverse
        this.sortName = name
      },
      liclick(index) {
        this.currentIndex = index
      }
    },
    computed: {
      sortData() {
        let sort = this.newData.slice().sort((a, b) => {
          if (a[this.sortName] < b[this.sortName]) {
            return this.isReverse ? -1 : 1;
          }
          if (a[this.sortName] > b[this.sortName]) {
            return this.isReverse ? 1 : -1;
          }
          return 0;
        });
        return sort;
      },
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
