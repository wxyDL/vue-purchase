const express = require('express')
const router = express.Router()


//导入数据库 sqlFn('sql',[],res=>{})
const sqlFn = require("./mysql");
//路由接口地址
//导入mockjs
const Mock = require("mockjs");
//数据
const data = require("./data/format.json");

/*
    首页-销量额等数据统计
*/
router.get("/home/dataCount", (req, res) => {
    res.send(
        Mock.mock({
            info: "数据统计",
            success: true,
            data: {
                list: {
                    id: 1,
                    "viewsTotal|10000-100000": 1,
                    "views|1-30000": 1,
                    viewsFun: function () {
                        if (this.viewsTotal < this.views) {
                            [this.viewsTotal, this.views] = [this.views, this.viewsTotal];
                        }
                    },
                    "saleTotal|1000-100000": 1,
                    "sale|1-100000": 1,
                    viewsFun2: function () {
                        if (this.saleTotal < this.sale) {
                            [this.saleTotal, this.sale] = [this.sale, this.saleTotal];
                        }
                    },
                    "payTotal|1000-999999": 1,
                    "pay|1-9999": 1,
                    viewsFun3: function () {
                        if (this.payTotal < this.pay) {
                            [this.payTotal, this.pay] = [this.pay, this.payTotal];
                        }
                    },
                    "collectTotal|99-99999": 1,
                    "collect|0-9999": 1,
                    viewsFun4: function () {
                        if (this.collectTotal < this.collect) {
                            [this.collectTotal, this.collect] = [
                                this.collect,
                                this.collectTotal,
                            ];
                        }
                    },
                },
            },
        })
    );
});

/*
   首页折线图数据统计 月销量、月销售额
*/
router.get("/home/format", (req, res) => {
    res.send(data);
});

/*
   首页 -今日 -订单统计
*/
router.get("/home/orderinfo", (req, res) => {
    res.send(
        Mock.mock({
            info: "订单统计信息",
            success: true,
            list: {
                "orderCount|1-100000": 1,
                "curOrderCount|1-1000": 1,
                count: function () {
                    if (this.curOrderCount > this.orderCount) {
                        [this.orderCount, this.curOrderCount] = [
                            this.curOrderCount,
                            this.orderCount,
                        ];
                    }
                },
                "money|1-200000": 1,
                "curMoney|1-1000": 1,
                moneyfun: function () {
                    if (this.curMoney > this.money) {
                        [this.money, this.curMoney] = [this.curMoney, this.money];
                    }
                },
                "collect|1-99999": 1,
                "curCollect|1-999": 1,
                collectfun: function () {
                    if (this.curCollect > this.collect) {
                        [this.collect, this.curCollect] = [this.curCollect, this.collect];
                    }
                },
                department: "",
                branchSchool: "",
            },
        })
    );
});


module.exports = router