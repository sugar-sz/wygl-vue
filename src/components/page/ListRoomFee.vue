<template>
<div>
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <i class="el-icon-lx-cascades"></i> 房屋费用
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="container">
        <span>{{roomInfo.buildingNumber+'号楼'+roomInfo.unitNumber+'单元'+roomInfo.id+'室费用'}}</span>
        <el-divider></el-divider>
        <el-table :data="tableData" class="table" header-cell-class-name="table-header">
            <el-table-column prop="fee.id" label="费用项id"></el-table-column>
            <el-table-column prop="fee.type" label="费用类型">
                <template slot-scope="scope">
                    <span>{{scope.row.fee.type==0?'物业费':scope.row.fee.type==1?'出租车位费':scope.row.fee.type==2?'出售车位费':''}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="fee.feeItem" label="收费项目"></el-table-column>
            <el-table-column prop="fee.feeFlag" label="费用标识">
                <template slot-scope="scope">
                    <span>{{scope.row.fee.feeFlag==0?'周期性费用':scope.row.fee.feeFlag==1?'一次性费用':''}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="fee.startTime" label="计费起始时间" width="170"></el-table-column>
            <el-table-column prop="fee.endTime" label="计费终止时间" width="170"></el-table-column>
            <el-table-column prop="feeDetails.receivableAmount" label="状态">
                <template slot-scope="scope">
                    <span>{{scope.row.feeDetails.status==1?'收费完成':'收费中'}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button type="text" @click="handleFee(scope.$index, scope.row)">缴费</el-button>
                    <el-button type="text" class="red" @click="handleDelete(scope.$index, scope.row)">取消费用</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex" :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
        </div>
    </div>

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
            roomInfo: this.$route.query.roomInfo,
            tableData: [],
            form: {},
            insertVisible: false,
            pageTotal: 0,
            idx: -1,
            id: -1
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        // 获取数据
        getData() {
            let url =
                'http://localhost:8888/feeDetails/list?roomId=' + this.$route.query.roomInfo.id + '&pageNum=' +
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
        handleFee(index, row) {
            console.log(row)
            this.form = row;
            this.$router.push({
                path: '/payFee',
                query: {
                    form: JSON.stringify(row)
                }
            })
        },
       
        handleDelete(index, row) {
            console.log(this.tableData[index])
           
            this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                .then(() => {
                    let url = 'http://localhost:8888/feeDetails/delete/' + this.tableData[index].feeDetails.id;
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
