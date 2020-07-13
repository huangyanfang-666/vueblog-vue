<template>
<!--  博客详情页-->
  <div>
    <Header></Header>
    <div class="mbeg">
      <h2>{{blog.title}}</h2>
      <el-link icon="el-icon-edit">
        <router-link :to="{name:'BlogEdit',params:{blogId:blog.id}}">
          编辑
        </router-link>
      </el-link>
      <el-divider></el-divider>
      <div class="markdown-body" v-html="blog.content"></div>
    </div>
  </div>
</template>
<script>
    import Header from "../components/Header";
    import "github-markdown-css"
    export default {
        name: "BlogDetail",
        components: {Header},
      data(){
          return{
            blog:{
              id:"",
              title:"",
              content:''
            },
            ownBlog:false
          }
      },
      created() {
        const blogId=this.$route.params.blogId
        const _this=this
        if(blogId){
          this.$axios.get('/blog/'+blogId).then(res=>{
            const blog=res.data.data
            _this.blog.id=blog.id
            _this.blog.title=blog.title
            //引入mardown进行渲染
            var MardownIt=require("markdown-it")
            var md=new MardownIt()
            var result=md.render(blog.content)
            _this.blog.content=result

          //  当博客的userID等于当前登录的id时，才会展示
            _this.ownBlog=(blog.userId==_this.$store.getters.getUser.id)
          })
        }
      }
    }
</script>
<style scoped>
  .mbeg{
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    width: 100%;
    min-height:700px ;
  }
</style>
