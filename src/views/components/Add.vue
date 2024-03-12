<template>
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
                <el-button @click="resetForm(FormRef)">重置</el-button>
                <el-button type="primary" @click="submitForm(FormRef)">
                    提交
                </el-button>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'

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



//此处实现增加的功能
const FormRef = ref()
const form = reactive({
    index: "",
    userid: "",
    movieid: "",
    rate: "",
    title: "",
    genres: ""

})


const submitForm = (FormRef) =>{
  axios.post("http://127.0.0.1:5000/movies",form).then(()=>{
    ElMessage('提交成功')
    resetForm(FormRef)
    getMovies()
  })
  // console.log(FormRef)
}

const resetForm = (FormRef) => {
    ElMessage('清空列表')
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


