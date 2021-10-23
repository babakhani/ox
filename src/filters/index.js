// TODO: support date format based on  APP_CONFIG.localeDateString
import Vue from 'vue'
import PersianDate from 'persian-date'

export default (APP_CONFIG) => {
  Vue.filter('shortDate', (date, hasTime) => {
    let result = null
    if (date) {
      const newDate = new Date(date)
      result = new PersianDate(newDate).format('YYYY/MM/DD')
    }
    return result
  })
  Vue.filter('date', (date, hasTime) => {
    let result = null
    if (date) {
      const newDate = new Date(date)
      result = new PersianDate(newDate).format(APP_CONFIG.localeDateFormat || 'HH:mm YYYY/MM/DD')
    }
    return result
  })
  Vue.filter('dateTime', (date) => {
    let result = null
    if (date) {
      const newDate = new Date(date)
      result = new PersianDate(newDate).format(APP_CONFIG.localeDateTimeFormat || 'HH:mm YYYY/MM/DD')
    }
    return result
  })
  Vue.filter('dateWeekDayFullName', (date) => {
    let result = null
    if (date) {
      const newDate = new Date(date)
      result = new PersianDate(newDate).format(APP_CONFIG.localeDateTimeFormat || 'dddd')
    }
    return result
  })
  Vue.filter('roundNumber', (input) => {
    return parseInt(input) 
  })
}
