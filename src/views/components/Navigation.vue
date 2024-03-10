<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    router
  >
    <el-menu-item index="/" route>
      主页
    </el-menu-item>
    <el-menu-item index="/Manage" route>
      广告页面
    </el-menu-item>
    <el-menu-item index="/Admin" route>
      管理员页面
    </el-menu-item>
    <el-menu-item index="/Product" route>
      产品页面
    </el-menu-item>
    <div class="flex-grow" />
    <el-menu-item v-if="Logined">你好</el-menu-item>
    <el-menu-item index="/login" v-else>登录/注册</el-menu-item>
    <el-menu-item >   <el-button type="danger" plain @click="Logout()">退出</el-button></el-menu-item>
  </el-menu>
</template>

<script setup>
import { onMounted, onUpdated, ref } from 'vue'

const activeIndex = ref('1')
const Logined=ref(false)

onMounted(()=>{
  if(localStorage.getItem('state')=='login'){
     Logined.value=true
  }
  else{
    Logined.value=false
  }
}
 
)
const Logout = ()=>{
  localStorage.removeItem('state')
  alert('退出成功,localstorage已被清除')
  location.reload(true)
}
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
