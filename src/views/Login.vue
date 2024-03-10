<template>
    <Navigation></Navigation>
    <div class="box">
        <el-card>
            <div class="card-header">
                <span>登录|注册页面</span>
            </div>

            <el-tabs v-model="activeName" class="tabs" stretch>
                <el-tab-pane label="登录" name="login">
                    <el-form ref="LoginFormRef" style="max-width: 600px" :model="LoginForm" status-icon
                        :rules="Loginrules" label-width="auto" class="demo-ruleForm">
                        <el-form-item label="用户名" prop="id">
                            <el-input v-model.number="LoginForm.id" />
                        </el-form-item>
                        <el-form-item label="密码" prop="pass">
                            <el-input v-model="LoginForm.pass" type="password" autocomplete="off" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="LoginsubmitForm(LoginFormRef)">登录</el-button>
                            <el-button @click="resetForm(LoginFormRef)">重置</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>

                <el-tab-pane label="注册" name="register">
                    <el-form ref="RegisterFormRef" style="max-width: 600px" :model="RegisterForm" status-icon
                        :rules="Registerrules" label-width="auto" class="demo-ruleForm">
                        <el-form-item label="用户名" prop="id">
                            <el-input v-model.number="RegisterForm.id" />
                        </el-form-item>
                        <el-form-item label="密码" prop="pass">
                            <el-input v-model="RegisterForm.pass" type="password" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="重新输入密码" prop="checkPass">
                            <el-input v-model="RegisterForm.checkPass" type="password" autocomplete="off" />
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="RegistersubmitForm(RegisterFormRef)">注册</el-button>
                            <el-button @click="resetForm(RegisterFormRef)">重置</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>


        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import axios from 'axios'
const activeName = ref('login')
import Navigation from './components/Navigation.vue';

const LoginFormRef = ref<FormInstance>()
const RegisterFormRef = ref<FormInstance>()

const validateid = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('Please input id'))
    } else {
        callback()
    }
}

const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('Please input the password'))
    } else {
        if (RegisterForm.checkPass !== '') {
            if (!RegisterFormRef.value) return
            RegisterFormRef.value.validateField('checkPass', () => null)
        }
        callback()
    }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('Please input the password again'))
    } else if (value !== RegisterForm.pass) {
        callback(new Error("Two inputs don't match!"))
    } else {
        callback()
    }
}
const LoginForm = reactive({
    pass: '',
    id: '',
})
const RegisterForm = reactive({
    pass: '',
    checkPass: '',
    id: '',
})

const Loginrules = reactive<FormRules<typeof LoginForm>>({
    pass: [{ validator: validatePass, trigger: 'blur' }],
    id: [{ validator: validateid, trigger: 'blur' }],

})

const Registerrules = reactive<FormRules<typeof RegisterForm>>({
    pass: [{ validator: validatePass, trigger: 'blur' }],
    checkPass: [{ validator: validatePass2, trigger: 'blur' }],
    id: [{ validator: validateid, trigger: 'blur' }],
})

const LoginsubmitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            axios.get('http://127.0.0.1:5000/login/'+LoginForm.id).then((res)=>{
                if (res.data.status=='fail'){
                    // resetForm(formEl)
                    alert('用户不存在!')
                }
                else{
                    if(LoginForm.id==res.data.result.id && LoginForm.pass==res.data.result.password){
                        alert('登录成功')
                        localStorage.setItem('state','login')
                        window.location.href= "/";
                    }
                    else
                        alert('用户名或密码错误')
                }


            })
            // console.log(RegisterForm)
        } else {
            resetForm(formEl)
            alert('error submit!')
        }
    })
}

const RegistersubmitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            axios.post("http://127.0.0.1:5000/register",RegisterForm).then((res)=>{
                console.log(RegisterForm)
                console.log(res)
                resetForm(formEl)
                alert('提交成功')
            })
            // console.log(RegisterForm)
        } else {
            resetForm(formEl)
            alert('error submit!')
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>

<style>
.box {
    width: 1000px;
    margin: 0px auto;
    text-align: center;
}
</style>