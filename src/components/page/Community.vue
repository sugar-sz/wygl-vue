<template>
<div>
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <i class="el-icon-lx-cascades"></i> 我的小区
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="container">
        <div class="handle-box">
            <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量删除</el-button>
            <el-input v-model="query.name" placeholder="小区名称" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleInsert" style="margin-left: 50%">入驻小区</el-button>
        </div>
        <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header" @selection-change="handleSelectionChange">
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="communityId" label="小区Id"></el-table-column>
            <el-table-column prop="name" label="小区名称"></el-table-column>
            <el-table-column prop="phone" label="联系方式"></el-table-column>
            <el-table-column prop="communityAddress" label="地址"></el-table-column>
            <el-table-column prop="createTime" label="注册时间"></el-table-column>
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
            <el-form-item label="小区id">
                <el-input v-model="form.communityId" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="小区名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="联系方式">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="地址">
                <el-input v-model="form.communityAddress"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
    </el-dialog>

    <!-- 入驻小区弹出框 -->
    <el-dialog title="入驻小区" :visible.sync="insertVisible" width="30%">
        <el-form label-width="70px">
            <el-form-item label="管理员id">
                <el-input v-model="community.adminId"></el-input>
            </el-form-item>
            <el-form-item label="小区名称">
                <el-input v-model="community.name"></el-input>
            </el-form-item>
            <el-form-item label="联系方式">
                <el-input v-model="community.phone"></el-input>
            </el-form-item>
            <el-form-item label="地址">
                <el-input v-model="community.communityAddress"></el-input>
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
    name: 'community',
    data() {
        return {
            query: {
                name: '',
                pageIndex: 1,
                pageSize: 7
            },
            community: {
                adminId: '',
                name: "",
                phone: "",
                communityAddress: "",
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
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
                'http://localhost:8888/community/list?id=' +
                localStorage.getItem('adminId') +
                '&pageNum=' +
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
                'http://localhost:8888/community/?name=' + this.query.name + '&pageNum=' + this.query.pageIndex +
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
                        this.$message.success('小区不存在');
                    }

                })
                .catch(function (error) {
                    this.$message.success('小区不存在');
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
                    let url = 'http://localhost:8888/community/delete/' + this.tableData[index].communityId;
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
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            console.log(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                .then(() => {
                    let ids = this.delList.map(item => item.communityId).join(); //获取所有选中行的id组成的字符串，以逗号分隔
                    console.log(ids);
                    let url = 'http://localhost:8888/community/deleteList?ids=' + ids;
                    axios
                        .post(url)
                        .then(rs => {
                            if (rs.data.code == 200) {
                                this.$message.error(`删除了${str}`);
                                this.multipleSelection = [];
                                this.query.pageIndex = 1;
                                this.getData();
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
            let url = 'http://localhost:8888/community/update/' + this.form.communityId
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
            let url = 'http://localhost:8888/community/add/'
            axios
                .post(url, this.community)
                .then(rs => {
                    if (rs.data.code == 200) {
                        this.insertVisible = false;
                        this.$message.success(`入驻小区成功`);
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
