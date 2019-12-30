import '@babel/polyfill'
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import 'tui-editor/dist/tui-editor.css'
import 'tui-editor/dist/tui-editor-contents.css'
import 'codemirror/lib/codemirror.css'
import { Editor, Viewer } from '@toast-ui/vue-editor'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

Vue.use(VeeValidate)
Vue.component('editor', Editor)
Vue.component('viewer', Viewer)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
