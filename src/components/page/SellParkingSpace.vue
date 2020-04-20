<template>
<div>
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <i class="el-icon-lx-cascades"></i> 车位出租
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>

    <div style="margin-top:80px;height:100px">
        <div style="margin-top:20px">
            <el-steps :active="active" align-center>
                <el-step title="选择车位"></el-step>
                <el-step title="业主信息"></el-step>
                <el-step title="车辆信息"></el-step>
                <el-step title="收费信息"></el-step>
            </el-steps>
        </div>
    </div>
    <div class="container" v-show="active==0">
        <div class="handle-box">
            <span style="font-family:'Microsoft YaHei';font-size:15px">车位信息</span>
            <el-button type="primary" icon="el-icon-search" style="float:right;margin-bottom:10px;" @click="handleChose">选择车位</el-button>
        </div>
        <el-divider></el-divider>
        <div style="margin-top:20px;">
            <el-row style="margin-bottom:20px">
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <span style="font-family:'Microsoft YaHei';font-size:13px;color:green">车位id:&nbsp;&nbsp;&nbsp;{{parkingSpaceRowInfo.id}}</span>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple-light">
                        <span style="font-family:'Microsoft YaHei';font-size:13px;color:green">车位编号:&nbsp;&nbsp;&nbsp;{{parkingSpaceRowInfo.number}}</span>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <span style="font-family:'Microsoft YaHei';font-size:13px;color:green">停车场:&nbsp;&nbsp;&nbsp;{{parkingSpaceRowInfo.parkAreaNumber}}</span>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div style="margin-top:20px;">
            <el-row style="margin-bottom:20px">
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <span style="font-family:'Microsoft YaHei';font-size:13px;color:green">车位状态:&nbsp;&nbsp;&nbsp;{{parkingSpaceRowInfo.status=== 0 ?'空闲':parkingSpaceRowInfo.status===1?'出租': parkingSpaceRowInfo.status?'售卖':''}}</span>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple-light">
                        <span style="font-family:'Microsoft YaHei';font-size:13px;color:green">面积:&nbsp;&nbsp;&nbsp;{{parkingSpaceRowInfo.area ?parkingSpaceRowInfo.area+ '平方米':''}}</span>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>

    <div class="container" v-show="active==1">
        <div class="handle-box">
            <span style="font-family:'Microsoft YaHei';font-size:15px">业主信息</span>
        </div>
        <el-divider></el-divider>
        <div style="margin-top:20px;">
            <el-row style="margin-bottom:20px">
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
            <el-row style="margin-bottom:20px">
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

            <el-row style="margin-bottom:20px">
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

    <div class="container" v-show="active==2">
        <div class="handle-box">
            <span style="font-family:'Microsoft YaHei';font-size:15px">车辆信息</span>
        </div>
        <el-divider></el-divider>
        <el-form :label-position="labelPosition" label-width="80px" :model="carInfo">
            <el-form-item label="车牌号">
                <el-input v-model="carInfo.number" placeholder="必填，请填写车牌号"></el-input>
            </el-form-item>
            <el-form-item label="车品牌">
                <el-input v-model="carInfo.band" placeholder="必填，请填写车品牌"></el-input>
            </el-form-item>
            <el-form-item label="车类型">
                <el-select v-model="carInfo.type" placeholder="必填，请选择车类型" style="width:100%">
                    <el-option label="家用小汽车" value="0"></el-option>
                    <el-option label="客车" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="颜色">
                <el-input v-model="carInfo.color" placeholder="必填，请填写车颜色"></el-input>
            </el-form-item>
        </el-form>
    </div>

    <div class="container" v-show="active==3">
        <div class="handle-box">
            <span style="font-family:'Microsoft YaHei';font-size:15px">收费信息</span>
        </div>
        <el-divider></el-divider>
        <el-form :label-position="labelPosition" label-width="80px" :model="costInfo">
            <el-form-item label="应收费用">
                <el-input v-model="costInfo.require" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="实收费用">
                <el-input v-model="costInfo.real" placeholder="必填，请填写车颜色"></el-input>
            </el-form-item>
        </el-form>
    </div>

    <!-- 选择车位弹出框 -->
    <el-dialog title="选择车位" :visible.sync="choseVisible" width="60%">
        <div style="margin-bottom:20px">
            <el-button type="primary" icon="el-icon-search" style="float:right" @click="handleParkingSpaceSearch">查询</el-button>
            <el-input v-model="parkingSpace.number" placeholder="输入车位编号" style="width:150px;float:right"></el-input>
        </div>
        <el-table :data="parkingSpaceTableData">
            <el-table-column prop="id" label="车位id" width="60px"></el-table-column>
            <el-table-column prop="number" label="车位编号"></el-table-column>
            <el-table-column prop="parkAreaNumber" label="停车场编号" width="150px"></el-table-column>
            <el-table-column prop="status" label="车位状态">
                <template slot-scope="scope">
                    <span>{{scope.row.status===0?'空闲':''}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="area" label="面积"></el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-circle-check" class="green" @click="confirmChose(scope.$index, scope.row)">选择</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-dialog>

    <div>
        <el-button v-show="active!=3" style="margin-top: 12px; float:right" @click="next">下一步</el-button>
        <el-button v-show="active==3" style="margin-top: 12px; float:right" @click="sellParkingSpace">售卖</el-button>
        <el-button style="margin-top: 12px; float:right;margin-right:10px" @click="pre">上一步</el-button>
    </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'sellParkingSpace',
    data() {
        return {
            active: 0,
            labelPosition: 'left',
            carInfo: {
                id: '',
                number: '',
                band: '',
                type: '',
                color: '',
                ownerId: ''
            },
            costInfo: {
                require: '70000',
                real: '70000',
            },
            parkingSpace: {
                number: ''
            },
            choseVisible: false,
            parkingSpaceTableData: [],
            parkingSpaceRowInfo: '',
            ownerInfo: {}
        };
    },
    created() {
        this.getOwnerInfo()
    },
    methods: {
        handleChange(index) {
            console.log(index)
            if (index == 0) {
                this.costInfo.require = 80.0
                this.costInfo.real = 80.0
            } else if (index == 1) {
                this.costInfo.require = 480.0
                this.costInfo.real = 480.0
            } else {
                this.costInfo.require = 960.0
                this.costInfo.real = 960.0
            }
        },
        next() {
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
            let url = 'http://localhost:8888/parkSpace/status/0'
            axios
                .get(url)
                .then(rs => {
                    if (rs.data.code == 200) {
                        this.parkingSpaceTableData = rs.data.data.list
                        this.$message.success(`查看车位房信息`);
                    } else {
                        this.$message.error(`查询车位信息失败`);
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        handleParkingSpaceSearch() {
            if (this.parkingSpace.number) {
                let url = 'http://localhost:8888/parkSpace/number/' + this.parkingSpace.number
                axios
                    .get(url)
                    .then(rs => {
                        if (rs.data.code == 200) {
                            this.parkingSpaceTableData = rs.data.data.list
                            this.parkingSpace.number = null
                            this.$message.success(`查询成功`);
                        } else {
                            this.$message.error(`车位不存在`);
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            } else {
                this.$message.error('请输入查询条件')
            }
        },
        confirmChose(index, row) {
            this.choseVisible = false
            this.parkingSpaceRowInfo = row
            console.log(row)
        },
        addCarInfo() {
            this.carInfo.ownerId = this.ownerInfo.id
            let url = 'http://localhost:8888/car/add'
            axios
                .post(url, this.carInfo)
                .then(rs => {
                    if (rs.data.code == 200) {
                        console.log(rs)
                    } else {
                        this.$message.error(`增加车辆失败`);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        updateParkingSpace() {
            this.parkingSpaceRowInfo.status = 2
            this.parkingSpaceRowInfo.ownerId = this.ownerInfo.id
            this.parkingSpaceRowInfo.carNumber = this.carInfo.number
            let url = 'http://localhost:8888/parkSpace/update/' + this.parkingSpaceRowInfo.id
            axios
                .post(url,this.parkingSpaceRowInfo)
                .then(rs => {
                    if (rs.data.code == 200) {
                        console.log(rs)
                        this.$message.success(`售卖成功`);
                        this.$router.push('/owner')
                    } else {
                        this.$message.error(`售卖失败`);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        sellParkingSpace() {
            this.addCarInfo()
            this.updateParkingSpace()
        },
    }
}
</script>
