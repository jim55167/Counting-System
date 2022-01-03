<template>
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
      <th class="click btn-color" @click="starSort('Tickets1')">張烱春
        <span class="icon" :class="{'inverse': isReverse}" v-if="sortName === 'Tickets1'">
          <i class=" fas fa-angle-up text-success"></i>
        </span>
      </th>
      <th class="click btn-color" @click="starSort('Tickets2')">林金連
        <span class="icon" :class="{'inverse': isReverse}" v-if="sortName === 'Tickets2'">
          <i class=" fas fa-angle-up text-success"></i>
        </span>
      </th>
      <th class="click btn-color" @click="starSort('Tickets3')">李昇翰
        <span class="icon" :class="{'inverse': isReverse}" v-if="sortName === 'Tickets3'">
          <i class=" fas fa-angle-up text-success"></i>
        </span>
      </th>
      <th class="click btn-color" @click="starSort('Tickets4')">林靜儀
        <span class="icon" :class="{'inverse': isReverse}" v-if="sortName === 'Tickets4'">
          <i class=" fas fa-angle-up text-success"></i>
        </span>
      </th>
      <th class="click btn-color" @click="starSort('Tickets5')">顏寬恒
        <span class="icon" :class="{'inverse': isReverse}" v-if="sortName === 'Tickets5'">
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
      <td>{{ datum.AreaName }}</td>
      <td>{{ datum.SpotNo }}</td>
      <td>{{ datum.Name }}</td>
      <td>{{ datum.Phone }}</td>
      <td>{{ datum.LoginDate ? dayjs(datum.LoginDate).format("HH:mm:ss") : null }}</td>
      <td>{{ datum.Tickets1 }}</td>
      <td>{{ datum.Tickets2 }}</td>
      <td>{{ datum.Tickets3 }}</td>
      <td>{{ datum.Tickets4 }}</td>
      <td>{{ datum.Tickets5 }}</td>
      <td>{{ datum.UpdateDate ? dayjs(datum.UpdateDate).format("HH:mm:ss") : null }}</td>
      <td>{{ datum.Done }}</td>
    </tr>
  </thead>
</template>

<script>
  import dayjs from 'dayjs'

  export default {
    name: 'taichung',
    data() {
      return {
        isReverse: false,
        sortName: "",
        currentIndex: {},
        isActive: false,
      }
    },
    props: {
      taichung: {
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
        let sort = this.taichung.slice().sort((a, b) => {
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
    }
  }

</script>
