import base from './base'
import axios from '@/request/request'

const api = {
    //获取首页内容的接口
    getHomeCount () {
        return axios.get(base.homeDataCount)
    },
    //获取首页折线图接口
    getHomeFormat () {
        return axios.get(base.homeDataFormat)
    },
    //获取首页今日订单的接口
    getHomeOrderInfo () {
        return axios.get(base.homeDataOrderInfo)
    },
//    获取产品列表数据
    getGoodsList (params) {
        return axios.get(base.goodsList, {params})
    },
//    产品查询接口
    goodsSearch (params) {
        return axios.get(base.goodsSearch, {params})
    },
//    删除商品
    deleteGoods (params) {
        return axios.get(base.deleteGoods, {params})
    },
//    商品类目数据
    getGoodsCategory (params) {
        return axios.get(base.goodsCategory, {params})
    },
//    商品添加
    addGoods (params) {
        return axios.get(base.addGoods, {params})
    },
//    批量删除商品
    batchDelete (params) {
        return axios.get(base.batchDelete,{params})
    }
}

export default api