<template>
<div>
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <i class="el-icon-lx-cascades"></i> 成员信息
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="container">
        <div class="handle-box">
            <span style="font-family:'Microsoft YaHei';font-size:15px">业主信息</span>
            <el-button type="primary" icon="el-icon-circle-plus-outline" style="float:right;margin-bottom:10px;margin-left:20px" @click="handleInsert">添加成员</el-button>
            <el-button type="primary" icon="el-icon-search" style="float:right;margin-bottom:10px;" @click="handleChose">选择业主</el-button>
        </div>
        <div style="margin-top:50px;margin-bottom:50px">
            <el-row>
                <el-col :span="3">
                    <div>
                        <img src="../../../public/test.jpg" width="100px" height="100px">
                    </div>
                </el-col>
                <el-col :span="21">
                    <div>
                        <div>
                            <el-row>
                                <el-col :span="8">
                                    <div class="grid-content bg-purple">
                                        <span style="font-family:'Microsoft YaHei';font-size:13px">业主id:&nbsp;&nbsp;&nbsp;{{rowInfo.id}}</span>
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <div class="grid-content bg-purple-light">
                                        <span style="font-family:'Microsoft YaHei';font-size:13px">姓名:&nbsp;&nbsp;&nbsp;{{rowInfo.name}}</span>
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <div class="grid-content bg-purple">
                                        <span style="font-family:'Microsoft YaHei';font-size:13px">性别:&nbsp;&nbsp;&nbsp;{{rowInfo.sex}}</span>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                        <div style="margin-top:20px">
                            <el-row>
                                <el-col :span="8">
                                    <div class="grid-content bg-purple">
                                        <span style="font-family:'Microsoft YaHei';font-size:13px">年龄:&nbsp;&nbsp;&nbsp;{{rowInfo.age}}</span>
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <div class="grid-content bg-purple-light">
                                        <span style="font-family:'Microsoft YaHei';font-size:13px">身份证:&nbsp;&nbsp;&nbsp;{{rowInfo.identity}}</span>
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <div class="grid-content bg-purple">
                                        <span style="font-family:'Microsoft YaHei';font-size:13px">联系方式:&nbsp;&nbsp;&nbsp;{{rowInfo.phone}}</span>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                        <div style="margin-top:20px">
                            <el-row>
                                <el-col :span="8">
                                    <div class="grid-content bg-purple">
                                        <span style="font-family:'Microsoft YaHei';font-size:13px">创建员工:&nbsp;&nbsp;&nbsp;{{rowInfo.createPeople}}</span>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>

        <el-table :data="tableData" class="table" header-cell-class-name="table-header" highlight-current-row>
            <el-table-column prop="id" label="成员Id" width="70px"></el-table-column>
            <el-table-column prop="name" label="姓名" width="150px"></el-table-column>
            <el-table-column prop="sex" label="性别" width="100px"></el-table-column>
            <el-table-column prop="age" label="年龄" width="100px"></el-table-column>
            <el-table-column prop="identity" label="身份证" width="200px"></el-table-column>
            <el-table-column prop="phone" label="联系方式"></el-table-column>
            <el-table-column prop="relate" label="关系"></el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex" :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
        </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
        <el-form ref="form" :model="form" label-width="70px">
            <el-form-item label="成员id">
                <el-input v-model="form.id" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-input v-model="form.sex"></el-input>
            </el-form-item>
            <el-form-item label="年龄">
                <el-input v-model="form.age"></el-input>
            </el-form-item>
            <el-form-item label="身份证">
                <el-input v-model="form.identity"></el-input>
            </el-form-item>
            <el-form-item label="联系方式">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="关系">
                <el-input v-model="form.relate"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
    </el-dialog>

    <!-- 新增成员弹出框 -->
    <el-dialog title="新增成员" :visible.sync="insertVisible" width="30%">
        <el-form label-width="70px">
            <el-form-item label="业主id">
                <el-input v-model="member.ownerId"  :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="member.name"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-input v-model="member.sex"></el-input>
            </el-form-item>
            <el-form-item label="年龄">
                <el-input v-model="member.age"></el-input>
            </el-form-item>
            <el-form-item label="身份证">
                <el-input v-model="member.identity"></el-input>
            </el-form-item>
            <el-form-item label="联系方式">
                <el-input v-model="member.phone"></el-input>
            </el-form-item>
            <el-form-item label="关系">
                <el-input v-model="member.relate"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="insertVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveInsert">确 定</el-button>
        </span>
    </el-dialog>

    <!-- 选择业主弹出框 -->
    <el-dialog title="选择业主" :visible.sync="choseVisible" width="60%">
        <div style="margin-bottom:40px">
            <el-input v-model="query.ownerId" placeholder="输入业主Id" style="width:500px;margin-right:20px"></el-input>
            <el-input v-model="query.name" placeholder="输入业主姓名" style="width:200px;margin-right:10px"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
        </div>
        <el-table :data="ownerTableData">
            <el-table-column prop="id" label="业主Id" width="60px"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="sex" label="性别"></el-table-column>
            <el-table-column prop="age" label="年龄"></el-table-column>
            <el-table-column prop="identity" label="身份证" width="150px"></el-table-column>
            <el-table-column prop="phone" label="联系方式"></el-table-column>
            <el-table-column prop="createPeople" label="创建员工"></el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-circle-check" class="green" @click="confirmChose(scope.$index, scope.row)">选择</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-dialog>
