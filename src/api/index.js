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
    }
}

export default api