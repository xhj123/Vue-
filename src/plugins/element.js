import Vue from 'vue'
import { Button,Input,Radio,Message,Menu,MenuItem,Carousel,CarouselItem,Tabs,TabPane } from 'element-ui'

Vue.use(Button)
Vue.use(Input)
Vue.use(Radio)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Tabs)
Vue.use(TabPane)

// 按需引入message消息提示
Vue.prototype.$message = Message
