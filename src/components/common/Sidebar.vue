<template>
<div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157" text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
        <template v-for="item in items">
            <template v-if="item.subs">
                <el-submenu :index="item.index" :key="item.index">
                    <template slot="title">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </template>
                    <template v-for="subItem in item.subs">
                        <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                            <template slot="title">{{ subItem.title }}</template>
                            <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">{{ threeItem.title }}</el-menu-item>
                        </el-submenu>
                        <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
                    </template>
                </el-submenu>
            </template>
            <template v-else>
                <el-menu-item :index="item.index" :key="item.index">
                    <i :class="item.icon"></i>
                    <span slot="title">{{ item.title }}</span>
                </el-menu-item>
            </template>
        </template>
    </el-menu>
</div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            items: [{
                    icon: 'el-icon-lx-home',
                    index: 'dashboard',
                    title: '系统首页'
                },
                {
                    icon: 'el-icon-lx-calendar',
                    index: '1',
                    title: '小区管理',
                    subs: [{
                        index: 'community',
                        title: '我的小区'
                    }, ]
                },
                {
                    icon: 'el-icon-menu',
                    index: '2',
                    title: '资产管理',
                    subs: [{
                            index: 'building',
                            title: '楼房信息'
                        },
                        {
                            index: 'unit',
                            title: '单元信息'
                        },
                        {
                            index: 'room',
                            title: '房屋管理'
                        }
                    ]
                },
                {
                    icon: 'el-icon-user-solid',
                    index: '3',
                    title: '业主管理',
                    subs: [{
                            index: 'owner',
                            title: '业主信息'
                        },
                        {
                            index: 'member',
                            title: '业主成员'
                        }
                    ]
                },
                {
                    icon: 'el-icon-s-order',
                    index: '6',
                    title: '费用管理',
                    subs: [{
                            index: 'feeConfig',
                            title: '费用项设置'
                        },
                        {
                            index: 'roomCreateFee',
                            title: '房屋收费'
                        }
                       
                    ]
                },
                {
                    icon: 'el-icon-bicycle',
                    index: '4',
                    title: '停车服务',
                    subs: [{
                            index: 'parkArea',
                            title: '停车场管理'
                        },
                        {
                            index: 'parkSpace',
                            title: '车位信息'
                        },
                        {
                            index: 'remainingParkingSpace',
                            title: '剩余车位'
                        }
                    ]
                },
                {
                    icon: 'el-icon-present',
                    index: '5',
                    title: '小区服务',
                    subs: [
                        {
                            index: 'noticeManage',
                            title: '发布公告'
                        },
                        {
                            index: 'complaintManage',
                            title: '投诉建议'
                        }
                    ]
                },
            
                {
                    icon: 'el-icon-pie-chart',
                    index: 'charts',
                    title: 'schart图表'
                },
                {
                    icon: 'el-icon-lx-warn',
                    index: '7',
                    title: '错误处理',
                    subs: [{
                            index: 'permission',
                            title: '权限测试'
                        },
                        {
                            index: '404',
                            title: '404页面'
                        }
                    ]
                }
             
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
    width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}

.sidebar>ul {
    height: 100%;
}
</style>
