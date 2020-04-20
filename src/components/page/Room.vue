<template>
<div>
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <i class="el-icon-lx-cascades"></i> 房屋管理
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="container">
        <div class="handle-box">
            <el-input v-model="selectName" placeholder="请选择楼房" class="handle-input mr10" style="width:250px"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="handleChose" style="margin-right:10px">选择</el-button>
            <el-select v-model="unitNumber" slot="prepend" placeholder="请选择单元" style="width:300px">
                <el-option label="1单元" value="1"></el-option>
                <el-option label="2单元" value="2"></el-option>
            </el-select>
            <el-input v-model="roomNumber" placeholder="请填写房屋编号" class="handle-input mr10" style="margin-left:40px"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleInsert" style="float:right">添加房屋</el-button>
        </div>
        <el-table :data="tableData" class="table" header-cell-class-name="table-header">
            <el-table-column prop="id" label="房屋id" width="70px"></el-table-column>
            <el-table-column prop="buildingNumber" label="楼房编号" width="150px"></el-table-column>
            <el-table-column prop="unitNumber" label="单元编号" width="150px"></el-table-column>
            <el-table-column prop="number" label="房屋编号" width="150px"></el-table-column>
            <el-table-column prop="height" label="楼层"></el-table-column>
            <el-table-column prop="area" label="建筑面积"></el-table-column>
            <el-table-column prop="price" label="单价"></el-table-column>
            <el-table-column prop="status" label="房屋状态">
                <template slot-scope="scope">
                    <span :style="{ color: scope.row.status === 0 ? '#cccccc' : '#ED3F14' }">{{ scope.row.status === 1 ? '未售' : '已售' }}</span>
                </template>
            </el-table-column>
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
            <el-form-item label="房屋id">
                <el-input v-model="form.id" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="房屋编号">
                <el-input v-model="form.number"></el-input>
            </el-form-item>
            <el-form-item label="房屋楼层">
                <el-input v-model="form.height"></el-input>
            </el-form-item>
            <el-form-item label="房屋单元">
                <el-select v-model="form.unitNumber" placeholder="请选择单元" style="width:100%">
                    <el-option label="1单元" value="1"></el-option>
                    <el-option label="2单元" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="建筑面积">
                <el-input v-model="form.area"></el-input>
            </el-form-item>
            <el-form-item label="房屋单价">
                <el-input v-model="form.price"></el-input>
            </el-form-item>
            <el-form-item label="房屋状态">
                <el-input v-model="form.status" :disabled="true"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveEdit">确 定</el-button>
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
    name: 'room',
    data() {
        return {
            query: {
                id: '',
                number: '',
                buildingNumber: '',
                buildingName: '',
                pageIndex: 1,
                pageSize: 7
            },
            buildingNumber: '',
            unitNumber: '',
            roomNumber: '',
            selectName: '',
            tableData: [],
            buildingTableData: [],
            editVisible: false,
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
                'http://localhost:8888/room/list?pageNum=' +
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
            if (!this.selectName) {
                this.$message.error('请选择楼房')
            } else {
                if (!this.unitNumber) {
                    this.$message.error('请选择单元')
                } else {
                    if (this.roomNumber) {
                        let url = 'http://localhost:8888/room/?buildingNumber=' + this.buildingNumber +
                            '&unitNumber=' + this.unitNumber + '&roomNumber=' + this.roomNumber
                        axios
                            .get(url)
                            .then(rs => {
                                if (rs.data.code == 200) {
                                    console.log(rs.data.data);
                                    this.tableData = rs.data.data.list
                                    this.pageTotal = this.tableData.length
                                } else {
                                    this.$message.error('房屋不存在')
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
                    let url = 'http://localhost:8888/room/delete/' + this.tableData[index].id;
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
            let url = 'http://localhost:8888/room/update/' + this.form.id
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
            this.$router.push('/addRoom')
        },
        saveInsert() {
            let url = 'http://localhost:8888/room/add/'
            axios
                .post(url, this.room)
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
            this.query.pageIndex = 1
            this.query.pageSize = 7
            this.choseVisible = true
            let url = 'http://localhost:8888/building/list?pageNum=' + this.query.pageIndex + '&pageSize=' + this.query.pageSize
            axios
                .get(url)
                .then(rs => {
                    if (rs.data.code == 200) {
                        let result = rs.data.data
                        this.buildingTableData = result.list
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
                                let result = rs.data.data
                                this.buildingTableData = result.list
                                this.query.buildingName = null
                            } else {
                                this.$message.error('楼房不存在')
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
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
                }
            }
        },
        getRoomInfoByBuildingNumber() {
            let url = 'http://localhost:8888/room/' + this.buildingNumber + '?pageNum=' + this.query.pageIndex + '&pageSize=' + this.query.pageSize
            axios
                .get(url)
                .then(rs => {
                    if (rs.data.code == 200) {
                        let result = rs.data.data
                        this.tableData = result.list
                        this.$message.success('查询房屋信息成功')
                        this.pageTotal = result.total
                    } else {
                        this.$message.error('查询房屋信息失败')
                    }
                })
                .catch(function (error) {
                    this.$message.error('查询单元信息失败')
                    console.log(error);
                });
        },
        confirmChose(index, row) {
            this.selectName = row.name
            this.choseVisible = false
            this.buildingNumber = row.number
            this.getRoomInfoByBuildingNumber()
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
