<template>
<div>
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <i class="el-icon-lx-cascades"></i> 添加投诉
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>

    <div style="margin-top:80px;height:100px">
        <div style="margin-top:40px">
            <el-steps :active="active" align-center>
                <el-step title="选择楼房"></el-step>
                <el-step title="选择房屋"></el-step>
                <el-step title="投诉建议"></el-step>
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
                <span style="font-family:'Microsoft YaHei';font-size:15px">投诉建议</span>
            </div>
            <el-divider></el-divider>
            <div style="margin-top:40px;">
                <el-form ref="form" :model="complaint" label-width="70px" label-position="left">
                    <el-form-item label="投诉类型">
                        <el-select v-model="complaint.type" placeholder="必填，请选择投诉类型" style="width:100%">
                            <el-option label="建议" value="0"></el-option>
                            <el-option label="投诉" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="投诉人">
                        <el-input v-model="complaint.complaintPeople" placeholder="必填，请填写投诉人"></el-input>
                    </el-form-item>
                    <el-form-item label="投诉电话">
                        <el-input v-model="complaint.phone" placeholder="必填，请填写投诉电话"></el-input>
                    </el-form-item>
                    <el-form-item label="投诉内容">
                        <el-input type="textarea" v-model="complaint.content" placeholder="必填，请填写投诉内容"></el-input>
                    </el-form-item>
                </el-form>
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
        <el-button v-show="active==2" style="margin-top: 12px; float:right" @click="addComplaint">完成</el-button>
        <el-button style="margin-top: 12px; float:right;margin-right:10px" @click="pre">上一步</el-button>
    </div>

</div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'addComplaint',
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
            complaint: {
                id: '',
                type: '',
                roomId: '',
                complaintPeople: '',
                phone: '',
                content: '',
                createTime: '',
                status: 0
            },
            pageTotal: 0,
            choseVisible: false,
            roomVisible: false,
            buildingTableData: [],
            buildingRowInfo: '',
            roomTableData: [],
            roomRowInfo: ''
        };
    },

    methods: {
        next() {
            if (this.active++ > 2) this.active = 0;
        },
        pre() {
            if (--this.active < 0) this.active = 0;
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
        addComplaint() {
            this.complaint.roomId = this.roomRowInfo.id
            let url = 'http://localhost:8888/complaint/add'
            axios
                .post(url,
                    this.complaint
                )
                .then(rs => {
                    if (rs.data.code == 200) {
                        console.log(rs)
                        this.$message.success(`新增投诉成功`);
                        this.$router.push('/complaintManage')
                    } else {
                        this.$message.error(`新增投诉失败`);
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
