<template>
  <thead>
    <tr class="title">
      <!-- <th class="click btn-color" @click="starSort('CaseNo')">案號
        <span class="icon" :class="{'inverse': isReverse}" v-if="sortName === 'CaseNo'">
          <i class=" fas fa-angle-up text-success"></i>
        </span>
      </th> -->
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
      :class="{'active': isActive ? currentIndex.name === datum.Name &&  currentIndex.spot === datum.SpotNo: ''}"
      @click="liclick(datum.SpotNo, datum.Name)">
      <!-- <td>{{ datum.CaseNo }}</td> -->
      <td>{{ datum.AreaName }}</td>
      <td>{{ datum.SpotNo }}</td>
      <td>{{ datum.Name }}</td>
      <td>{{ datum.Phone }}</td>
      <td>{{ datum.LoginDate ? dayjs(datum.LoginDate).format("HH:mm:ss") : null }}</td>
      <td>{{ datum.AgreeTickets }}</td>
      <td>{{ datum.RejectTickets }}</td>
      <td>{{ datum.InvalidTickets }}</td>
      <td>{{ datum.UpdateDate ? dayjs(datum.UpdateDate).format("HH:mm:ss") : null }}</td>
      <td>{{ datum.Done }}</td>
    </tr>
  </thead>
</template>

<script>
  import dayjs from 'dayjs'

  export default {
    name: 'taipei1',
    data() {
      return {
        isReverse: false,
        sortName: "",
        currentIndex: {},
        isActive: false,
      }
    },
    props: {
      taipei1: {
        type: Array,
        required: true
      }
    },
    methods: {
      dayjs,
      starSort(name) {
        this.isReverse = !this.isReverse
        this.sortName = name
      },
      liclick(spotno, name) {
        this.isActive = !this.isActive
        if (spotno && name) {
          this.currentIndex = {
            spot: spotno,
            name: name
          }
        }
      }
    },
    computed: {
      sortData() {
        let sort = this.taipei1.slice().sort((a, b) => {
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
    },
    created() {

    }
  }

</script>
