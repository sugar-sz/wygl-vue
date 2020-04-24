<template>
<div>
    <el-row :gutter="20">
        <el-col :span="8">
            <el-card shadow="hover" class="mgb20" style="height:320px;">
                <div class="user-info">
                    <img src="../../assets/img/img.jpg" class="user-avator" alt />
                    <div class="user-info-cont">
                        <div class="user-info-name">{{userInfo.wyglAdmin.username}}</div>
                        <div style="margin-top:30px">{{userInfo.authorities[0].authority=='ROLE_admin'?'系统管理员':'普通用户'}}</div>
                    </div>
                </div>
                <div class="user-info-list">
                    上次登录时间：<span style="float:right">{{userInfo.wyglAdmin.loginTime}}</span> <br>
                    email: <span style="float:right">{{userInfo.wyglAdmin.email}}</span> <br>
                    联系方式:<span style="float:right">{{userInfo.wyglAdmin.phone}}</span> <br>
                    真实姓名:<span style="float:right">{{userInfo.wyglAdmin.realName}}</span> <br>
                    note:<span style="float:right">{{userInfo.wyglAdmin.note}}</span>
                </div>
            </el-card>
            <el-card shadow="hover" style="height:252px;">
                <div slot="header" class="clearfix">
                    <span>语言详情</span>
                </div>Vue
                <el-progress :percentage="71.3" color="#42b983"></el-progress>JavaScript
                <el-progress :percentage="24.1" color="#f1e05a"></el-progress>CSS
                <el-progress :percentage="13.7"></el-progress>HTML
                <el-progress :percentage="5.9" color="#f56c6c"></el-progress>
            </el-card>
        </el-col>
        <el-col :span="16">
            <el-row :gutter="20" class="mgb20">
                <el-col :span="8">
                    <el-card shadow="hover" :body-style="{padding: '0px'}">
                        <div class="grid-content grid-con-1">
                            <i class="el-icon-bicycle grid-con-icon"></i>
                            <div class="grid-cont-right">
                                <div class="grid-num">{{parkSpaceCount}}</div>
                                <div>剩余停车位</div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card shadow="hover" :body-style="{padding: '0px'}">
                        <div class="grid-content grid-con-2">
                            <i class="el-icon-lx-people grid-con-icon"></i>
                            <div class="grid-cont-right">
                                <div class="grid-num">{{ownerCount}}</div>
                                <div>业主数量</div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card shadow="hover" :body-style="{padding: '0px'}">
                        <div class="grid-content grid-con-3">
                            <i class="el-icon-lx-home grid-con-icon"></i>
                            <div class="grid-cont-right">
                                <div class="grid-num">{{roomCount}}</div>
                                <div>剩余房屋数量</div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <el-card shadow="hover" style="height:470px;">
                <div slot="header" class="clearfix">
                    <span>小区公告</span>
                </div>
                <div v-for="o in todoList" :key="o.id" class="text item">
                    <a :href="'http://localhost:8080/#/noticeDetail?noticeId='+o.id">{{o.title}}</a>
                </div>
                <div class="pagination">
                    <el-pagination background layout="total,prev, pager, next" :current-page="query.pageIndex" :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
                </div>
            </el-card>
        </el-col>
    </el-row>

</div>
</template>

<script>
import Schart from 'vue-schart';
import bus from '../common/bus';
import axios from 'axios';
export default {
    name: 'dashboard',
    data() {
        return {
            userInfo: {},
            parkSpaceCount: '',
            ownerCount: '',
            roomCount: '',
            todoList: [],
            query: {
                pageIndex: 1,
                pageSize: 7
            },
            pageTotal: 0
        };
    },
    created() {
        this.userInfo = JSON.parse(localStorage.getItem('user'))
        console.log(this.userInfo.wyglAdmin.id)
        this.getParkSpace()
        this.getOwnerCount()
        this.getRoomCount()
        this.getNoticeList()
    },
    components: {
        Schart
    },
    methods: {
        handlePageChange(val) {
            this.query.pageIndex = val;
            this.getNoticeList();
        },
        getParkSpace() {
            let url = 'http://localhost:8888/parkSpace/count'
            axios
                .get(url)
                .then(rs => {
                    if (rs.data.code == 200) {
                        this.parkSpaceCount = rs.data.data.remainingParkSpace
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        getOwnerCount() {
            let url = 'http://localhost:8888/owner/count'
            axios
                .get(url)
                .then(rs => {
                    if (rs.data.code == 200) {
                        this.ownerCount = rs.data.data
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        getRoomCount() {
            let url = 'http://localhost:8888/room/count'
            axios
                .get(url)
                .then(rs => {
                    if (rs.data.code == 200) {
                        this.roomCount = rs.data.data
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        getNoticeList() {
            let url =
                'http://localhost:8888/notice/list?pageNum=' + this.query.pageIndex +
                '&pageSize=' + this.query.pageSize
            axios
                .get(url)
                .then(rs => {
                    console.log(rs);
                    let result = rs.data.data;
                    this.todoList = result.list;
                    this.pageTotal = result.total
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
};
</script>

<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}

.text {
    font-size: 13px;
}

.item {
    margin-bottom: 18px;
}
</style>
