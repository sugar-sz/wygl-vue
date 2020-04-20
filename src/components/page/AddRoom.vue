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
                <el-step title="选择单元"></el-step>
                <el-step title="添加房屋"></el-step>
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
                <span style="font-family:'Microsoft YaHei';font-size:15px">单元信息</span>
                <el-button type="primary" icon="el-icon-search" style="float:right;margin-bottom:10px;" @click="unitChose">选择单元</el-button>
            </div>

            <div style="margin-top:60px;">
                <el-row style="margin-bottom:40px">
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <span style="font-family:'Microsoft YaHei';font-size:13px;color:green">单元id:&nbsp;&nbsp;&nbsp;{{unitRowInfo.id}}</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple-light">
                            <span style="font-family:'Microsoft YaHei';font-size:13px;color:green">单元编号:&nbsp;&nbsp;&nbsp;{{unitRowInfo.number}}</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <span style="font-family:'Microsoft YaHei';font-size:13px;color:green">总层数:&nbsp;&nbsp;&nbsp;{{unitRowInfo.height}}</span>
                        </div>
                    </el-col>
                </el-row>
            </div>

            <div style="margin-top:60px;">
                <el-row style="margin-bottom:40px">
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <span style="font-family:'Microsoft YaHei';font-size:13px;color:green">电梯:&nbsp;&nbsp;&nbsp;{{unitRowInfo.elevator}}</span>
                        </div>
                    </el-col>

                    <el-col :span="16">
                        <div class="grid-content bg-purple">
                            <span style="font-family:'Microsoft YaHei';font-size:13px;color:green">创建时间:&nbsp;&nbsp;&nbsp;{{unitRowInfo.createTime}}</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>

        <div v-show="active==2">
            <div class="handle-box">
                <span style="font-family:'Microsoft YaHei';font-size:15px;font-weight:bold">添加房屋</span>
            </div>
            <hr>
            <div style="margin-top:20px;">
                <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                    <el-form-item label="房屋编号">
                        <el-input v-model="room.number" placeholder="必填，请填写房屋编号"></el-input>
                    </el-form-item>
                    <el-form-item label="房屋楼层">
                        <el-input v-model="room.height" placeholder="必填，请填写房屋楼层"></el-input>
                    </el-form-item>
                    <el-form-item label="建筑面积(平方)">
                        <el-input v-model="room.area" placeholder="必填，请填写建筑面积! 平方"></el-input>
                    </el-form-item>
                    <el-form-item label="房屋单价">
                        <el-input v-model="room.price" placeholder="请填写房屋单价(元)"></el-input>
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

    <!-- 选择单元对话框 -->
    <el-dialog title="选择楼房" :visible.sync="unitVisible" width="60%">
        <el-table :data="unitTableData">
            <el-table-column prop="id" label="单元id" width="60px"></el-table-column>
            <el-table-column prop="number" label="单元编号"></el-table-column>
            <el-table-column prop="height" label="总层数"></el-table-column>
            <el-table-column prop="elevator" label="电梯"></el-table-column>
            <el-table-column prop="createTime" label="创建时间"></el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-circle-check" class="green" @click="confirmUnitChose(scope.$index, scope.row)">选择</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-dialog>

    <div>
        <el-button v-show="active!=2" style="margin-top: 12px; float:right" @click="next">下一步</el-button>
        <el-button v-show="active==2" style="margin-top: 12px; float:right" @click="insertRoom">完成</el-button>
        <el-button style="margin-top: 12px; float:right;margin-right:10px" @click="pre">上一步</el-button>
    </div>

</div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'addRoom',
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
            unit: {
                id: '',
                number: '',
                height: '',
                elevator: ''
            },
            choseVisible: false,
            unitVisible: false,
            buildingTableData: [],
            buildingRowInfo: '',
            unitTableData: [],
            unitRowInfo: '',
            room: {
                number: '',
                height: '',
                area: '',
                price: '',
                status: 1
                // buildingNumber: this.buildingRowInfo.number,
                // unitNumber: this.unitRowInfo.number
            },
        };
    },

    methods: {
        created() {
            this.building.id = null
            this.building.name = null
        },
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

        unitChose() {
            this.unitVisible = true
            let url = 'http://localhost:8888/unit/' + this.buildingRowInfo.number
            axios
                .get(url)
                .then(rs => {
                    if (rs.data.code == 200) {
                        this.unitTableData = rs.data.data.list
                        this.$message.success(`查看该楼单元信息`);
                    } else {
                        this.$message.error(`查询单元信息失败`);
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        confirmUnitChose(index, row) {
            this.unitVisible = false
            this.unitRowInfo = row
        },
        insertRoom() {
            let url = 'http://localhost:8888/room/add/'
            axios
                .post(url, {
                    number: this.room.number,
                    height: this.room.height,
                    area: this.room.area,
                    price: this.room.price,
                    status: 0,
                    buildingNumber: this.buildingRowInfo.number,
                    unitNumber: this.unitRowInfo.number
                })
                .then(rs => {
                    if (rs.data.code == 200) {
                        console.log(rs)
                        this.$message.success(`新增房屋成功`);
                        this.$router.push('/room')
                    }else{
                        this.$message.error(`新增房屋失败`);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
}
</script>
