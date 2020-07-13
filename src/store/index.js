import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

 export default new Vuex.Store({
   state:{
     token: '',
     userInfo: JSON.parse(sessionStorage.getItem("userInfo"))
   },
   mutations:{
      //set
     //对token进行赋值
     SET_TOKEN:(state,token)=>{
       state.token=token
       //放入浏览器的localStorage里面，浏览器关闭也会存在
       localStorage.setItem("token",token)
     },
     SET_USERINFO:(state,userInfo)=>{
       state.userInfo=userInfo
       sessionStorage.setItem("userInfo",JSON.stringify(userInfo))
     },
     //调用该方法的时候将token和userInfo都进行删除掉
     REMOVE_INFO:(state)=>{
        state.token=''
        state.userInfo={}
        localStorage.setItem("token",'')
        sessionStorage.setItem("userInfo",JSON.stringify(''))
     }
   },
   getters: {
     //get方法
     getUser:state => {
       return state.userInfo
     }
   },
   action: {

   },
   modules: {

   }
 })
