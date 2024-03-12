<template>
    <el-container>
        <el-aside width="250px">
            <div style="font-size: 17px;margin-left: 50px;">电影管理系统</div>
            <el-menu default-active="2" class="el-menu-vertical-demo" 
             router>
                <el-sub-menu index="1">
                    <template #title>
                        <span>电影管理</span>
                    </template>
                    <el-menu-item index="/Admin/order/editanddelete">删改电影</el-menu-item>
                    <el-menu-item index="/Admin/order/add">增加电影</el-menu-item>
                    <!-- <el-menu-item index="/Admin/order/2">查询电影</el-menu-item> -->
                </el-sub-menu>
            
                    <el-menu-item index="/Admin/Users">账号管理</el-menu-item>
                
            </el-menu>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script  setup>

</script>