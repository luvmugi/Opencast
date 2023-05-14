//request.js
import axios from "axios";
import qs from "qs";
// import app from "../main.js"
import { ElLoading } from 'element-plus'
import { ElMessage } from 'element-plus'


// app.prototype.axios = axios
/****** 创建axios实例 ******/
// const service = axios.create({
//   baseURL: 'localhost:3000/index',  // api的base_url
//   timeout: 5000  // 请求超时时间
// });
console.log(process.env.VUE_APP_BASE_API)
axios.defaults.baseURL = process.env.VUE_APP_BASE_API;
// axios.defaults.withCredentials = true
axios.defaults.timeout = 20000;
// 

let loadingInstance
/****** request拦截器==>对请求参数做处理 ******/
axios.interceptors.request.use(config => {
  loadingInstance = ElLoading.service({ fullscreen: true })
  config.headers['X-Access-Token']='dwads3jidw812'
  config.method === 'post'
    ? config.data = qs.stringify({ ...config.data })
    : config.params = { ...config.params };


  return config;
}, error => {  //请求错误处理
  ElMessage({
    type: 'error',
    message: error
  });
  Promise.reject(error)
});

/****** respone拦截器==>对响应做处理 ******/
axios.interceptors.response.use(
  response => {  //成功请求到数据
    loadingInstance.close()
    console.log(response)
    //这里根据后端提供的数据进行对应的处理
    if (response.status === 200) {
      return response.data;
    } else {
      ElMessage({
        type: 'error',
        message: response.statusText
      });
    }
  },
  error => {  //响应错误处理
    // console.log('error');
    console.log(error);
    // console.log(JSON.stringify(error));
    ElMessage({
      type: 'error',
      message: error
    });
    return Promise.reject(error)
  }
);
export default axios;