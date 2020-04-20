<template>
<div>
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <i class="el-icon-lx-cascades"></i> 投诉建议
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="container">
        <div class="handle-box">
            <el-input v-model="query.id" placeholder="请输入投诉id" class="handle-input mr10" style="margin-right:30px"></el-input>
            <el-select v-model="query.type" placeholder="请选择投诉类型" style="width:300px;margin-right:30px">
                <el-option label="建议" value="0"></el-option>
                <el-option label="投诉" value="1"></el-option>
            </el-select>
            <el-input v-model="query.complaintPeople" placeholder="请输入投诉人" class="handle-input mr10" style="margin-right:40px"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            <el-button type="primary" icon="el-icon-plus" @click="handleInsert" style="float:right">投诉</el-button>
        </div>
        <el-divider></el-divider>
        <el-table :data="tableData" class="table" header-cell-class-name="table-header">
            <el-table-column prop="id" label="投诉id"></el-table-column>
            <el-table-column prop="type" label="投诉类型">
                <template slot-scope="scope">
                    <span>{{scope.row.type==1?'投诉':'建议'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="roomId" label="房屋">
                 <template slot-scope="scope">
                    <span>{{scope.row.buildingNumber+'号楼 ' + scope.row.unitNumber + '单元 ' + scope.row.roomId + '室'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="complaintPeople" label="投诉人"></el-table-column>
            <el-table-column prop="phone" label="投诉电话"></el-table-column>
            <el-table-column prop="status" label="投诉状态">
                 <template slot-scope="scope">
                    <span>{{scope.row.status==0?'处理中':'处理完成'}}</span>
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
    <el-dialog title="修改" :visible.sync="editVisible" width="30%">
        <el-form ref="form" :model="form" label-width="70px" label-position="left">
            <el-form-item label="投诉人">
                <el-input v-model="form.complaintPeople"></el-input>
            </el-form-item>
            <el-form-item label="投诉类型">
                <el-select v-model="form.type" placeholder="必填，请选择投诉类型" style="width:100%">
                    <el-option label="建议" value="0"></el-option>
                    <el-option label="投诉" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="投诉电话">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="投诉内容">
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
    name: 'complaint',
    data() {
        return {
            query: {
                id: '',
                complaintPeople: '',
                type: '',
                pageIndex: 1,
                pageSize: 7
            },
            tableData: [],
            form: {},
            editVisible: false,
            pageTotal: 0,
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
                'http://localhost:8888/complaint/list?pageNum=' +
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
        handleDetail(index, row) {
            this.$router.push({
                path: '/complaintDetail',
                query: {
                    complaintId: row.id
                }
            })
        },
        handleEdit(index, row) {
            this.editVisible = true
            this.form = row;
        },
        saveEdit() {
            console.log(this.form.createTime)
            let url = 'http://localhost:8888/complaint/update/' + this.form.id
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
                    let url = 'http://localhost:8888/complaint/delete/' + this.tableData[index].id;
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
                let url = 'http://localhost:8888/complaint/' + this.query.id
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
                            this.$message.error('投诉信息不存在')
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                if (this.query.type) {
                    let url = 'http://localhost:8888/complaint/type?type=' + this.query.type + '&pageNum=' +
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
                                this.$message.error('投诉信息不存在')
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    if (this.query.complaintPeople) {
                        let url = 'http://localhost:8888/complaint/name?name=' + this.query.complaintPeople + '&pageNum=' +
                            this.query.pageIndex +
                            '&pageSize=' +
                            this.query.pageSize;
                        axios
                            .get(url)
                            .then(rs => {
                                if (rs.data.code == 200) {
                                    console.log(rs.data.data);
                                    this.tableData = rs.data.data.list
                                    this.query.complaintPeople = null
                                    this.pageTotal = this.tableData.length
                                } else {
                                    this.$message.error('投诉信息不存在')
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
            this.$router.push({
                path: '/addComplaint'
            })
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
