<template>
<div>
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <i class="el-icon-lx-cascades"></i> 停车场管理
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="container">
        <div class="handle-box">
            <el-input v-model="query.id" placeholder="请输入停车场id" class="handle-input mr10"></el-input>
            <el-input v-model="query.number" placeholder="请输入停车场编号" class="handle-input mr10"></el-input>
            <el-select v-model="query.type" slot="prepend" placeholder="请选择停车场类型" style="width:300px">
                <el-option label="地上停车场" value="0"></el-option>
                <el-option label="地下停车场" value="1"></el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-search" @click="handleSearch" style="width:100px;margin-left:40px">搜索</el-button>
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleInsert" style="float:right">添加停车场</el-button>
        </div>
        <el-table :data="tableData" class="table" header-cell-class-name="table-header">
            <el-table-column prop="id" label="停车场id" width="100px"></el-table-column>
            <el-table-column prop="number" label="停车场编号"></el-table-column>
            <el-table-column prop="type" label="停车场类型">
                <template slot-scope="scope">
                    <span v-text="scope.row.type===1?'地下停车场':'地上停车场'"></span>
                </template>
            </el-table-column>
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
            <el-form-item label="停车场id">
                <el-input v-model="form.id" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="停车场编号">
                <el-input v-model="form.number" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="停车场类型">
                <el-select v-model="form.type" placeholder="请选择停车场类型" style="width:100%">
                    <el-option label="地上停车场" value="0"></el-option>
                    <el-option label="地下停车场" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="创建时间">
                <el-input v-model="form.createTime"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
    </el-dialog>

    <!-- 添加停车场弹出框 -->
    <el-dialog title="添加停车场" :visible.sync="insertVisible" width="30%">
        <el-form label-width="70px">
            <el-form-item label="停车场编号">
                <el-input v-model="parkArea.number" placeholder="必填，请输入停车场编号"></el-input>
            </el-form-item>
            <el-form-item label="停车场类型">
                <el-select v-model="parkArea.type" placeholder="请选择停车场类型" style="width:100%">
                    <el-option label="地上停车场" value="0"></el-option>
                    <el-option label="地下停车场" value="1"></el-option>
                </el-select>
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
    name: 'parkArea',
    data() {
        return {
            query: {
                id: '',
                number: '',
                type: '',
                pageIndex: 1,
                pageSize: 7
            },
            parkArea: {
                number: '',
                type: ''
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
                'http://localhost:8888/parkArea/list?pageNum=' +
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
        // 触发搜索按钮
        handleSearch() {
            if (this.query.id) {
                let url = 'http://localhost:8888/parkArea/' + this.query.id
                axios
                    .get(url)
                    .then(rs => {
                        if (rs.data.code == 200) {
                            let result = rs.data.data
                            this.tableData = result.list
                            this.pageTotal = 1
                        } else {
                            this.$message.error('停车场不存在')
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                if (this.query.number) {
                    let url = 'http://localhost:8888/parkArea/number/' + this.query.number
                    axios
                        .get(url)
                        .then(rs => {
                            if (rs.data.code == 200) {
                                console.log(rs.data.data);
                                this.tableData = rs.data.data.list
                                this.pageTotal = 1

                            } else {
                                this.$message.error('停车场不存在')
                            }

                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    if (this.query.type) {
                        let url = 'http://localhost:8888/parkArea/type/' + this.query.type
                        axios
                            .get(url)
                            .then(rs => {
                                if (rs.data.code == 200) {
                                    console.log(rs.data.data);
                                    this.tableData = rs.data.data.list
                                    this.pageTotal = 1
                                } else {
                                    this.$message.error('停车场不存在')
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
                    let url = 'http://localhost:8888/parkArea/delete/' + this.tableData[index].id;
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
            let url = 'http://localhost:8888/parkArea/update/' + this.form.id
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
            let url = 'http://localhost:8888/parkArea/add/'
            axios
                .post(url, this.parkArea)
                .then(rs => {
                    if (rs.data.code == 200) {
                        this.insertVisible = false;
                        this.$message.success(`添加停车场成功`);
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