</div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
export default {
    name: 'owner',
    data() {
        return {
            query: {
                ownerId: '',
                name: '',
                pageIndex: 1,
                pageSize: 7
            },
            member: {
                name: "",
                sex: "",
                age: "",
                identity: "",
                phone: "",
                relate: '',
                ownerId: '1'
            },
            rowInfo: '',
            ownerTableData: [],
            tableData: [],
            editVisible: false,
            insertVisible: false,
            choseVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        this.query.ownerId = null
        this.query.name = null
    },
    methods: {
        // 获取数据
        getData() {
            let url =
                'http://localhost:8888/member/list?id=' + this.rowInfo.id + '&pageNum=' +
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
        handleChose() {
            this.choseVisible = true
            let url = 'http://localhost:8888/owner/list?pageNum=' +
                this.query.pageIndex +
                '&pageSize=' +
                this.query.pageSize;
            axios
                .get(url)
                .then(rs => {
                    console.log(rs);
                    let result = rs.data.data;
                    this.ownerTableData = result.list;
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        confirmChose(index, row) {
            console.log(index)
            console.log(row)
            this.rowInfo = row
            this.choseVisible = false
            this.tableData = []
            this.getData();
        },
        // 触发搜索按钮
        handleSearch() {
            if (this.query.ownerId) {
                let url = 'http://localhost:8888/owner/' + this.query.ownerId
                axios
                    .get(url)
                    .then(rs => {
                        if (rs.data.code == 200) {
                            console.log(rs.data.data);
                            this.ownerTableData = rs.data.data.list
                            this.query.ownerId = null
                        } else {
                            this.$message.error('业主不存在')
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                if (this.query.name) {
                    let url = 'http://localhost:8888/owner/?name=' +
                        this.query.name + '&pageNum=' + this.query.pageIndex +
                        '&pageSize=' + this.query.pageSize
                    axios
                        .get(url)
                        .then(rs => {
                            if (rs.data.code == 200) {
                                console.log(rs.data.data);
                                this.ownerTableData = rs.data.data.list
                                this.query.name = null
                            } else {
                                this.$message.error('请输入查询条件')
                            }

                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    this.$message.error('请输入查询条件')
                }
            }
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                .then(() => {
                    let url = 'http://localhost:8888/member/delete/' + this.tableData[index].id;
                    axios
                        .get(url)
                        .then(rs => {
                            if (rs.data.code == 200) {
                                this.$message.success('删除成功');
                                this.tableData.splice(index, 1);
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                })
                .catch(() => {});
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            let url = 'http://localhost:8888/member/update/' + this.form.id
            axios
                .post(url, this.form)
                .then(rs => {
                    if (rs.data.code == 200) {
                        this.editVisible = false;
                        this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                        this.$set(this.tableData, this.idx, this.form);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //处理插入
        handleInsert() {
            this.insertVisible = true;
            this.member.ownerId = this.rowInfo.id
        },
        saveInsert() {
            let url = 'http://localhost:8888/member/add'
            axios
                .post(url, this.member)
                .then(rs => {
                    if (rs.data.code == 200) {
                        this.insertVisible = false;
                        this.$message.success(`新增业主成功`);
                        this.getData();
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
};
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
