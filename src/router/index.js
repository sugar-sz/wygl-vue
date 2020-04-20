import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import( /* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: {
                title: '自述文件'
            },
            children: [{
                    path: '/dashboard',
                    component: () => import('../components/page/Dashboard.vue'),
                    meta: {
                        title: '系统首页'
                    }
                },
                {
                    path: '/community',
                    component: () => import('../components/page/Community.vue'),
                    meta: {
                        title: '我的小区'
                    }
                },
                {
                    path: '/owner',
                    component: () => import('../components/page/Owner.vue'),
                    meta: {
                        title: '业主管理'
                    }
                },
                {
                    path: '/addOwnerRoom',
                    component: () => import('../components/page/AddOwnerRoom.vue'),
                    meta: {
                        title: '添加业主房产'
                    }
                },
                {
                    path: '/deleteOwnerRoom',
                    component: () => import('../components/page/DeleteOwnerRoom.vue'),
                    meta: {
                        title: '删除业主房屋'
                    }
                },
                {
                    path: '/hireParkingSpace',
                    component: () => import('../components/page/HireParkingSpace.vue'),
                    meta: {
                        title: '车位出租'
                    }
                },
                {
                    path: '/sellParkingSpace',
                    component: () => import('../components/page/SellParkingSpace.vue'),
                    meta: {
                        title: '车位售卖'
                    }
                },
                {
                    path: '/ownerRepair',
                    component: () => import('../components/page/OwnerRepair.vue'),
                    meta: {
                        title: '业主报修'
                    }
                },
                {
                    path: '/member',
                    component: () => import('../components/page/Member.vue'),
                    meta: {
                        title: '业主成员'
                    }
                },
                {
                    path: '/building',
                    component: () => import('../components/page/Building.vue'),
                    meta: {
                        title: '楼房管理'
                    }
                },
                {
                    path: '/unit',
                    component: () => import('../components/page/Unit.vue'),
                    meta: {
                        title: '单元信息'
                    }
                },
                {
                    path: '/room',
                    component: () => import('../components/page/Room.vue'),
                    meta: {
                        title: '房屋管理'
                    }
                },
                {
                    path: '/addRoom',
                    component: () => import('../components/page/AddRoom.vue'),
                    meta: {
                        title: '添加房屋'
                    }
                },
                {
                    path: '/parkArea',
                    component: () => import('../components/page/ParkArea.vue'),
                    meta: {
                        title: '停车场管理'
                    }
                },
                {
                    path: '/parkSpace',
                    component: () => import('../components/page/ParkSpace.vue'),
                    meta: {
                        title: '车位信息'
                    }
                },
                {
                    path: '/remainingParkingSpace',
                    component: () => import('../components/page/RemainingParkingSpace.vue'),
                    meta: {
                        title: '剩余车位'
                    }
                },
                {
                    path: '/noticeManage',
                    component: () => import('../components/page/NoticeManage.vue'),
                    meta: {
                        title: '发布公告'
                    }
                },
                {
                    path: '/noticeDetail',
                    component: () => import('../components/page/NoticeDetail.vue'),
                    meta: {
                        title: '公告详情'
                    }
                },
                {
                    path: '/complaintManage',
                    component: () => import('../components/page/ComplaintManage.vue'),
                    meta: {
                        title: '发布公告'
                    }
                },
                {
                    path: '/addComplaint',
                    component: () => import('../components/page/AddComplaint.vue'),
                    meta: {
                        title: '新增投诉'
                    }
                },
                {
                    path: '/feeConfig',
                    component: () => import('../components/page/FeeConfig.vue'),
                    meta: {
                        title: '费用项设置'
                    }
                },
                {
                    path: '/roomCreateFee',
                    component: () => import('../components/page/RoomCreateFee.vue'),
                    meta: {
                        title: '房屋收费'
                    }
                },
                {
                    path: '/listRoomFee',
                    component: () => import('../components/page/ListRoomFee.vue'),
                    meta: {
                        title: '查看收费信息'
                    }
                },
                {
                    path: '/payFee',
                    component: () => import('../components/page/PayFee.vue'),
                    meta: {
                        title: '收费清单'
                    }
                },  
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import( /* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                    meta: {
                        title: '富文本编辑器'
                    }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import( /* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: {
                        title: 'markdown编辑器'
                    }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import( /* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: {
                        title: '文件上传'
                    }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import( /* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: {
                        title: 'schart图表'
                    }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import( /* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: {
                        title: '权限测试',
                        permission: true
                    }
                },
                {
                    path: '/404',
                    component: () => import( /* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: {
                        title: '404'
                    }
                },
                {
                    path: '/403',
                    component: () => import( /* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: {
                        title: '403'
                    }
                }
            ]
        },
        {
            path: '/login',
            component: () => import('../components/page/Login.vue'),
            meta: {
                title: '登录'
            }
        },
        {
            path: '/register',
            component: () => import('../components/page/Register.vue'),
            meta: {
                title: '注册'
            }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});