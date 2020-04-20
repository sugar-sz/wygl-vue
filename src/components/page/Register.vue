<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统用户注册</div>
            <el-form
                :model="param"
                :rules="rules"
                ref="register"
                label-width="0px"
                class="ms-content"
            >
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="password"
                        v-model="param.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="confirm">
                    <el-input
                        type="password"
                        placeholder="confirm"
                        v-model="param.confirm"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="email">
                    <el-input
                        placeholder="email"
                        v-model="param.email"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-chat-line-square"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="phone">
                    <el-input
                        placeholder="phone"
                        v-model="param.phone"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-chat-line-square"></el-button>
                    </el-input>
                </el-form-item>

                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">注册</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'register',
    data: function() {
        return {
            param: {
                username: 'luyujie',
                password: '',
                confirm: '',
                email: '',
                phone: ''
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                confirm: [{ required: true, message: '请再次输入密码', trigger: 'blur' }],
                email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
                phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }]
            }
        };
    },
    methods: {
        submitForm() {
            if (this.param.password == this.param.confirm) {
                this.$refs.register.validate(vaild => {
                    if (vaild) {
                        axios
                            .post('http://localhost:8888/register', this.param)
                            .then(rs => {
                                console.log(rs);
                                if (rs.data.code == 200) {
                                    this.$message.success('注册成功');
                                    this.$router.push('/login');
                                } else {
                                    this.$message.error('用户名或密码错误');
                                }
                            })
                            .catch(function(error) {
                                console.log(error);
                            });
                    } else {
                        this.$message.error('用户名或密码错误');
                        console.log('error submit!!');
                        return false;
                    }
                });
            }else{
                 this.$message.error('两次密码输入不一致');
            }
        }
    }
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>