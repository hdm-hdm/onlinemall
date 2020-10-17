export function debounce(func,delay){
    //创建一个时钟timer
    let timer=null;
    return function(...args){
      //判断时钟是否为空，不为空清空时钟
     if(timer) clearTimeout(timer);
     //异步操作
    timer = setTimeout(()=>{
      //apply()执行func函数，this--改变指针指向
      func.apply(this,args)
    },delay)}

  }
  export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
      }
    }
    return fmt;
  };
  
  function padLeftZero (str) {
    return ('00' + str).substr(str.length);
  };
  
  