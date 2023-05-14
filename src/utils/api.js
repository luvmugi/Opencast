//api.js
import axios from './request'


const getPersonInfo = () => {
  return axios({
    method: 'get',
    url: '/system/medicineManage/list'
  })
}
export default getPersonInfo