<template>
<div>
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <i class="el-icon-lx-cascades"></i> 费用项设置
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="container">
        <div class="handle-box">
            <el-select v-model="query.feeFlag" placeholder="请选择费用标识" style="width:300px;margin-right:30px">
                <el-option label="周期性费用" value="0"></el-option>
                <el-option label="一次性费用" value="1"></el-option>
            </el-select>
            <el-input v-model="query.feeItem" placeholder="请输入费用项目" class="handle-input mr10" style="margin-right:30px"></el-input>
            <el-select v-model="query.type" placeholder="请选择费用类型" style="width:300px;margin-right:30px">
                <el-option label="物业费" value="0"></el-option>
                <el-option label="出租车位费" value="1"></el-option>
                <el-option label="出售车位费" value="2"></el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
            <el-button type="primary" icon="el-icon-plus" @click="handleInsert" style="float:right">添加</el-button>
        </div>
        <el-divider></el-divider>
        <el-table :data="tableData" class="table" header-cell-class-name="table-header">
            <el-table-column prop="id" label="费用项id"></el-table-column>
            <el-table-column prop="type" label="费用类型">
                <template slot-scope="scope">
                    <span>{{scope.row.type==0?'物业费':scope.row.type==1?'出租车位费':scope.row.type==2?'出售车位费':''}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="feeItem" label="收费项目"></el-table-column>
            <el-table-column prop="feeFlag" label="费用标识">
                <template slot-scope="scope">
                    <span>{{scope.row.feeFlag==0?'周期性费用':scope.row.feeFlag==1?'一次性费用':''}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="startTime" label="计费起始时间" width="170"></el-table-column>
            <el-table-column prop="endTime" label="计费终止时间" width="170"></el-table-column>
            <el-table-column prop="cost" label="固定费用">
                <template slot-scope="scope">
                    <span>{{scope.row.cost?scope.row.cost+'元':'-'}}</span>
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
            <el-form-item label="费用类型">
                <el-select v-model="form.type" placeholder="必填，请选择费用类型" style="width:100%">
                    <el-option label="物业费" value="0"></el-option>
                    <el-option label="出租车位费" value="1"></el-option>
                    <el-option label="出售车位费" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="收费项目">
                <el-input v-model="form.feeItem"></el-input>
            </el-form-item>
            <el-form-item label="费用标识">
                <el-select v-model="form.feeFlag" placeholder="必填，请选择费用标识" style="width:100%">
                    <el-option label="周期性费用" value="0"></el-option>
                    <el-option label="一次性费用" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开始时间">
                <el-date-picker v-model="form.startTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" style="width:100%">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
                <el-date-picker v-model="form.endTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" style="width:100%">
                </el-date-picker>
            </el-form-item>

            <el-form-item label="固定费用">
                <el-input v-model="form.cost"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
    </el-dialog>

    <!-- 插入弹出框 -->
    <el-dialog title="添加费用项" :visible.sync="insertVisible" width="30%">
        <el-form ref="form" :model="fee" label-width="70px" label-position="left">
            <el-form-item label="费用类型">
                <el-select v-model="fee.type" placeholder="必填，请选择费用类型" style="width:100%">
                    <el-option label="物业费" value="0"></el-option>
                    <el-option label="出租车位费" value="1"></el-option>
                    <el-option label="出售车位费" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="收费项目">
                <el-input v-model="fee.feeItem"></el-input>
            </el-form-item>
            <el-form-item label="费用标识">
                <el-select v-model="fee.feeFlag" placeholder="必填，请选择费用标识" style="width:100%">
                    <el-option label="周期性费用" value="0"></el-option>
                    <el-option label="一次性费用" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开始时间">
                <el-date-picker v-model="fee.startTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" style="width:100%">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
                <el-date-picker v-model="fee.endTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" style="width:100%">
                </el-date-picker>
            </el-form-item>

            <el-form-item label="固定费用">
                <el-input v-model="fee.cost"></el-input>
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
    name: 'feeConfig',
    data() {
        return {
            query: {
                feeFlag: '',
                feeItem: '',
                type: '',
                pageIndex: 1,
                pageSize: 7
            },
            fee: {
                id: '',
                type: '',
                feeItem: '',
                feeFlag: '',
                startTime: '',
                endTime: '',
                createTime: '',
                cost: ''
            },
            tableData: [],
            form: {},
            editVisible: false,
            insertVisible: false,
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
                'http://localhost:8888/feeConfig/list?pageNum=' +
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
        handleEdit(index, row) {
            this.editVisible = true
            this.form = row;
        },
        saveEdit() {
            console.log(this.form.createTime)
            let url = 'http://localhost:8888/feeConfig/update/' + this.form.id
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
                    let url = 'http://localhost:8888/feeConfig/delete/' + this.tableData[index].id;
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
            if (this.query.feeFlag) {
                let url = 'http://localhost:8888/feeConfig/flag?flag=' + this.query.feeFlag + '&pageNum=' + this.query.pageIndex +
                    '&pageSize=' + this.query.pageSize
                axios
                    .get(url)
                    .then(rs => {
                        if (rs.data.code == 200) {
                            console.log(rs.data.data);
                            let result = rs.data.data
                            this.tableData = result.list
                            this.query.feeFlag = null
                            this.pageTotal = this.tableData.length
                        } else {
                            this.$message.error('费用信息不存在')
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                if (this.query.feeItem) {
                    let url = 'http://localhost:8888/feeConfig/item?item=' + this.query.feeItem
                    axios
                        .get(url)
                        .then(rs => {
                            if (rs.data.code == 200) {
                                console.log(rs.data.data);
                                let result = rs.data.data
                                this.tableData = Array.of(result)
                                this.query.type = null
                                this.pageTotal = this.tableData.length
                            } else {
                                this.$message.error('费用信息不存在')
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    if (this.query.type) {
                        let url = 'http://localhost:8888/feeConfig/type?type=' + this.query.type + '&pageNum=' +
                            this.query.pageIndex +
                            '&pageSize=' +
                            this.query.pageSize;
                        axios
                            .get(url)
                            .then(rs => {
                                if (rs.data.code == 200) {
                                    console.log(rs.data.data);
                                    this.tableData = rs.data.data.list
                                    this.query.feeConfigPeople = null
                                    this.pageTotal = this.tableData.length
                                } else {
                                    this.$message.error('费用信息不存在')
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
            this.insertVisible = true
        },
        saveInsert() {
            let url = 'http://localhost:8888/feeConfig/add'
            axios
                .post(url, this.fee)
                .then(rs => {
                    if (rs.data.code == 200) {
                        this.insertVisible = false;
                        this.$message.success(`新增费用项成功`);
                        this.getData();
                    } else {
                        this.$message.error('新增费用项失败')
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
