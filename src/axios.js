//前置后置拦截
import axios from 'axios'
import Element from 'element-ui'
import router from './router'
import store from './store'

axios.defaults.baseURL="http://localhost:8080"
//前置拦截
axios.interceptors.request.use(config=>{
  return config
})
//后置拦截
axios.interceptors.response.use(response=>{
  let res=response.data;
   console.log("===========")
   console.log(res)
   console.log("===========")
  if(res.code==200){
    return response
  }else{
    Element.Message.error("错误",{duration :2*1000});
    //阻止它进入后面的逻辑
    return Promise.reject(response.data.msg)
  }
},
  //捕捉错误
  error => {
  //如果error里面的data不为空
    if(error.response.data){
      error.message=error.response.data.msg
    }
    if(error.response.status==401){
        store.commit("REMOVE_INFO")
      //没有权限，需要进行登录
        router.push("/login")
    }else{
      Element.Message.error(error.message,{duration :2*1000});
      return Promise.reject(response.data.msg)
    }
  }
)
