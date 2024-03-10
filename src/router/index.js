import {createRouter,createWebHistory} from 'vue-router'
import Product from '@/views/main/Product.vue'
import Home from '@/views/main/Home.vue'
import Admin from '@/views/main/Admin.vue'
import Manage from '@/views/main/Manage.vue'
import Layout from '@/views/Layout.vue'
import Login from '@/views/Login.vue'
import testrouter from '@/views/components/testrouter.vue'
const routes = [
    {
        path: '/',
        component: Layout,
        name:'Layout',
        children:[  
        {
            path:'',
            component:Home,
            name:'Home'
        },
        {
            path:'Product',
            component:Product,
            name:'Product'
        },
        {
            path:'Admin',
            component:Admin,
            name:'Admin',
            children:[
                {
                    path:'order/:type',
                    component:testrouter,
                    name:'testrouter'
                }
            ]
        },
        {
            path:'Manage',
            component:Manage,
            name:'Manage'
        },
        
        ]
    },
    {
        path: '/Login',
        component: Login,
        name:'Login',
    },

  ]
const router = createRouter({
    history:createWebHistory(),
    routes
})


// router.beforeEach((to,from,next)=>{
//     if(to.path=='/'||to.path=='/login'){
//         next()
//     }
//     else if(localStorage.getItem('state')=='login'){
//         next()
//     }
//     else{
//         alert('localstorage为空,请先登录')
//         next('/login')
//     }
        

// })
export default router