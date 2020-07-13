<template>
  <div>
    <Header></Header>
    <div class="block">
      <el-timeline>
        <el-timeline-item :timestamp="blog.created" placement="top" v-for="blog in blogs">
          <el-card>
            <h4>
              <router-link :to="{name: 'BlogDetail',params:{blogId:blog.id}}">
                {{blog.title}}
              </router-link>
            </h4>
            <p>{{blog.description}}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
<!--      分页-->
      <el-pagination class="mpage"
        background
        layout="prev, pager, next"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        @current-change=page>
      </el-pagination>
    </div>

  </div>
</template>
<script>
  import Header from "../components/Header"
    export default {
        name: "Blog",
        components: {Header},
        data(){
          return{
            blogs:{},
            //默认当前页是第一页,总数为0，一页有5条数据
            currentPage:1,
            total:0,
            pageSize:5
          }
        },
        methods:{
          page(currentPage){
            const _this=this
            _this.$axios.get("/list?currentPage="+currentPage).then(res=>{
              console.log(res)
              //data下的records才是blog里面的信息
              _this.blogs=res.data.data.records
              //当前页
              _this.currentPage=res.data.data.current
              //总数据数
              _this.total=res.data.data.total
              _this.pageSize=res.data.data.size
            })
          }
        },
      created() {
          this.page(1)
      }
    }
</script>
<style scoped>
  .mpage{
    margin: 0 auto;
    text-align: center;
  }
</style>
