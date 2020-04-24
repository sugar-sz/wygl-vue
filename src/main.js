import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import {
    messages
} from './components/common/i18n';
//import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';
import axios from 'axios'

Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});





axios.interceptors.request.use(
    config => {
        let token = localStorage.getItem('token')
        if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {   
            console.log('axios:' + error.response.status);
            switch (error.response.status) {
                case 401:
                    // 返回 401 清除token信息并跳转到登录页面
                    localStorage.clear()
                    router.replace({
                        path: 'dashboard',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    });
                case 403:
                    Vue.prototype.$message('权限不足');
                    router.replace({
                        path: 'permission',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    });

            }
        }
        return Promise.reject(error.response.data); // 返回接口返回的错误信息
    });


//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    const role = localStorage.getItem('adminId');
    const flag = localStorage.getItem('adminId')
    if (to.path === '/register') {
        next();
    }
    if (to.path !== '/login') {
        if(flag!==0){
            next();
        }else{
            next('/login');
        }
    }else{
        next()
    } 
});

new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');