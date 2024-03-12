<template>
    <el-table :data="Users" style="width: 100%">
        <el-table-column label="用户id" prop="id" sortable />
        <el-table-column label="密码" prop="password" sortable />
        <el-table-column label="是否为管理员" prop="role" sortable />
        <el-table-column align="right">

            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
            </template>
        </el-table-column>

    </el-table>

    <el-dialog v-model="dialogVisible" title="修改数据" width="500">
        <el-form :model="form" ref="FormRef">
            <el-form-item label="用户id" :label-width="formLabelWidth" prop="id">
                <el-input v-model="form.id" autocomplete="off" />
            </el-form-item>
            <el-form-item label="用户密码" :label-width="formLabelWidth" prop="password">
                <el-input v-model="form.password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="用户身份" :label-width="formLabelWidth" prop="role">
                <el-input v-model="form.role" autocomplete="off" />
            </el-form-item>

                    <el-button @click="resetForm(FormRef)">重置</el-button>
                    <el-button type="primary" @click="submitEditForm(FormRef)">
                        提交
                    </el-button>

        </el-form>
    </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'

onMounted(() => {
    getUsers()
    // console.log(queryInfo.pagenum)
})

const Users = reactive([])
const getUsers = () => {
    axios.get("http://127.0.0.1:5000/users", {
        // params: {
        //     'page': queryInfo.pagenum
        // }
    }).then(res => {
        Users.splice(0, Users.length)
        Users.push(...res.data.results)
        console.log(Users)
        // ElMessage('切换成功')
    })
}//得到所有的电影信息



// //处理分页改变
// const handleCurrentChange = (page) => {
//     // 把页码改了
//     queryInfo.pagenum = page
//     // 重新加载分页数据
//     getMovies()
//     console.log(queryInfo.pagenum)
//     // console.log(movies)
// }

//此处实现修改的功能
const FormRef = ref()
const form = reactive({
    id: "",
    password:"",
    role:""
})

const dialogVisible=ref(false)

const handleEdit = (index, row) => {
    form.id = row.id
    form.password = row.password
    form.role = row.role
    dialogVisible.value = true
    // console.log(row)
}


const submitEditForm = (FormRef) => {
    axios.put('http://127.0.0.1:5000/users/' + form.id, form).then((res) => {
        resetForm(FormRef)
        dialogVisible.value = false
        getUsers()
    })
    console.log(row)
}

const handleDelete = (index, row) => {
    axios.delete('http://127.0.0.1:5000/users/' + row.id).then(() => {
        getUsers()
    })

}


const resetForm = (FormRef) => {
    console.log('请求重置')
    // console.log(FormRef)
    form.id = ""
    form.password = ""
    form.role=""
    // FormRef.resetFields()
}
</script>
