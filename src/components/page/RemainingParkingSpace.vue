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
            <span style="font-size:14px"> 剩余车位</span>
        </div>
        <el-table :data="tableData" class="table" header-cell-class-name="table-header">
            <el-table-column prop="total" label="总车位数"></el-table-column>
            <el-table-column prop="remainingParkSpace" label="剩余车位数"></el-table-column>
            <el-table-column prop="date" label="采集时间">

            </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button type="text" @click="handleRefresh(scope.$index, scope.row)">刷新</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>

</div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
export default {
    name: 'parkArea',
    data() {
        return {
            tableData: [],
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
                'http://localhost:8888/parkSpace/count'
            axios
                .get(url)
                .then(rs => {
                    console.log(rs);
                    let result = rs.data.data
                    let array = Array.of(result)
                    this.tableData = array
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        handleRefresh(index, row) {
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
