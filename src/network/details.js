import {request} from './request'
export function getDetails(iid){
    return request({
        url:'/detail',
        params:{iid}
    })
}
export function getRecommend() {
    return request({
      url: '/recommend'
    })
  }
export class Goods{
constructor(itemInfo,columns,services){
    this.title = itemInfo.title;
    this.nowPrice = itemInfo.highNowPrice;
    this.oldPrice = itemInfo.oldPrice;
    this.desc = itemInfo.desc;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
}
}
export class ItemParams{
    constructor(info,rule){
        this.image = info.images ? info.images[0] : '';
        this.prodinfo = info.set;
        this.size = rule.tables[0];
        
    }
}
export class Shop{
    constructor(shopInfo){
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods
    }
}