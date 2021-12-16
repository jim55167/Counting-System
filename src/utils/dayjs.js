import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-tw'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
dayjs.locale('zh-tw')

Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})