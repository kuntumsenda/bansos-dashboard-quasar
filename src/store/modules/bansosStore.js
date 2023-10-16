import routesOptions from "src/router/routes"
import bansosService from "src/services/bansosService"
import { Notify } from 'quasar'

export const namespaced = true

export const state = {
  listBansosCovid: JSON.parse(localStorage.getItem('listBansosCovid')) || []
}
export const getters = {}
export const mutations = {
  SET_LIST_BANSOS_COVID(state, payload){
    let oldData = state.listBansosCovid
    oldData.push(payload)
    localStorage.setItem("listBansosCovid", JSON.stringify(oldData));
  }
}
export const actions = {
  async submitFormBansosCovid({commit}, payload){
    try{
      const res = bansosService.submitBansosCovid(payload)
      setTimeout(() => {
        if(res.data){
          Notify.create({
            type: 'positive',
            caption: 'Data berhasil di submit'
          })
        }
      }, 4000);
    }catch(e){
      Notify.create({
        type: 'negative',
        caption: 'Terjadi kesalahan pada server'
      })
    }
  }
}

export default {
  namespaced, state, getters, mutations, actions
}
