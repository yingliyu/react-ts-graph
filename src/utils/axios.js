import axios from 'axios';
import { message } from 'antd';

import appConfig from '@/config';

// create axios instance
const instance = axios.create({
  baseURL: appConfig.baseUrl,
  timeout: 600000,
});

// let reqList = []
// let penddingList = []

// const removePending = (config) => {
//   for (let p in penddingList) {
//     if (penddingList[p].u === config.url + '&' + config.method + '&' + JSON.stringify(config.data)) {
//       console.log('cancel-token call', config.url)
//       penddingList[p].f()
//       penddingList.splice(p, 1)
//     }
//   }
// }

// Add a request interceptor
instance.interceptors.request.use(
  config => {
    // removePending(config)
    // 当前请求
    // const request = JSON.stringify(config)
    // 如果当前已经在请求了，则不再处理
    // if (!reqList.includes(request)) {
    //   reqList.push(request)
    // }
    // config.cancelToken = new axios.CancelToken(c => {
    //   penddingList.push({ u: config.url + '&' + config.method + '&' + JSON.stringify(config.data), f: c })
    // })

    // Do something before request is sent
    // Loading 为单例模式
    // Loading.service({
    //   lock: false, // 这里要设为false,否则loading时会隐藏滚动条，导致抖动
    //   text: 'Loading',
    //   spinner: 'el-icon-loading',
    //   background: 'rgba(0, 0, 0, 0.7)'
    // })
    return config;
  },
  error => {
    // Do something with request error
    message.error(error.toString());
    // Loading.service().close()
    return Promise.reject(error);
  },
);

// Add a response interceptor
instance.interceptors.response.use(
  response => {
    // removePending(response.config)
    // 从请求列表中移除结束的
    // reqList.splice(reqList.findIndex(item => item === JSON.stringify(response.config)), 1)
    // 如果当前已经没有进行中的异步请求了，则关闭loading
    // if (reqList.length === 0) {
    //   Loading.service().close()
    // }
    return response;
  },
  error => {
    // 发生异常时，请求列表清空
    // reqList.length = 0
    // 关闭loading
    // Loading.service().close()

    // 如果是取消请求的话，则抛出取消请求
    // if (axios.isCancel(error)) {
    //   throw new axios.Cancel('未完成的请求已取消')
    // } else {
    //   // 否则，提示错误
    //   // Message.error({
    //   //   message: error.toString(),
    //   //   duration: 2000
    //   // })
    // }
    return Promise.reject(error);
  },
);

export default instance;
