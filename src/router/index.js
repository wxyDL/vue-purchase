import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from "@/viwes/Layout";
import Home from "@/viwes/home"
import Login from "@/viwes/Login/Login"
import Goods from "@/viwes/GoodsMange"
import GoodsList from "@/viwes/GoodsMange/List/list"
import GoodsCate from "@/viwes/GoodsMange/CateGory/CateGory"
import OrderMange from "@/viwes/OrderMange";
import OrderList from "@/viwes/OrderMange/list/list";
import OrderCallect from "@/viwes/OrderMange/Callect/Callect";
import OrderAuditing from "@/viwes/OrderMange/Auditing/Auditing";
import AddGoods from "@/viwes/GoodsMange/List/addGoods";


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '/',
                name: 'home',
                component: Home
            },
            {
                path: '/goods',
                name: 'goods',
                component: Goods,
                children: [
                    {
                        path: 'list',
                        name: 'list',
                        component: GoodsList
                    },
                    {
                        path: 'category',
                        name: 'category',
                        component: GoodsCate
                    },
                    {
                        path: 'addgoods',
                        name: 'addgoods',
                        component: AddGoods,
                        meta: {
                            activeMenu: '/goods/list'
                        }
                    }
                ]
            },
            {
                path: '/ordermange',
                name: 'ordermange',
                component: OrderMange,
                children: [
                    {
                        path: 'orderlist',
                        name: 'orderlist',
                        component: OrderList
                    },
                    {
                        path: 'ordercallect',
                        name: 'ordercallect',
                        component: OrderCallect
                    },
                    {
                        path: 'orderauditing',
                        name: 'orderauditing',
                        component: OrderAuditing
                    }
                ]
            }
        ]
    },
    {
        path: '/login',
        component: Login
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router