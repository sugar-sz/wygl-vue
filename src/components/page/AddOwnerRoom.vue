<template>
<div>
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <i class="el-icon-lx-cascades"></i> 添加房屋
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>

    <div style="margin-top:80px;height:100px">
        <div style="margin-top:40px">
            <el-steps :active="active" align-center>
                <el-step title="选择楼房"></el-step>
                <el-step title="选择房屋"></el-step>
                <el-step title="业主信息"></el-step>
            </el-steps>
        </div>
    </div>
    <div class="container">
        <div v-show="active==0">
            <div class="handle-box">
                <span style="font-family:'Microsoft YaHei';font-size:15px">楼房信息</span>
                <el-button type="primary" icon="el-icon-search" style="float:right;margin-bottom:10px;" @click="handleChose">选择楼房</el-button>
            </div>

            <div style="margin-top:60px;">
                <el-row style="margin-bottom:40px">
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <span style="font-family:'Microsoft YaHei';font-size:13px;color:green">楼id:&nbsp;&nbsp;&nbsp;{{buildingRowInfo.id}}</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple-light">
                            <span style="font-family:'Microsoft YaHei';font-size:13px;color:green">楼名称:&nbsp;&nbsp;&nbsp;{{buildingRowInfo.name}}</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <span style="font-family:'Microsoft YaHei';font-size:13px;color:green">楼编号:&nbsp;&nbsp;&nbsp;{{buildingRowInfo.number}}</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>

        <div v-show="active==1">
            <div class="handle-box">
                <span style="font-family:'Microsoft YaHei';font-size:15px">房屋信息</span>
                <el-button type="primary" icon="el-icon-search" style="float:right;margin-bottom:10px;" @click="roomChose">选择房屋</el-button>
            </div>

            <div style="margin-top:60px;">
                <el-row style="margin-bottom:40px">
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <span style="font-family:'Microsoft YaHei';font-size:13px;color:green">房屋id:&nbsp;&nbsp;&nbsp;{{roomRowInfo.id}}</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple-light">
                            <span style="font-family:'Microsoft YaHei';font-size:13px;color:green">房屋编号:&nbsp;&nbsp;&nbsp;{{roomRowInfo.number}}</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <span style="font-family:'Microsoft YaHei';font-size:13px;color:green">单元:&nbsp;&nbsp;&nbsp;{{roomRowInfo.unitNumber}}</span>
                        </div>
                    </el-col>
                </el-row>
                <el-row style="margin-bottom:40px">
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <span style="font-family:'Microsoft YaHei';font-size:13px;color:green">楼层:&nbsp;&nbsp;&nbsp;{{roomRowInfo.height}}</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple-light">
                            <span style="font-family:'Microsoft YaHei';font-size:13px;color:green">建筑面积:&nbsp;&nbsp;&nbsp;{{roomRowInfo.area}}</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <span style="font-family:'Microsoft YaHei';font-size:13px;color:green">单价:&nbsp;&nbsp;&nbsp;{{roomRowInfo.price}}</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>

        <div v-show="active==2">
            <div class="handle-box">
                <span style="font-family:'Microsoft YaHei';font-size:15px">业主信息</span>
            </div>

            <div style="margin-top:40px;">
                <el-row style="margin-bottom:40px">
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <span style="font-family:'Microsoft YaHei';font-size:13px;color:green">业主id:&nbsp;&nbsp;&nbsp;{{ownerInfo.id}}</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple-light">
                            <span style="font-family:'Microsoft YaHei';font-size:13px;color:green">姓名:&nbsp;&nbsp;&nbsp;{{ownerInfo.name}}</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <span style="font-family:'Microsoft YaHei';font-size:13px;color:green">性别:&nbsp;&nbsp;&nbsp;{{ownerInfo.sex}}</span>
                        </div>
                    </el-col>
                </el-row>
                <el-row style="margin-bottom:40px">
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <span style="font-family:'Microsoft YaHei';font-size:13px;color:green">年龄:&nbsp;&nbsp;&nbsp;{{ownerInfo.age}}</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple-light">
                            <span style="font-family:'Microsoft YaHei';font-size:13px;color:green">联系方式:&nbsp;&nbsp;&nbsp;{{ownerInfo.phone}}</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <span style="font-family:'Microsoft YaHei';font-size:13px;color:green">身份证:&nbsp;&nbsp;&nbsp;{{ownerInfo.identity}}</span>
                        </div>
                    </el-col>
                </el-row>

                <el-row style="margin-bottom:40px">
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <span style="font-family:'Microsoft YaHei';font-size:13px;color:green">创建时间:&nbsp;&nbsp;&nbsp;{{ownerInfo.createTime}}</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple-light">
                            <span style="font-family:'Microsoft YaHei';font-size:13px;color:green">创建员工:&nbsp;&nbsp;&nbsp;{{ownerInfo.createPeople}}</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>

    <!-- 选择楼房弹出框 -->
    <el-dialog title="选择楼房" :visible.sync="choseVisible" width="60%">
        <div style="margin-bottom:40px">
            <el-input v-model="building.number" placeholder="输入楼房编号" style="width:500px;margin-right:20px"></el-input>
            <el-input v-model="building.name" placeholder="输入楼房名称" style="width:200px;margin-right:10px"></el-input>
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

    <!-- 选择房屋对话框 -->
    <el-dialog title="选择房屋" :visible.sync="roomVisible" width="60%">
        <el-table :data="roomTableData">
            <el-table-column prop="id" label="房屋id" width="60px"></el-table-column>
            <el-table-column prop="buildingNumber" label="楼房编号"></el-table-column>
            <el-table-column prop="unitNumber" label="单元编号"></el-table-column>
            <el-table-column prop="number" label="房屋编号"></el-table-column>
            <el-table-column prop="height" label="楼层"></el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-circle-check" class="green" @click="confirmRoomChose(scope.$index, scope.row)">选择</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination">
            <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex" :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
        </div>
    </el-dialog>

    <div>
        <el-button v-show="active!=2" style="margin-top: 12px; float:right" @click="next">下一步</el-button>
        <el-button v-show="active==2" style="margin-top: 12px; float:right" @click="addOwnerRoom">完成</el-button>
        <el-button style="margin-top: 12px; float:right;margin-right:10px" @click="pre">上一步</el-button>
    </div>

