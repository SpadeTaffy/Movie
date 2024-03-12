<template>
    <el-table :data="movies" style="width: 100%">
        <el-table-column label="数据索引" prop="index" sortable />
        <el-table-column label="用户编号" prop="userId" sortable />
        <el-table-column label="电影编号" prop="movieId" sortable />
        <el-table-column label="电影评分" prop="rating" sortable />
        <el-table-column label="电影名称" prop="title" sortable />
        <el-table-column label="电影种类" prop="genres" sortable />
        <el-table-column align="right">

            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
            </template>
        </el-table-column>

    </el-table>
    <el-pagination layout="prev, pager, next" v-model:current-page="queryInfo.pagenum" :page-size="queryInfo.pagesize"
        :total="queryInfo.total" @current-change="handleCurrentChange" />

    <el-dialog v-model="dialogVisible" title="修改数据" width="500">
        <el-form :model="form" ref="FormRef">
            <el-form-item label="索引" :label-width="formLabelWidth" prop="id">
                <el-input v-model="form.index" autocomplete="off" />
            </el-form-item>
            <el-form-item label="用户id" :label-width="formLabelWidth" prop="userId">
                <el-input v-model="form.userid" autocomplete="off" />
            </el-form-item>
            <el-form-item label="电影id" :label-width="formLabelWidth" prop="movieId">
                <el-input v-model="form.movieid" autocomplete="off" />
            </el-form-item>
            <el-form-item label="电影评分" :label-width="formLabelWidth" prop="rate">
                <el-input v-model="form.rate" autocomplete="off" />
            </el-form-item>
            <el-form-item label="电影标题" :label-width="formLabelWidth" prop="title">
                <el-input v-model="form.title" autocomplete="off" />
            </el-form-item>
            <el-form-item label="电影类型" :label-width="formLabelWidth" prop="genres">
                <el-input v-model="form.genres" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="resetForm(FormRef)">重置</el-button>
                <el-button type="primary" @click="submitEditForm(FormRef)">
                    提交
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'

onMounted(() => {
    getMovies()
    // console.log(queryInfo.total)
    console.log(queryInfo.pagenum)
})

const movies = reactive([])
const getMovies = () => {
    axios.get("http://127.0.0.1:5000/movies", {
        params: {
            'page': queryInfo.pagenum
        }
    }).then(res => {
        movies.splice(0, movies.length)
        movies.push(...res.data.results)
        queryInfo.total = res.data.total
        console.log(movies)
        // ElMessage('切换成功')
    })
}//得到所有的电影信息

//开始进行分页展示
//记录分页的信息
var queryInfo = reactive({
    //总条数
    total: 100844,
    // 当前页面
    pagenum: 1,
    // 每页显示条数
    pagesize: 10,
})


//处理分页改变
const handleCurrentChange = (page) => {
    // 把页码改了
    queryInfo.pagenum = page
    // 重新加载分页数据
    getMovies()
    console.log(queryInfo.pagenum)
    // console.log(movies)
}

//此处实现修改的功能
const FormRef = ref()
const form = reactive({
    index: "",
    userid: "",
    movieid: "",
    rate: "",
    title: "",
    genres: ""

})
const dialogVisible = ref(false)

const handleEdit = (index, row) => {
    form.index = row.index
    form.userid = row.userId
    form.movieid = row.movieId
    form.rate = row.rating
    form.title = row.title
    form.genres = row.genres
    dialogVisible.value = true
    // console.log(row)
}


const submitEditForm = (FormRef) => {
    axios.put('http://127.0.0.1:5000/movies/' +form.index, form).then((res) => {
        resetForm(FormRef)
        dialogVisible.value = false
        getMovies()
    })
    console.log(row)
}

const handleDelete = (index, row) => {
    axios.delete('http://127.0.0.1:5000/movies/' + row.index).then(() => {
        getMovies()
    })

}


const resetForm = (FormRef) => {
    console.log('请求重置')
    // console.log(FormRef)
    form.index = ""
    form.userid = ""
    form.movieid = ""
    form.rate = ""
    form.title = ""
    form.genres = ""
    // FormRef.resetFields()
}
</script>
