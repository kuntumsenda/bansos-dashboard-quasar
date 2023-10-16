import axios from "axios";

const url = 'https://www.emsifa.com/api-wilayah-indonesia'

export default {
  getProvinces(){
    return axios.get(`${url}/api/provinces.json`)
  },
  getStates(id){
    return axios.get(`${url}/api/regencies/${id}.json`)
  },
  getDistricts(id){
    return axios.get(`${url}/api/districts/${id}.json`)
  },  
  getSubDistricts(id){
    return axios.get(`${url}/api/villages/${id}.json`)
  }
}
