<template>
        <el-container class="home-container">
            <el-header>
                <div>
                    <img src="~assets/logo.jpg" alt="" class="logos">
                    <span class="title">IUmanyueLzn</span>
                </div>
                <el-button type='info' @click="loginOut" class="logout">退出</el-button>
            </el-header>
            <el-container>
                <el-aside width="200px">Aside</el-aside>
                <el-main>Main</el-main>
            </el-container>
        </el-container>
</template>

<script>
export default {
  name:'Home',
  data(){
   return {

   }
  },
  methods: {
      loginOut(){
          window.sessionStorage.clear()
          this.$router.push('/login')
      }
  },
}
</script>

<style scoped>
.home-container{height: 100%;}
.el-header{background-color: #373d41;display: flex;justify-content: space-between;align-items:center;}
.el-aside{background-color: #333744;}
.el-main{background-color: #eee;}
.logos{width: 60px;float: left;}
.title{padding:0 10px;font-size: 20px;color: #ffffff;display: block;float: left;height: 60px;line-height: 60px;}
.logout{}
</style>
