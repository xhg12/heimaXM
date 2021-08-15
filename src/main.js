//引入Vue
import Vue from 'vue'
//引入App组件，它是所有组件的父组件
import App from './App.vue'
import router from './router.js'
import './plugins/element'
//导入全局样式表
import './assets/css/global.css'

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

// 导入树形表格插件
import TreeTable from 'vue-table-with-tree-grid'

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

Vue.component('tree-table', TreeTable)
// 将富文本编辑器注册为全局可用的组件
Vue.use(VueQuillEditor)

Vue.filter('dateFormat', function(originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
//创建Vue的实例对象vm
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
