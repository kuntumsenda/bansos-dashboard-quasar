import { Notify } from 'quasar'

Notify.setDefaults({
  position: 'top-right',
  textColor: 'white',
  actions: [{ icon: 'close', color: 'white' }]
})

Notify.registerType('positive', {
  icon: 'mdi-check-circle-outline',
  timeout: 4000,
  progress: true,
  multiLine: true,
  html: true,
  message: 'Success',
  color: 'positive',
})

Notify.registerType('negative', {
  icon: 'mdi-close-circle-outline',
  timeout: 0,
  progress: true,
  multiLine: true,
  html: true,
  message: 'Failed',
  color: 'negative',
})

Notify.registerType('warning', {
  icon: 'mdi-alert-circle-outline',
  timeout: 4000,
  progress: true,
  multiLine: true,
  html: true,
  message: 'Attention',
  color: 'warning',
})

Notify.registerType('info', {
  icon: 'mdi-information-outline',
  timeout: 4000,
  progress: true,
  multiLine: true,
  html: true,
  message: 'Information',
  color: 'info',
})


