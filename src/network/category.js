import {request} from './request'
//请求分类菜单数据
export function getCategory(){
    return request({
        url:'/category'
    })
}
export function getSubCategory(maitKey){
    return request({
        url:'/subcategory',
        params:{
            maitKey
        }
    })
}
export function getCategoryDetail(miniWallkey, type) {
    return axios({
      url: '/subcategory/detail',
      params: {
        miniWallkey,
        type
      }
    })
  }