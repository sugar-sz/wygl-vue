<template>
<div>
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <i class="el-icon-lx-cascades"></i> 房屋收费
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="container">
        <div class="handle-box">
            <el-input v-model="room.buildingName" placeholder="请选择楼房" class="handle-input mr10" style="width:250px"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="handleChose" style="margin-right:10px">选择</el-button>
            <el-select v-model="room.unitNumber" slot="prepend" placeholder="请选择单元" style="width:300px">
                <el-option label="1单元" value="1"></el-option>
                <el-option label="2单元" value="2"></el-option>
            </el-select>
            <el-input v-model="room.roomNumber" placeholder="请填写房屋编号" class="handle-input mr10" style="margin-left:40px"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="handleSearch" style="float:right">搜索</el-button>
        </div>
        <el-divider></el-divider>

        <el-table :data="tableData" class="table" header-cell-class-name="table-header">
            <el-table-column prop="id" label="房屋id"></el-table-column>
            <el-table-column prop="number" label="房屋编号">
                <template slot-scope="scope">
                    <span>{{scope.row.buildingNumber+'号楼'+scope.row.unitNumber+'单元'+scope.row.number+'室'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="height" label="楼层">
                <template slot-scope="scope">
                    <span>{{scope.row.height + '层'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="ownerId" label="业主id" width="150"></el-table-column>
            <el-table-column prop="name" label="业主姓名" width="150"></el-table-column>
            <el-table-column prop="identity" label="业主身份证"></el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button type="text" @click="createFee(scope.$index, scope.row)">创建收费</el-button>
                    <el-button type="text" @click="listRoomFee(scope.$index, scope.row)">查看收费</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex" :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
        </div>
    </div>

    <!-- 创建费用弹出框 -->
    <el-dialog title="创建收费" :visible.sync="createFeeVisible" width="30%">
        <el-form ref="form" :model="form" label-width="70px" label-position="left">
            <el-form-item label="收费范围">
                <el-input v-model="range" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="费用类型">
                <el-select v-model="form.type" placeholder="必填，请选择费用类型" style="width:100%">
                    <el-option label="物业费" value="0"></el-option>
                    <el-option label="出租车位费" value="1"></el-option>
                    <el-option label="出售车位费" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="收费项目">
                <el-select v-model="form.feeItem" placeholder="必填，请选择费用项目" style="width:100%" @focus="handleFeeItem" @change="handleChange(form.feeItem)">
                    <el-option v-for="item in feeItemArray" :key="item.feeItem" :value="item.feeItem" :label="item.feeItem"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="出账类型">
                <el-select v-model="feeDetails.cycles" placeholder="必填，请选择出账类型" style="width:100%">
                    <el-option label="每日" value="0"></el-option>
                    <el-option label="每月1日" value="1"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="createFeeVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveCreateFee">确 定</el-button>
        </span>
    </el-dialog>

    <!-- 选择楼房弹出框 -->
    <el-dialog title="选择楼房" :visible.sync="choseVisible" width="60%">
        <div style="margin-bottom:40px">
            <el-input v-model="query.buildingNumber" placeholder="输入楼房编号" style="width:500px;margin-right:20px"></el-input>
            <el-input v-model="query.buildingName" placeholder="输入楼房名称" style="width:200px;margin-right:10px"></el-input>
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
    name: 'roomCreateFee',
    data() {
        return {
            query: {
                buildingName: '',
                buildingNumber: '',
                unitNumber: '',
                roomNumber: '',
                pageIndex: 1,
                pageSize: 7
            },
            room: {
                buildingNumber: '',
                unitNumber: '',
                roomNumber: ''
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
            feeDetails: {
                id: '',
                feeId: '',
                roomId: '',
                cycles: '',
                receivableAmount: '',
                receivedAmount: 0,
                createTime: '',
                remark: ''
            },
            range: '',
            tableData: [],
            buildingTableData: [],
            feeItemArray: [],
            form: {},
            createFeeVisible: false,
            choseVisible: false,
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
                'http://localhost:8888/room/roomCreateFee?pageNum=' +
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

        createFee(index, row) {
            this.createFeeVisible = true
            this.form = row;
            this.range = this.form.buildingNumber + '号楼' + this.form.unitNumber + '单元' + this.form.number + '室'
        },

        handleFeeItem() {
            let url =
                'http://localhost:8888/feeConfig/type?type=' + this.form.type
            axios
                .get(url)
                .then(rs => {
                    if (rs.data.code == 200) {
                        let result = rs.data.data.list
                        console.log(result)
                        this.feeItemArray = result
                        this.$message.success("查看费用项信息")
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        handleChange(feeItem) {
            for (let i = 0; i < this.feeItemArray.length; i++) {
                let temp = this.feeItemArray[i]
                //console.log(temp.id)
                if (temp.feeItem == feeItem) {
                    this.feeDetails.feeId = temp.id
                    this.feeDetails.receivableAmount = temp.cost
                    console.log(temp.cost)
                }
            }
        },
        saveCreateFee() {
            this.feeDetails.roomId = this.form.id
            let url = 'http://localhost:8888/feeDetails/add'
            axios
                .post(url, this.feeDetails)
                .then(rs => {
                    if (rs.data.code == 200) {
                        this.createFeeVisible = false;
                        this.$message.success('创建收费成功');
                        
                    } else {
                        this.$message.success(`创建收费失败`);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        listRoomFee(index, row) {
             this.$router.push({
                path: '/listRoomFee',
                query: {
                    roomInfo: row
                }
            })
        },
        // 触发搜索按钮

        handleSearch() {
            if (!this.room.buildingNumber) {
                this.$message.error('请选择楼房')
            } else {
                if (!this.room.unitNumber) {
                    this.$message.error('请选择单元')
                } else {
                    if (this.room.roomNumber) {
                        let url = 'http://localhost:8888/room?buildingNumber=' + this.room.buildingNumber +
                            '&unitNumber=' + this.room.unitNumber + '&roomNumber=' + this.room.roomNumber
                        axios
                            .get(url)
                            .then(rs => {
                                if (rs.data.code == 200) {
                                    console.log(rs.data.data);
                                    this.tableData = rs.data.data.list
                                    this.pageTotal = 1
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

        confirmChose(index, row) {
            this.room.buildingName = row.name
            this.choseVisible = false
            this.room.buildingNumber = row.number
            this.getRoomInfoByBuildingNumber()
        },

        getRoomInfoByBuildingNumber() {
            let url = 'http://localhost:8888/room/' + this.room.buildingNumber + '?pageNum=' + this.query.pageIndex + '&pageSize=' + this.query.pageSize
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
