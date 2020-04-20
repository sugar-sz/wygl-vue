<template>
<div>
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <i class="el-icon-lx-cascades"></i> 缴费清单
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="container">
        <span>收费清单</span>
        <el-divider></el-divider>

        <el-row>
            <el-col :span="14">
                <div>
                    <el-row>
                        <el-col :span="5">
                            <div class="item">
                                <span>费用id</span><br><br><br><br>
                                <span>费用项目</span><br><br><br><br>
                                <span>费用类型</span><br><br><br><br>
                                <span>到期时间</span><br><br><br><br>
                            </div>
                        </el-col>
                        <el-col :span="19">
                            <div class="item">
                                <span>{{form.fee.id}}</span><br><br><br><br>
                                <span>{{form.fee.feeItem}}</span><br><br><br><br>
                                <span>{{form.fee.type?'停车费':'物业费'}}</span><br><br><br><br>
                                <span>{{form.fee.endTime}}</span><br><br><br><br>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col :span="10">
                <div>
                    <el-row>
                        <el-col :span="5">
                            <div class="item">
                                <span>应收款</span><br><br><br><br>
                                <span>支付方式</span><br><br><br><br>
                                <span>实收款</span><br><br><br><br>
                            </div>
                        </el-col>
                        <el-col :span="19">
                            <div class="item">
                                <span style="font-size:16px;color:red;font-weight:bold">{{'¥'+form.feeDetails.receivableAmount}}</span><br><br><br><br>
                                <span>现金</span><br><br><br><br>
                                <el-input v-model="form.feeDetails.receivedAmount" placeholder="请输入内容" style="width:200px"></el-input>
                            </div>
                        </el-col>
                    </el-row>
                    <el-button style="background-color:#ffc107" plain @click="update">提交收费</el-button>
                </div>
            </el-col>
        </el-row>
    </div>

</div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
export default {
    name: 'payFee',
    data() {
        return {
            query: {

            },
            form: {}
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        // 获取数据
        getData() {
            this.form = JSON.parse(this.$route.query.form)
        },
        update() {
            this.form.feeDetails.status = 1
            let url =
                'http://localhost:8888/feeDetails/update/' + this.form.feeDetails.id
            axios
                .post(url, this.form.feeDetails)
                .then(rs => {
                    console.log(rs);
                    this.$message.success('缴费成功')
                    this.$router.push('/roomCreateFee')
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
}
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.item {
    font-size: 13px;
}
</style>
