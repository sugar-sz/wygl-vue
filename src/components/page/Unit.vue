<template>
<div>
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <i class="el-icon-lx-cascades"></i> 单元信息
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="container">
        <div class="handle-box">
            <el-input v-model="selectName" placeholder="请选择楼房" class="handle-input mr10" style="width:250px"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="handleChose" style="margin-right:10px">选择</el-button>
            <el-input v-model="query.number" placeholder="请输入单元编号" class="handle-input mr10"></el-input>
            <el-input v-model="query.height" placeholder="请输入总层数" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            <el-button type="primary" v-show="unit.buildingId" icon="el-icon-circle-plus-outline" @click="handleInsert" style="float:right">添加单元</el-button>
        </div>
        <el-table :data="tableData" class="table" header-cell-class-name="table-header">
            <el-table-column prop="id" label="单元id" width="70px"></el-table-column>
            <el-table-column prop="number" label="单元编号" width="150px"></el-table-column>    
            <el-table-column prop="height" label="总层数"></el-table-column>
            <el-table-column prop="elevator" label="是否有电梯"></el-table-column>
            <el-table-column prop="createPeople" label="创建人"></el-table-column>
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
            <el-form-item label="单元id">
                <el-input v-model="form.id" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="单元编号">
                <el-input v-model="form.number" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="总层数">
                <el-input v-model="form.height" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="是否有电梯">
                <el-input v-model="form.elevator"></el-input>
            </el-form-item>
            <el-form-item label="创建人">
                <el-input v-model="form.createPeople"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
    </el-dialog>

    <!-- 添加楼房弹出框 -->
    <el-dialog title="添加单元信息" :visible.sync="insertVisible" width="30%">
        <el-form label-width="70px">
            <el-form-item label="创建员工">
                <el-input v-model="unit.createPeople" :readonly="true"></el-input>
            </el-form-item>
            <el-form-item label="单元编号">
                <el-input v-model="unit.number"></el-input>
            </el-form-item>
            <el-form-item label="总层数">
                <el-input v-model="unit.height"></el-input>
            </el-form-item>
            <el-form-item label="是否有电梯">
                <el-input v-model="unit.elevator"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="insertVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveInsert">确 定</el-button>
        </span>
    </el-dialog>

    <!-- 选择楼房弹出框 -->
    <el-dialog title="选择楼房" :visible.sync="choseVisible" width="60%">
        <div style="margin-bottom:40px">
            <el-input v-model="query.buildingNumber" placeholder="输入楼房编号" style="width:500px;margin-right:20px"></el-input>
            <el-input v-model="query.buildingName" placeholder="输入楼房姓名" style="width:200px;margin-right:10px"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="handleBuildingSearch">查询</el-button>
        </div>
        <el-table :data="buildingTableData">
            <el-table-column prop="id" label="楼房id" width="60px"></el-table-column>
            <el-table-column prop="number" label="楼房编号"></el-table-column>
            <el-table-column prop="name" label="楼房名称"></el-table-column>
            <el-table-column prop="createPeople" label="创建员工"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="150px"></el-table-column>
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
    name: 'unit',
    data() {
        return {
            query: {
                id: '',
                number: '',
                height: '',
                buildingNumber: '',
                buildingName: '',
                pageIndex: 1,
                pageSize: 7
            },
            unit: {
                createPeople: localStorage.getItem('adminName'),
                number: '',
                height: '',
                elevator: '',
                buildingId: ''
            },
            tableData: [],
            buildingTableData: [],
            selectName: '',
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
        this.getData();
    },
    methods: {
        // 获取数据
        getData() {
            let url =
                'http://localhost:8888/unit/list?pageNum=' +
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
            if (this.query.number) {
                let url = 'http://localhost:8888/unit/number/' + this.query.number
                axios
                    .get(url)
                    .then(rs => {
                        if (rs.data.code == 200) {
                            console.log(rs.data.data);
                            this.tableData = rs.data.data.list
                            this.query.number = null
                            this.pageTotal = this.tableData.length
                        } else {
                            this.$message.error('楼房不存在')
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                if (this.query.height) {
                    let url = 'http://localhost:8888/unit/height/' + this.query.height
                    axios
                        .get(url)
                        .then(rs => {
                            if (rs.data.code == 200) {
                                console.log(rs.data.data);
                                this.tableData = rs.data.data.list
                                this.query.name = null
                                this.pageTotal = this.tableData.length
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
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                .then(() => {
                    let url = 'http://localhost:8888/unit/delete/' + this.tableData[index].id;
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
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            let url = 'http://localhost:8888/unit/update/' + this.form.id
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
        //处理插入
        handleInsert() {
            this.insertVisible = true;
        },
        saveInsert() {
            let url = 'http://localhost:8888/unit/add/'
            axios
                .post(url, this.unit)
                .then(rs => {
                    if (rs.data.code == 200) {
                        this.insertVisible = false;
                        this.$message.success(`添加单元成功`);
                        this.getData();
                    } else {
                        this.$message.success(`添加单元失败`);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        handleChose() {
            this.choseVisible = true
            let url = 'http://localhost:8888/building/list?pageNum=' + this.query.pageIndex + '&pageSize=' + this.query.pageSize
            axios
                .get(url)
                .then(rs => {
                    if (rs.data.code == 200) {
                        this.buildingTableData = rs.data.data.list
                        this.$message.success(`查看楼房信息`);
                    } else {
                        this.$message.error(`查询楼房信息失败`);
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        handleBuildingSearch() {
            if (this.query.buildingNumber) {
                let url = 'http://localhost:8888/building/number/' + this.query.buildingNumber
                axios
                    .get(url)
                    .then(rs => {
                        if (rs.data.code == 200) {
                            this.buildingTableData = rs.data.data.list
                            this.query.buildingNumber = null
                            this.$message.success(`查询成功`);
                        } else {
                            this.$message.error(`楼房不存在`);
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            } else {
                if (this.query.buildingName) {
                    let url = 'http://localhost:8888/building/?name=' + this.query.buildingName
                    axios
                        .get(url)
                        .then(rs => {
                            if (rs.data.code == 200) {
                                this.buildingTableData = rs.data.data.list
                                this.query.buildingName = null
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
        },
        getUnitInfoByBuildingId() {
            let url = 'http://localhost:8888/unit/' + this.unit.buildingId
            axios
                .get(url)
                .then(rs => {
                    if (rs.data.code == 200) {
                        this.tableData = rs.data.data.list
                        this.$message.success('查询单元信息成功')
                        this.pageTotal = this.tableData.length
                        this.query.pageIndex = 1
                    } else {
                        this.$message.error('查询单元信息失败')
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        confirmChose(index, row) {
            this.selectName = row.name
            this.choseVisible = false
            this.unit.buildingId = row.id
            this.getUnitInfoByBuildingId()
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
