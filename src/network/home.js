import {request} from './request'
export function getMultidata(){
    //调用request方法返回一个promise对象，再将返回的promise对象作为getMultidate结果返回给调用该函数的对象
    return request({
        url:'/home/multidata'
    })
}
export function getGoodsData(type,page){
    return request({
        url:'/home/data',
        params:{type,page}
    })
}