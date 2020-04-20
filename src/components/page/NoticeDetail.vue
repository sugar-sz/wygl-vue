<template>
<div>
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <i class="el-icon-lx-cascades"></i> 公告详情
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="container">
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark" style="align-center">
                    <center>{{noticeInfo.title}}</center> <br>
                    <center style="font-size:12px">{{noticeInfo.startTime}}</center><br>
                    <span>{{noticeInfo.content}}</span>
                </div>
            </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <span>开始时间</span><br>
                    <span style="font-size:12px">{{noticeInfo.startTime}}</span>
                </div>
            </el-col>
           
            <el-col :span="12">
                <div class="grid-content bg-purple" style="float:right">
                    <span>结束时间</span><br>
                    <span style="font-size:12px">{{noticeInfo.endTime}}</span>
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
    name: 'noticeDetail',
    data() {
        return {
            noticeInfo: {}
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        // 获取数据
        getData() {
            let url =
                'http://localhost:8888/notice/' + this.$route.query.noticeId
            axios
                .get(url)
                .then(rs => {
                    console.log(rs);
                    this.noticeInfo = rs.data.data
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
    }
}
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}

.table {
    width: 100%;
    font-size: 14px;
}

.red {
    color: #ff0000;
}

.mr10 {
    margin-right: 10px;
}

.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
