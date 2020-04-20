<template>
<div>
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <i class="el-icon-lx-cascades"></i> 删除业主房屋
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>

    <div class="container">
        <div>
            <div class="handle-box">
                <span style="font-family:'Microsoft YaHei';font-size:15px">业主信息</span>
                <el-button type="primary" icon="el-icon-search" style="float:right;margin-bottom:10px;margin-left:10px" @click="goBack">返回</el-button>
            </div>
            <el-divider></el-divider>
            <div style="margin-top:30px;">
                <el-row style="margin-bottom:30px">
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <span style="font-family:'Microsoft YaHei';font-size:13px;color:green">业主id:&nbsp;&nbsp;&nbsp;{{ownerInfo.id}}</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple-light">
                            <span style="font-family:'Microsoft YaHei';font-size:13px;color:green">姓名:&nbsp;&nbsp;&nbsp;{{ownerInfo.name}}</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <span style="font-family:'Microsoft YaHei';font-size:13px;color:green">性别:&nbsp;&nbsp;&nbsp;{{ownerInfo.sex}}</span>
                        </div>
                    </el-col>
                </el-row>
                <el-row style="margin-bottom:30px">
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <span style="font-family:'Microsoft YaHei';font-size:13px;color:green">年龄:&nbsp;&nbsp;&nbsp;{{ownerInfo.age}}</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple-light">
                            <span style="font-family:'Microsoft YaHei';font-size:13px;color:green">联系方式:&nbsp;&nbsp;&nbsp;{{ownerInfo.phone}}</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <span style="font-family:'Microsoft YaHei';font-size:13px;color:green">身份证:&nbsp;&nbsp;&nbsp;{{ownerInfo.identity}}</span>
                        </div>
                    </el-col>
                </el-row>

                <el-row style="margin-bottom:30px">
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <span style="font-family:'Microsoft YaHei';font-size:13px;color:green">创建时间:&nbsp;&nbsp;&nbsp;{{ownerInfo.createTime}}</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple-light">
                            <span style="font-family:'Microsoft YaHei';font-size:13px;color:green">创建员工:&nbsp;&nbsp;&nbsp;{{ownerInfo.createPeople}}</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>

    </div>
    <div class="container" style="margin-top:10px" v-for="(item,index) in roomInfo" :key="index">
        <div>
            <div class="handle-box">
                <span style="font-family:'Microsoft YaHei';font-size:15px">{{item.buildingNumber+'号楼'}}</span>
                <span style="font-family:'Microsoft YaHei';font-size:15px">{{item.unitNumber+'单元'}}</span>
                <span style="font-family:'Microsoft YaHei';font-size:15px">{{item.number+'室'}}</span>
                <el-button type="primary" icon="el-icon-search" style="float:right;margin-bottom:10px;" @click="deleteOwnerRoom(item.id,item)">我要退房</el-button>
            </div>
            <el-divider></el-divider>
            <div style="margin-top:30px;">
                <el-row style="margin-bottom:30px">
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <span style="font-family:'Microsoft YaHei';font-size:13px;color:green">楼房编号:&nbsp;&nbsp;&nbsp;{{item.buildingNumber + '号楼'}}</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple-light">
                            <span style="font-family:'Microsoft YaHei';font-size:13px;color:green">单元:&nbsp;&nbsp;&nbsp;{{item.unitNumber + '单元'}}</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <span style="font-family:'Microsoft YaHei';font-size:13px;color:green">房屋编号:&nbsp;&nbsp;&nbsp;{{item.number +'室'}}</span>
                        </div>
                    </el-col>
                </el-row>
                <el-row style="margin-bottom:30px">
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <span style="font-family:'Microsoft YaHei';font-size:13px;color:green">房屋id:&nbsp;&nbsp;&nbsp;{{item.id}}</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple-light">
                            <span style="font-family:'Microsoft YaHei';font-size:13px;color:green">楼层:&nbsp;&nbsp;&nbsp;{{item.height+'层'}}</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <span style="font-family:'Microsoft YaHei';font-size:13px;color:green">面积:&nbsp;&nbsp;&nbsp;{{item.area+'/平方米'}}</span>
                        </div>
                    </el-col>
                </el-row>
                <el-row style="margin-bottom:30px">
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <span style="font-family:'Microsoft YaHei';font-size:13px;color:green">单价:&nbsp;&nbsp;&nbsp;{{item.price}}</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'deleteOwnerRoom',
    data() {
        return {
            active: 0,
            labelPosition: 'left',
            formLabelAlign: {
                name: '',
                region: '',
                type: ''
            },
            ownerInfo: {},
            roomInfo: []
        };
    },
    created() {
        this.getOwnerInfo()
        this.getRoomInfo()
    },
    methods: {
        getOwnerInfo() {
            let url = 'http://localhost:8888/owner/' + this.$route.query.ownerId
            console.log(url)
            axios
                .get(url)
                .then(rs => {
                    if (rs.data.code == 200) {
                        console.log(rs)
                        let result = rs.data.data
                        this.ownerInfo = result.list[0]
                    } else {
                        this.$message.error(`查询业主信息失败`);
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        getRoomInfo() {
            let url = 'http://localhost:8888/room/owner/' + this.$route.query.ownerId
            console.log(url)
            axios
                .get(url)
                .then(rs => {
                    if (rs.data.code == 200) {
                        console.log(rs)
                        let result = rs.data.data
                        this.roomInfo = result.list
                    } else {
                        this.$message.error(`查询业主信息失败`);
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        goBack() {
            this.$router.push('/owner')
        },
        deleteOwnerRoom(index,item){
             // 二次确认删除
            console.log(index)

            this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                .then(() => {
                    let url = 'http://localhost:8888/room/update/' + index
                    item.ownerId = ''
                    item.status = 1
                    axios
                        .post(url,item)
                        .then(rs => {
                            if (rs.data.code == 200) {
                                this.$message.success('删除成功');
                                this.$router.go(0)
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                })
                .catch(() => {});
        }
    }
}
</script>
