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

/**
 * 商品列表：获取分页 {total:'',arr:[{},{},{}],pagesize:8,}
 * 参数：page 页码
 */
router.get("/goods/projectList", (req, res) => {
    const page = req.query.page || 1;
    const sqlLen = "select * from project where id";
    sqlFn(sqlLen, null, (data) => {
        let len = data.length;
        const sql =
            "select * from project order by id desc limit 10 offset " + (page - 1) * 10;
        sqlFn(sql, null, (result) => {
            if (result.length > 0) {
                res.send({
                    status: 200,
                    data: result,
                    pageSize: 10,
                    total: len,
                });
            } else {
                res.send({
                    status: 500,
                    msg: "暂无数据",
                });
            }
        });
    });
});

/**
 * 商品查询接口 search
 * 参数：search
 */
router.get("/goods/search", (req, res) => {
    var search = req.query.search;
    const sql =
        "select * from project where concat(`title`,`sellPoint`,`descs`) like '%" +
        search +
        "%'";
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result,
            });
        } else {
            res.send({
                status: 500,
                msg: "暂无数据",
            });
        }
    });
});

/**
 * 商品删除接口 id
 */
router.get("/goods/deleteItemById", (req, res) => {
    var id = req.query.id;
    const sql = "delete from project where id=?";
    const arr = [id];
    sqlFn(sql, arr, (result) => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "删除成功",
            });
        } else {
            res.send({
                status: 500,
                msg: "删除失败",
            });
        }
    });
});

module.exports = router