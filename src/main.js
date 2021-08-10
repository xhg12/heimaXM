//引入Vue
import Vue from 'vue'
//引入App组件，它是所有组件的父组件
import App from './App.vue'
import router from './router.js'
import './plugins/element'
//导入全局样式表
import './assets/css/global.css'

import axios from 'axios'
//配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config => {
  // console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  //最后必须return config
  return config
})
Vue.prototype.$http = axios

//完整引入
//引入ElementUI组件库
// import ElementUI from 'element-ui';
//引入ElementUI全部样式
// import 'element-ui/lib/theme-chalk/index.css';

//按需引入
// import { Form } from 'element-ui';

//关闭Vue的生产提示
Vue.config.productionTip = false
//应用ElementUI
// Vue.use(ElementUI);
// Vue.component('el-form', Form);
// Vue.component('el-button', Button);
// Vue.component('el-row', Row);
// Vue.component('el-date-picker', DatePicker);

//创建Vue的实例对象vm
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
