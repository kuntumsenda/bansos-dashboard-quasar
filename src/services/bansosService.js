import {api} from 'boot/axios'

export default {
  submitBansosCovid(payload){
    return api.post('/submit', payload)
  }
}
