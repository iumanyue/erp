import Vue from 'vue'
import VueRouter from 'vue-router'

const Login =() => import ('components/Login.vue')
const Home =() => import ('components/Home.vue')
const Welcome =() => import ('components/welcome.vue')
const User =() => import ('components/user/User.vue')
const Rights =() => import ('components/power/Rights.vue')
const Roles =() => import ('components/power/Roles.vue')

Vue.use(VueRouter)
const routes=[
    {
        path:'/',
        redirect:'/login' 
     },
    {
       path:'/login',
       component:Login   
    },
    {
        path:'/home',
        component:Home,
        redirect:'/welcome',
        children:[
            {
                path:'/welcome',
                component:Welcome
            },
            {
                path:'/users',
                component:User
            },
            {
                path:'/rights',
                component:Rights
            },
            {
                path:'/roles',
                component:Roles
            }
        ] 
     }
]

const router = new VueRouter({
    routes,
    mode:'history'
})

// 挂载路由导航守卫

router.beforeEach((to,from,next)=>{
    // next()是一个函数，表示放行     next()放行  或者不放强制跳转next('/next')

    if(to.path ==='/login')
        return next()
        // 获取token
     const tokenStr =  window.sessionStorage.getItem('token')
    if(!tokenStr) return next('/login')
        next()
})


export default router