</div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'addOwnerRoom',
    data() {
        return {
            active: 0,
            labelPosition: 'left',
            formLabelAlign: {
                name: '',
                region: '',
                type: ''
            },
            query: {
                pageIndex: 1,
                pageSize: 7
            },
            building: {
                id: '',
                name: '',
                number: ''
            },
            pageTotal: 0,
            choseVisible: false,
            roomVisible: false,
            buildingTableData: [],
            buildingRowInfo: '',
            roomTableData: [],
            roomRowInfo: '',
            ownerInfo: {}
        };
    },

    methods: {
        next() {
            if(this.active == 1){
                this.getOwnerInfo()
            }
            if (this.active++ > 2) this.active = 0;
        },
        pre() {
            if (--this.active < 0) this.active = 0;
        },
        getOwnerInfo() {
            let url = 'http://localhost:8888/owner/' + this.$route.query.ownerId
            console.log(url)
            axios
                .get(url)
                .then(rs => {
                    if (rs.data.code == 200) {
                        console.log(rs)
                        let result = rs.data.data
                        this.ownerInfo = result.list[0]
                    } else {
                        this.$message.error(`查询业主信息失败`);
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })
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
            if (this.building.number) {
                let url = 'http://localhost:8888/building/number/' + this.building.number
                axios
                    .get(url)
                    .then(rs => {
                        if (rs.data.code == 200) {
                            this.buildingTableData = rs.data.data.list
                            this.building.number = null
                            this.$message.success(`查询成功`);
                        } else {
                            this.$message.error(`楼房不存在`);
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            } else {
                if (this.building.name) {
                    let url = 'http://localhost:8888/building/?name=' + this.building.name
                    axios
                        .get(url)
                        .then(rs => {
                            if (rs.data.code == 200) {
                                this.buildingTableData = rs.data.data.list
                                this.building.name = ''
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
        confirmChose(index, row) {
            this.choseVisible = false
            this.buildingRowInfo = row
            console.log(row)
        },
        roomChose() {
            this.roomVisible = true
            let url = 'http://localhost:8888/room/' + this.buildingRowInfo.number + '?pageNum=' + this.query.pageIndex +
                '&pageSize=' + this.query.pageSize
            axios
                .get(url)
                .then(rs => {
                    if (rs.data.code == 200) {
                        let result = rs.data.data
                        this.roomTableData = result.list
                        this.$message.success(`查看该楼房屋信息`);
                        this.pageTotal = result.total
                    } else {
                        this.$message.error(`查询房屋信息失败`);
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        confirmRoomChose(index, row) {
            this.roomVisible = false
            this.roomRowInfo = row
        },
        addOwnerRoom() {
            let url = 'http://localhost:8888/room/update/' + this.roomRowInfo.id
            axios
                .post(url, {
                    id: this.roomRowInfo.id,
                    number: this.roomRowInfo.number,
                    height: this.roomRowInfo.height,
                    area: this.roomRowInfo.area,
                    price: this.roomRowInfo.price,
                    status: 0,
                    createTime: this.roomRowInfo.createTime,
                    buildingNumber: this.roomRowInfo.buildingNumber,
                    unitNumber: this.roomRowInfo.unitNumber,
                    ownerId: this.ownerInfo.id
                })
                .then(rs => {
                    if (rs.data.code == 200) {
                        console.log(rs)
                        this.$message.success(`增加房产成功`);
                        this.$router.push('/owner')
                    } else {
                        this.$message.error(`增加房产失败`);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        handlePageChange(val) {
            this.query.pageIndex = val;
            this.roomChose()
            // this.getData();
        }
    }
}
</script>
