<template>
<div>
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <i class="el-icon-lx-cascades"></i> 发布公告
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="container">
        <div class="handle-box">
            <el-input v-model="query.id" placeholder="请输入公告id" class="handle-input mr10" style="margin-right:30px"></el-input>
            <el-select v-model="query.type" placeholder="请选择公告类型" style="width:300px;margin-right:30px">
                <el-option label="小区通知" value="0"></el-option>
                <el-option label="业主通知" value="1"></el-option>
            </el-select>
            <el-input v-model="query.title" placeholder="请输入公告标题" class="handle-input mr10" style="margin-right:40px"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            <el-button type="primary" icon="el-icon-plus" @click="handleInsert" style="float:right">发布</el-button>
        </div>
        <el-divider></el-divider>
        <el-table :data="tableData" class="table" header-cell-class-name="table-header">
            <el-table-column prop="id" label="公告id"></el-table-column>
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="type" label="公告类型">
                <template slot-scope="scope">
                    <span>{{scope.row.type==1?'业主通知':'小区通知'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="startTime" label="开始时间"></el-table-column>
            <el-table-column prop="endTime" label="结束时间"></el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-edit" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
                    <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex" :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
        </div>
    </div>

    <!-- 登记弹出框 -->
    <el-dialog title="发布公告信息" :visible.sync="insertVisible" width="40%">
        <el-form label-width="70px">
            <el-form-item label="标题">
                <el-input v-model="notice.title" placeholder="必填，请填写公告标题"></el-input>
            </el-form-item>
            <el-form-item label="公告类型">
                <el-select v-model="notice.type" placeholder="必填，请选择公告类型" style="width:100%">
                    <el-option label="小区通知" value="0"></el-option>
                    <el-option label="业主通知" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开始时间">
                <el-date-picker v-model="notice.startTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" style="width:100%">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
                <el-date-picker v-model="notice.endTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" style="width:100%">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="公告内容">
                <el-input type="textarea" v-model="notice.content" placeholder="必填，请填写内容"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="insertVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveInsert">确 定</el-button>
        </span>
    </el-dialog>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
        <el-form ref="form" :model="form" label-width="70px" label-position="left">
            <el-form-item label="标题">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="公告类型">
                <el-select v-model="form.type" placeholder="必填，请选择公告类型" style="width:100%">
                    <el-option label="小区通知" value="0"></el-option>
                    <el-option label="业主通知" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开始时间">
                <el-input v-model="form.startTime"></el-input>
            </el-form-item>
            <el-form-item label="结束时间">
                <el-input v-model="form.endTime"></el-input>
            </el-form-item>
            <el-form-item label="内容">
                <el-input type="textarea" v-model="form.content"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
    </el-dialog>

</div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
export default {
    name: 'notice',
    data() {
        return {
            query: {
                id: '',
                title: '',
                type: '',
                pageIndex: 1,
                pageSize: 7
            },
            notice: {
                id: '',
                type: '',
                startTime: '',
                endTime: '',
                content: '',
            },
            tableData: [],
            form: {},
            insertVisible: false,
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取数据
        getData() {
            let url =
                'http://localhost:8888/notice/list?pageNum=' +
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
        handleDetail(index,row){
           this.$router.push({
                path: '/noticeDetail',
                query: {
                    noticeId: row.id
                }
            })
        },
        handleEdit(index, row) {
            this.editVisible = true
            this.form = row;
        },
        saveEdit() {
            let url = 'http://localhost:8888/notice/update/' + this.form.id
            axios
                .post(url, this.form)
                .then(rs => {
                    if (rs.data.code == 200) {
                        this.editVisible = false;
                        this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                        this.$set(this.tableData, this.idx, this.form);
                    } else {
                        this.$message.success(`失败`);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                .then(() => {
                    let url = 'http://localhost:8888/notice/delete/' + this.tableData[index].id;
                    axios
                        .get(url)
                        .then(rs => {
                            if (rs.data.code == 200) {
                                this.$message.success('删除成功');
                                this.tableData.splice(index, 1);
                            } else {
                                this.$message.success('删除失败');
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                })
                .catch(() => {});
        },
        // 触发搜索按钮
        handleSearch() {
            if (this.query.id) {
                let url = 'http://localhost:8888/notice/' + this.query.id
                axios
                    .get(url)
                    .then(rs => {
                        if (rs.data.code == 200) {
                            console.log(rs.data.data);
                            let result = rs.data.data
                            this.tableData = Array.of(result)
                            this.query.number = null
                            this.pageTotal = this.tableData.length
                        } else {
                            this.$message.error('公告信息不存在')
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                if (this.query.type) {
                    let url = 'http://localhost:8888/notice/type?type=' + this.query.type + '&pageNum=' +
                        this.query.pageIndex +
                        '&pageSize=' +
                        this.query.pageSize;
                    axios
                        .get(url)
                        .then(rs => {
                            if (rs.data.code == 200) {
                                console.log(rs.data.data);
                                this.tableData = rs.data.data.list
                                this.query.type = null
                                this.pageTotal = this.tableData.length
                            } else {
                                this.$message.error('公告信息不存在')
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    if (this.query.title) {
                        let url = 'http://localhost:8888/notice/title?title=' + this.query.title + '&pageNum=' +
                            this.query.pageIndex +
                            '&pageSize=' +
                            this.query.pageSize;
                        axios
                            .get(url)
                            .then(rs => {
                                if (rs.data.code == 200) {
                                    console.log(rs.data.data);
                                    this.tableData = rs.data.data.list
                                    this.query.title = null
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
        handleInsert() {
            this.insertVisible = true;
        },
        saveInsert() {
            console.log(this.notice)
            let url = 'http://localhost:8888/notice/add/'
            axios
                .post(url, this.notice)
                .then(rs => {
                    if (rs.data.code == 200) {
                        this.insertVisible = false;
                        this.$message.success(`发布公告成功`);
                        this.getData();
                    } else {
                        this.$message.success(`发布公告失败`);
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
