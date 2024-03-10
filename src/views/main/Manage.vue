<template>
  <el-container>
    <el-header height="80px" style="padding: 0;">
      <div class="header">学生管理系统</div>
    </el-header>
  </el-container>
  <el-container>
    <el-aside with="200px">
      <el-menu class="aside" @select="selectFunc">
        <el-sub-menu index="1">
          <template #title>
            <span>七年级</span>
          </template>
          <el-menu-item index="1">1班</el-menu-item>
          <el-menu-item index="2">2班</el-menu-item>
          <el-menu-item index="3">3班</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-main>
      <el-container>
        <el-header height="80px" style="padding: 0;">
          <div class="header">
            <span>学生统计</span>
            <el-button id="add">添加数据</el-button>
          </div>
        </el-header>
        <el-main>
          <el-table :data="filterTableData" style="width: 100%">
            <el-table-column label="Date" prop="date" sortable />
            <el-table-column label="Name" prop="name" sortable />
            <el-table-column align="right">
              <template #header>
                <el-input v-model="search" size="small" placeholder="Type to search" />
              </template>
              <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-main>
  </el-container>





</template>

<style>
html,
body {
  height: 100%;
}

body {
  margin: 0;
}

.header {
  font-size: 30px;
  line-height: 80px;
  background-color: #f1f1f1;
  text-align: center;
}

.aside {
  background-color: wheat;
  height: 80vh;
}

#add {
  float: right;
  margin-top: 25px;
  right: 30px;
}
</style>


<script lang="ts" setup>
import { computed, ref } from 'vue'

interface User {
  date: string
  name: string
  address: string
}

const search = ref('')
const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
)
const handleEdit = (index: number, row: User) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
  console.log(index, row)
}

const tableData: User[] = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'John',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Morgan',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Jessy',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>