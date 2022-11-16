// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) { // 验证是否需要登陆
    let id = localStorage.getItem('userID')
    console.log(id)
    if (id) { // 查询本地存储信息是否已经登陆
      next()
    } else {
      alert('您还未登陆')
      next({
        path: '/' // 未登录则跳转至login页面
      })
    }
  } else {
    next()
  }
})
