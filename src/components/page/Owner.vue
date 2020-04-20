<template>
<div>
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <i class="el-icon-lx-cascades"></i> 业主信息
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="container">
        <div class="handle-box">
            <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleInsert" style="float:right">新增业主</el-button>
        </div>
        <el-table :data="tableData" border class="table" header-cell-class-name="table-header" highlight-current-row>
            <el-table-column prop="id" label="业主Id" width="70px"></el-table-column>
            <el-table-column prop="name" label="姓名" width="150px"></el-table-column>
            <el-table-column prop="sex" label="性别" width="100px"></el-table-column>
            <el-table-column prop="age" label="年龄" width="100px"></el-table-column>
            <el-table-column prop="identity" label="身份证" width="200px"></el-table-column>
            <el-table-column prop="phone" label="联系方式"></el-table-column>
            <el-table-column prop="createPeople" label="创建员工"></el-table-column>
            <el-table-column label="操作" width="160">
                <template slot-scope="scope">
                    <el-dropdown size="mini" split-button type="primary">
                        变更业主信息
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">修改信息</el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button type="text" icon="el-icon-house" @click="handleAddOwnerRoom(scope.$index, scope.row)">入住房屋</el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button type="text" icon="el-icon-unlock" class="red" @click="handleDeleteOwnerRoom(scope.$index, scope.row)">房屋解绑</el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button type="text" icon="el-icon-plus" @click="handleParkSpaceHire(scope.$index, scope.row)">车位出租</el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button type="text" icon="el-icon-sell" class="red" @click="handleParkSpaceSell(scope.$index, scope.row)">车位售卖</el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button type="text" icon="el-icon-s-release"  @click="handleRepair(scope.$index, scope.row)">业主报修</el-button>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>

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
            <el-form-item label="业主id">
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
            <el-form-item label="创建员工">
                <el-input v-model="form.createPeople"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
    </el-dialog>

    <!-- 新增业主弹出框 -->
    <el-dialog title="新增业主" :visible.sync="insertVisible" width="30%">
        <el-form label-width="70px">
            <el-form-item label="创建员工">
                <el-input v-model="owner.createPeople" :readonly="true"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="owner.name"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-input v-model="owner.sex"></el-input>
            </el-form-item>
            <el-form-item label="年龄">
                <el-input v-model="owner.age"></el-input>
            </el-form-item>
            <el-form-item label="身份证">
                <el-input v-model="owner.identity"></el-input>
            </el-form-item>
            <el-form-item label="联系方式">
                <el-input v-model="owner.phone"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="insertVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveInsert">确 定</el-button>
        </span>
    </el-dialog>

    <!-- 选择房屋弹出框 -->
    <el-dialog title="选择房屋" :visible.sync="roomVisible" width="60%">
        <el-table :data="roomTableData">
            <el-table-column prop="id" label="房屋id" width="60px"></el-table-column>
            <el-table-column prop="buildingNumber" label="楼房编号"></el-table-column>
            <el-table-column prop="unitNumber" label="单元编号"></el-table-column>
            <el-table-column prop="number" label="房屋编号"></el-table-column>
            <el-table-column prop="height" label="楼层"></el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-circle-check" class="green" @click="roomChose(scope.$index, scope.row)">选择</el-button>
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
                name: '',
                pageIndex: 1,
                pageSize: 7
            },
            owner: {
                createPeople: localStorage.getItem('adminName'),
                name: "",
                sex: "",
                age: "",
                identity: "",
                phone: ""
            },
            roomNumber: '',
            roomInfo: '',
            ownerInfo: '',
            tableData: [],
            roomTableData: [],
            editVisible: false,
            roomVisible: false,
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
                'http://localhost:8888/owner/list?pageNum=' +
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
            let url =
                'http://localhost:8888/owner/?name=' + this.query.name + '&pageNum=' + this.query.pageIndex +
                '&pageSize=' + this.query.pageSize
            axios
                .get(url)
                .then(rs => {
                    if (rs.data.code == 200) {
                        console.log(rs);
                        let result = rs.data.data;
                        this.tableData = result.list
                        this.pageTotal = result.total;
                        this.pageIndex = result.pageNum;
                        this.pageSize = result.pageSize;
                    } else {
                        this.$message.error('业主不存在')
                    }

                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                .then(() => {
                    let url = 'http://localhost:8888/owner/delete/' + this.tableData[index].id;
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
            let url = 'http://localhost:8888/owner/update/' + this.form.id
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
            let url = 'http://localhost:8888/owner/add/'
            axios
                .post(url, this.owner)
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
        handleAddOwnerRoom(index, row) {
            this.$router.push({
                path: '/addOwnerRoom',
                query: {
                    ownerId: row.id
                }
            })
        },
        handleDeleteOwnerRoom(index, row) {
            this.$router.push({
                path: '/deleteOwnerRoom',
                query: {
                    ownerId: row.id
                }
            })
        },
        handleParkSpaceHire(index, row) {
            this.$router.push({
                path: '/hireParkingSpace',
                query: {
                    ownerId: row.id
                }
            })
        },
        handleParkSpaceSell(index, row) {
            this.$router.push({
                path: '/sellParkingSpace',
                query: {
                    ownerId: row.id
                }
            })
        },
        handleRepair(index, row) {
            //console.log(row)
            this.ownerInfo = row
            this.roomVisible = true
            let url =
                'http://localhost:8888/room/owner/' + row.id
            axios
                .get(url)
                .then(rs => {
                    if (rs.data.code == 200) {
                        console.log(rs);
                        let result = rs.data.data;
                        this.roomTableData = result.list
                    } else {
                        this.$message.error('业主不存在')
                    }

                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        roomChose(index, row) {
            this.roomInfo = row
            this.$router.push({
                path: '/ownerRepair',
                query: {
                    ownerId: this.ownerInfo.id,
                    roomId: row.id
                }
            })
            this.roomVisible = false
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
