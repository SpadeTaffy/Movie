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
                    <el-menu-item index="/Admin/order/0">普通订单</el-menu-item>
                    <el-menu-item index="/Admin/order/1">秒杀订单</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="2">
                    <template #title>
                        <span>商品管理</span>
                    </template>
                    <el-menu-item index="/Admin/goods/0">普通商品</el-menu-item>
                    <el-menu-item index="/Admin/goods/1">秒杀商品</el-menu-item>
                    <el-menu-item index="/Admin/goods/2">今日推荐</el-menu-item>
                    <el-menu-item index="/Admin/goods/category">商品分类</el-menu-item>
                </el-sub-menu>
                <el-menu-item index="3" disabled>
                    
                </el-menu-item>
                <el-menu-item index="4">
                    
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script  setup>

</script>