<template>
<div>
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <i class="el-icon-lx-cascades"></i> 报修登记
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="container">
        <div class="handle-box">
            <el-input v-model="query.id" placeholder="请输入报修id" class="handle-input mr10" style="margin-right:40px"></el-input>
            <el-input v-model="query.people" placeholder="请输入报修人" class="handle-input mr10" style="margin-right:40px"></el-input>
            <el-input v-model="query.phone" placeholder="请输入报修电话" class="handle-input mr10" ></el-input>
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            <el-button type="primary" icon="el-icon-plus" @click="handleRepair" style="float:right">登记</el-button>
        </div>
        <el-divider></el-divider>
        <el-table :data="tableData" class="table" header-cell-class-name="table-header">
            <el-table-column prop="id" label="报修id"></el-table-column>
            <el-table-column prop="type" label="报修类型">
                <template slot-scope="scope">
                    <span>{{scope.row.type==0?'卧室报修':scope.row.type==1?'客厅报修':scope.row.type==2?'管道报修':''}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="people" label="报修人"></el-table-column>
            <el-table-column prop="phone" label="联系方式"></el-table-column>
            <el-table-column prop="time" label="预约时间"></el-table-column>
            <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                    <span>{{scope.row.status==0?'处理完成':'处理中'}}</span>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex" :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
        </div>
    </div>

    <!-- 登记弹出框 -->
    <el-dialog title="添加报修信息" :visible.sync="insertVisible" width="40%">
        <el-form label-width="70px">
            <el-form-item label="报修类型">
                <el-select v-model="repair.type" placeholder="必填，请选择缴费周期" style="width:100%">
                    <el-option label="卧室报修" value="0"></el-option>
                    <el-option label="客厅报修" value="1"></el-option>
                    <el-option label="管道报修" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="报修人">
                <el-input v-model="repair.people" placeholder="必填，请填写报修人"></el-input>
            </el-form-item>
            <el-form-item label="联系方式">
                <el-input v-model="repair.phone" placeholder="必填，请填写联系方式"></el-input>
            </el-form-item>
            <el-form-item label="房屋编号">
                <el-input v-model="roomNumber" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="预约时间">
                <el-date-picker v-model="repair.time" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" style="width:100%">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="报修内容">
                <el-input type="textarea" v-model="repair.content" placeholder="必填，请填写报修内容"></el-input>
            </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="insertVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveInsert">确 定</el-button>
        </span>
    </el-dialog>

</div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
export default {
    name: 'repair',
    data() {
        return {
            query: {
                id: '',
                people: '',
                phone: '',
                pageIndex: 1,
                pageSize: 7
            },
            repair: {
                id: '',
                type: '',
                people: '',
                phone: '',
                time: '',
                roomId: '',
                content: '',
                ownerId: '',
                status: '',
                createTime: ''
            },
            roomNumber: '',
            tableData: [],
            roomInfo: '',
            ownerInfo: '',
            insertVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getOwnerInfo();
        this.getRoomInfo();
        this.getData();
    },
    methods: {
        // 获取数据
        getData() {
            let url =
                'http://localhost:8888/repair/list?roomId=' + this.$route.query.roomId + '&pageNum=' +
                this.query.pageIndex +
                '&pageSize=' +
                this.query.pageSize;
            axios
                .get(url)
                .then(rs => {
                    console.log(rs);
                    let result = rs.data.data;
                    this.tableData = result.list;
                    this.pageTotal = result.total;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        getOwnerInfo() {
            let url =
                'http://localhost:8888/owner/' + this.$route.query.ownerId
            axios
                .get(url)
                .then(rs => {
                    console.log(rs);
                    let result = rs.data.data;
                    this.ownerInfo = result.list[0]
                    this.repair.people = this.ownerInfo.name
                    this.repair.phone = this.ownerInfo.phone
                    this.repair.ownerId = this.ownerInfo.id
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        getRoomInfo() {
            let url =
                'http://localhost:8888/room/id/' + this.$route.query.roomId

            axios
                .get(url)
                .then(rs => {
                    console.log(rs);
                    let result = rs.data.data
                    this.roomInfo = result
                    this.repair.roomId = this.roomInfo.id
                    this.roomNumber = this.roomInfo.buildingNumber + '号楼 ' + this.roomInfo.unitNumber + '单元 ' + this.roomInfo.id + '室'
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        // 触发搜索按钮
        handleSearch() {
            if (this.query.id) {
                let url = 'http://localhost:8888/repair/' + this.query.id
                axios
                    .get(url)
                    .then(rs => {
                        if (rs.data.code == 200) {
                            console.log(rs.data.data);
                            this.tableData = rs.data.data.list
                            this.query.number = null
                            this.pageTotal = this.tableData.length
                        } else {
                            this.$message.error('报修信息不存在')
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                if (this.query.people) {
                    let url = 'http://localhost:8888/repair/people?people=' + this.query.people
                    axios
                        .get(url)
                        .then(rs => {
                            if (rs.data.code == 200) {
                                console.log(rs.data.data);
                                this.tableData = rs.data.data.list
                                this.query.people = null
                                this.pageTotal = this.tableData.length
                            } else {
                                this.$message.error('报修信息不存在')
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    if (this.query.phone) {
                        let url = 'http://localhost:8888/repair/phone?phone=' + this.query.phone
                        axios
                            .get(url)
                            .then(rs => {
                                if (rs.data.code == 200) {
                                    console.log(rs.data.data);
                                    this.tableData = rs.data.data.list
                                    this.query.people = null
                                    this.pageTotal = this.tableData.length
                                } else {
                                    this.$message.error('报修信息不存在')
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    } else {
                        this.$message.error('请输入查询条件')
                    }

                }
            }
        },
        //处理插入
        handleRepair() {
            this.insertVisible = true;
        },
        saveInsert() {
            console.log(this.repair)
            let url = 'http://localhost:8888/repair/add/'
            axios
                .post(url, this.repair)
                .then(rs => {
                    if (rs.data.code == 200) {
                        this.insertVisible = false;
                        this.$message.success(`添加报修成功`);
                        this.getData();
                    } else {
                        this.$message.success(`添加报修失败`);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        // 分页导航
        handlePageChange(val) {
            this.query.pageIndex = val;
            this.getData();
        }
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
