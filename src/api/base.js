const base = {
    host: 'http://localhost:9898',
    // 首页数据内容接口
    homeDataCount: '/api/home/dataCount',
    // 首页折线图数据接口
    homeDataFormat: '/api/home/format',
    //今日订单的数据接口
    homeDataOrderInfo: '/api/home/orderinfo',
//    产品列表
    goodsList: '/api/goods/projectList',
//    产品查询
    goodsSearch: '/api/goods/search',
//    删除商品
    deleteGoods: '/api/goods/deleteItemById',
//    商品的类目数据接口
    goodsCategory: '/api/goods/itemCategory/selectItemCategoryByParentId',
//    商品添加接口
    addGoods: '/api/goods/item/insertTbItem'

}

//导出单个文件
export const host='http://localhost:9898'

export const upload = '/api/upload'

export default base