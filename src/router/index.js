import {createRouter,createWebHistory} from 'vue-router'
import Product from '@/views/main/Product.vue'
import Home from '@/views/main/Home.vue'
import Admin from '@/views/main/Admin.vue'
import Manage from '@/views/main/Manage.vue'
import Layout from '@/views/Layout.vue'
import Login from '@/views/Login.vue'
import EditandDelete from '@/views/components/EditandDelete.vue'
import Add from '@/views/components/Add.vue'
import UserManage from '@/views/components/UserManage.vue'
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
                    path:'order/editanddelete',
                    component:EditandDelete,
                    name:'EditandDelete'
                },
                {
                    path:'order/add',
                    component:Add,
                    name:'Add'
                },
                {
                    path:'Users',
                    component:UserManage,
                    name:'UserManage'
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


router.beforeEach((to,from,next)=>{
    if(to.path=='/'||to.path=='/login'){
        next()
    }
    // else if(to.name=='Admin'&&localStorage.getItem('isAdmin')=='True'){
    //     next()
    // }
    else if(localStorage.getItem('state')=='login'){
        if(to.name=='Admin'){
            if(localStorage.getItem('isAdmin')=='True'){
                next()
            }
            else{
                alert('请登录管理员账号')
                next('/login')
            }
        }
        else{
            next()
        }
            
    }
    else{
        alert('请登录账号')
        next('/login')
    }
        
})
export default router