<template>
<div>
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <i class="el-icon-lx-cascades"></i> 楼房管理
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="container">
        <div class="handle-box">
            <el-input v-model="query.id" placeholder="请输入楼房id" class="handle-input mr10"></el-input>
            <el-input v-model="query.number" placeholder="请输入楼房编号" class="handle-input mr10"></el-input>
            <el-input v-model="query.name" placeholder="请输入楼房名称" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="handleSearch" style="width:100px;margin-left:40px">搜索</el-button>
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleInsert" style="float:right">添加楼房</el-button>
        </div>
        <el-table :data="tableData" class="table" header-cell-class-name="table-header">
            <el-table-column prop="id" label="楼房id" width="70px"></el-table-column>
            <el-table-column prop="number" label="楼房编号"></el-table-column>
            <el-table-column prop="name" label="楼房名称"></el-table-column>
            <el-table-column prop="createPeople" label="创建员工"></el-table-column>
            <el-table-column prop="createTime" label="创建时间"></el-table-column>
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
            <el-form-item label="楼房id">
                <el-input v-model="form.id" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="楼房编号">
                <el-input v-model="form.number" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="楼房名称">
                <el-input v-model="form.name" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="创建员工">
                <el-input v-model="form.createPeople"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
    </el-dialog>

    <!-- 添加楼房弹出框 -->
    <el-dialog title="添加楼房" :visible.sync="insertVisible" width="30%">
        <el-form label-width="70px">
            <el-form-item label="创建员工">
                <el-input v-model="building.createPeople" readonly="true"></el-input>
            </el-form-item>
            <el-form-item label="楼房编号">
                <el-input v-model="building.number"></el-input>
            </el-form-item>
            <el-form-item label="楼房名称">
                <el-input v-model="building.name"></el-input>
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
    name: 'building',
    data() {
        return {
            query: {
                id: '',
                number: '',
                name: '',
                pageIndex: 1,
                pageSize: 7
            },
            building: {
                createPeople: localStorage.getItem('adminName'),
                number: '',
                name: '',
            },
            tableData: [],
            editVisible: false,
            insertVisible: false,
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
                'http://localhost:8888/building/list?pageNum=' +
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
                    this.pageIndex = result.pageNum;
                    this.pageSize = result.pageSize;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        // 触发搜索按钮
        handleSearch() {
            if (this.query.id) {
                let url = 'http://localhost:8888/building/' + this.query.id
                axios
                    .get(url)
                    .then(rs => {
                        if (rs.data.code == 200) {
                            let result = rs.data.data
                            this.tableData = result.list
                            this.query.id = null
                            this.pageTotal = 1
                            this.pageIndex = 1
                            this.pageSize = 1
                        } else {
                            this.$message.error('楼房不存在')
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                if (this.query.number) {
                    let url = 'http://localhost:8888/building/number/' + this.query.number
                    axios
                        .get(url)
                        .then(rs => {
                            if (rs.data.code == 200) {
                                console.log(rs.data.data);
                                this.tableData = rs.data.data.list
                                this.query.number = null
                                this.pageTotal = 1
                                this.pageIndex = 1
                                this.pageSize = 1
                            } else {
                                this.$message.error('楼房不存在')
                            }

                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    if (this.query.name) {
                        let url = 'http://localhost:8888/building/?name=' + this.query.name
                        axios
                            .get(url)
                            .then(rs => {
                                if (rs.data.code == 200) {
                                    console.log(rs.data.data);
                                    this.tableData = rs.data.data.list
                                    this.query.name = null
                                    this.pageTotal = 1
                                    this.pageIndex = 1
                                    this.pageSize = 1
                                } else {
                                    this.$message.error('楼房不存在')
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
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                .then(() => {
                    let url = 'http://localhost:8888/building/delete/' + this.tableData[index].id;
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
            let url = 'http://localhost:8888/building/update/' + this.form.id
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
        },
        saveInsert() {
            let url = 'http://localhost:8888/building/add/'
            axios
                .post(url, this.building)
                .then(rs => {
                    if (rs.data.code == 200) {
                        this.insertVisible = false;
                        this.$message.success(`添加楼房成功`);
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
        },
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
