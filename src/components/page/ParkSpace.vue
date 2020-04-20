<template>
<div>
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <i class="el-icon-lx-cascades"></i> 车位信息
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="container">
        <div class="handle-box">
            <el-input v-model="parkAreaRowInfo.number" placeholder="请选择停车场" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="handleChose" style="margin-right:10px">选择</el-button>
            <el-input v-model="query.number" placeholder="请输入车位编号" class="handle-input mr10" style="width:250px"></el-input>
            <el-select v-model="query.status" slot="prepend" placeholder="请选择车位状态" style="width:250px">
                <el-option label="空闲" value="0"></el-option>
                <el-option label="出租" value="1"></el-option>
                <el-option label="售卖" value="2"></el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-search" @click="handleSearch" style="width:100px;margin-left:40px">搜索</el-button>
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleInsert" style="float:right">添加车位</el-button>
        </div>
        <el-table :data="tableData" class="table" header-cell-class-name="table-header">
            <el-table-column prop="id" label="车位id" width="100px"></el-table-column>
            <el-table-column prop="number" label="车位编号"></el-table-column>
            <el-table-column prop="parkAreaNumber" label="停车场编号"></el-table-column>
            <el-table-column prop="status" label="车位状态">
                <template slot-scope="scope">
                    <span v-text="scope.row.status===0?'空闲':scope.row.status===1?'出租':'售卖'"></span>
                </template>
            </el-table-column>
            <el-table-column prop="area" label="面积"></el-table-column>
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
            <el-form-item label="车位id">
                <el-input v-model="form.id" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="车位编号">
                <el-input v-model="form.number" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="车位状态">
                <el-select v-model="form.status" placeholder="请选择车位状态" style="width:100%">
                    <el-option label="空闲" value="0"></el-option>
                    <el-option label="出租" value="1"></el-option>
                    <el-option label="售卖" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="面积">
                <el-input v-model="form.area"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
    </el-dialog>

    <!-- 添加车位弹出框 -->
    <el-dialog title="添加车位" :visible.sync="insertVisible" width="30%">
        <el-form label-width="70px">
            <el-form-item label="车位编号">
                <el-input v-model="parkSpace.number" placeholder="必填，请输入车位编号"></el-input>
            </el-form-item>
            <el-form-item label="停车场">
                <el-select v-model="parkSpace.parkAreaNumber" placeholder="必填，请选择停车场" style="width:100%" @focus="handleParkArea">
                    <el-option v-for="item in parkAreaArray" :key="item.id" :value="item.number" :label="item.number"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="面积">
                <el-input v-model="parkSpace.area" placeholder="必填，请填写面积"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="insertVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveInsert">确 定</el-button>
        </span>
    </el-dialog>

    <!-- 选择停车场弹出框 -->
    <el-dialog title="选择停车场" :visible.sync="choseVisible" width="40%">
        <div style="margin-bottom:40px">
            <el-button type="primary" icon="el-icon-search" @click="handleParkAreaSearch" style="float:right">查询</el-button>
            <el-input v-model="query.parkAreaNumber" placeholder="输入停车场编号" style="width:170px;float:right"></el-input>
        </div>
        <el-table :data="parkAreaTableData">
            <el-table-column prop="id" label="停车场id" width="100px"></el-table-column>
            <el-table-column prop="number" label="停车场编号"></el-table-column>
            <el-table-column prop="type" label="停车场类型" width="150px"></el-table-column>
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
    name: 'parkSpace',
    data() {
        return {
            query: {
                number: '',
                typstatus: '',
                parkAreaNumber: '',
                pageIndex: 1,
                pageSize: 7
            },
            parkSpace: {
                number: '',
                status: 0,
                area: '',
                parkAreaNumber: ''
            },
            parkAreaRowInfo: '',
            parkAreaArray: [],
            tableData: [],
            parkAreaTableData: [],
            editVisible: false,
            choseVisible: false,
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
                'http://localhost:8888/parkSpace/list?pageNum=' +
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
            let url = 'http://localhost:8888/parkArea/list?pageNum=' +
                this.query.pageIndex +
                '&pageSize=' +
                this.query.pageSize;
            axios
                .get(url)
                .then(rs => {
                    if (rs.data.code == 200) {
                        let result = rs.data.data.list
                        this.parkAreaTableData = result
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        confirmChose(index, row) {
            this.parkAreaRowInfo = row
            this.choseVisible = false

            let url =
                'http://localhost:8888/parkSpace/parkArea/' + this.parkAreaRowInfo.number
            axios
                .get(url)
                .then(rs => {
                    if (rs.data.code == 200) {
                        let result = rs.data.data
                        console.log(result)
                        this.tableData = result.list
                        this.pageTotal = result.total
                    } else {
                        this.$message.error("查询停车场信息失败")
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        handleParkAreaSearch() {
            let url =
                'http://localhost:8888/parkArea/number/' + this.query.parkAreaNumber
            axios
                .get(url)
                .then(rs => {
                    if (rs.data.code == 200) {
                        let result = rs.data.data.list
                        console.log(result)
                        this.parkAreaTableData = result
                        this.$message.success("查询停车场信息成功")
                    } else {
                        this.$message.error("查询停车场信息失败")
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        handleParkArea() {
            let url =
                'http://localhost:8888/parkArea/list'
            axios
                .get(url)
                .then(rs => {
                    if (rs.data.code == 200) {
                        let result = rs.data.data.list
                        console.log(result)
                        this.parkAreaArray = result
                        this.$message.success("查看停车场信息")
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        // 触发搜索按钮
        handleSearch() {
            if (this.query.number) {
                let url = 'http://localhost:8888/parkSpace/number/' + this.query.number
                axios
                    .get(url)
                    .then(rs => {
                        if (rs.data.code == 200) {
                            console.log(rs.data.data);
                            this.tableData = rs.data.data.list
                            this.pageTotal = 1

                        } else {
                            this.$message.error('车位不存在')
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                if (this.query.status) {
                    let url = 'http://localhost:8888/parkSpace/status/' + this.query.status
                    axios
                        .get(url)
                        .then(rs => {
                            if (rs.data.code == 200) {
                                console.log(rs.data.data);
                                this.tableData = rs.data.data.list
                                this.pageTotal = 1
                            } else {
                                this.$message.error('车位不存在')
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
                    let url = 'http://localhost:8888/parkSpace/delete/' + this.tableData[index].id;
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
            let url = 'http://localhost:8888/parkSpace/update/' + this.form.id
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
            let url = 'http://localhost:8888/parkSpace/add/'
            axios
                .post(url, this.parkSpace)
                .then(rs => {
                    if (rs.data.code == 200) {
                        this.insertVisible = false;
                        this.$message.success(`添加车位成功`);
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
