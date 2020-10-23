// TODO: support date format based on  APP_CONFIG.localeDateString
import Vue from 'vue'
import PersianDate from 'persian-date'

export default (APP_CONFIG) => {
  Vue.filter('date', (date, hasTime) => {
    let result = null
    if (date) {
      const newDate = new Date(date)
      result = new PersianDate(newDate).format(APP_CONFIG.localeDateFormat || 'LLLLL')
    }
    return result
  })
  Vue.filter('dateTime', (date) => {
    let result = null
    if (date) {
      const newDate = new Date(date)
      result = new PersianDate(newDate).format(APP_CONFIG.localeDateTimeFormat || 'LLLLL')
    }
    return result
  })
}
