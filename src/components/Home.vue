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
                <el-aside :width="isCollapse ? '64px' : '200px'">
                    <div class="toggle-button" @click="btnClick">|||</div>
                        <el-menu
                            unique-opened
                            background-color="#333744"
                            :collapse="isCollapse"
                            :collapse-transition= "false"
                            router
                            :default-active="activePath"
                            text-color="#fff"
                            active-text-color="#409eff">
                            <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
                                <template slot="title">
                                    <i :class="iconsObj[item.id]"></i>
                                    <span>{{item.authName}}</span>
                                </template>
                                <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/'+subItem.path)">
                                <template slot="title">
                                    <i class="el-icon-menu"></i>
                                    <span>{{subItem.authName}}</span>
                                </template>
                                </el-menu-item>
                            </el-submenu>
                        </el-menu>
                </el-aside>
                <el-main>
                    <!-- 路由的占位符 -->
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
</template>

<script>
export default {
  name:'Home',
  data(){
   return {
       menuList:[],
       iconsObj:{
           '125':'el-icon-s-check',
           '103':'el-icon-s-grid',
           '101':'el-icon-s-order',
           '102':'el-icon-video-camera',
           '145':'el-icon-star-on'
       },
       isCollapse:false,
    //    被激活的链接地址
       activePath:''
   }
  },
  methods: {
      loginOut(){
          window.sessionStorage.clear()
          this.$router.push('/login')
      },
    //   获取所有菜单
      async getMenuList(){
       const{data:res} = await this.$http.get('menus')
       if(res.meta.status !== 200) return this.$message.console.error(res.meta.msg)
       this.menuList = res.data
       console.log(res)
      },
    //   切换菜单折叠与展开
      btnClick(){
          this.isCollapse =!this.isCollapse
      },
    //   保存链接激活状态
      saveNavState(activePath){
          window.sessionStorage.setItem('activePath',activePath)
          this.activePath = activePath
      }
  },
  created() {
      this.getMenuList()
      this.activePath = window.sessionStorage.getItem("activePath")
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
.el-menu{border: none;}
.toggle-button{background-color: #4a5064;font-size: 12px;line-height: 24px;color: #ffffff;text-align: center;cursor: pointer;letter-spacing: 3px;}
</style>
