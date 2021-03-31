<template>
<div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>


    <el-card>
        <el-row>
            <el-col>
                <el-button type="primary" @click="addDialogVisible = true">添加角色</el-button>
            </el-col>
        </el-row>

        <!-- 角色列表 -->
        <el-table :data="rolelist" border stripe>
            <el-table-column type="expand">
              <template v-slot="scope">
                <el-row v-for="(item1,index1) in scope.row.children" :key="index1">
                  <!-- 渲染一级权限 -->
                  <el-col :span="5">
                    <el-tag>{{item1.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 渲染二级三级权限 -->
                  <el-col :span="19">
                    <!-- 二级 -->
                    <el-row v-for="(item2,index2) in item1.children" :key="index2">
                        <el-col :span="6">
                          <el-tag type="success">{{item2.authName}}</el-tag>
                           <i class="el-icon-caret-right"></i>
                        </el-col>
                        <el-col :span="18">
                          <el-tag type="warning" v-for="(item3,index3) in item2.children" :key="index3">
                            {{item3.authName}}
                          </el-tag>
                        </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                {{scope.row}}
              </template>

            </el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="角色名称" prop="roleName"></el-table-column>
            <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
            <el-table-column label="操作">
                <template v-slot="scope">
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)">编辑</el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.id)">删除</el-button>
                    <el-button type="warning" icon="el-icon-setting" size="mini">分配权限</el-button>
                </template>
            </el-table-column>
        </el-table>

    </el-card>

    
    <!-- t添加用户 -->
     <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="50%" @close="addDialogClosed">
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>


     <!-- 修改用户对话框 -->
    <el-dialog
      title="修改用户"
      :visible.sync="editDialogVisible"
      width="50%" @close="editDialogClosed">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px">
        <el-form-item label="角色名称"  prop="roleName">
          <el-input v-model="editForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述"  prop="roleDesc">
          <el-input v-model="editForm.roleDesc"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>


</div>
</template>

<script>
export default {
  name:'Roles',
  data(){
   return {
       addDialogVisible:false,
       editDialogVisible:false,
       rolelist:[],
       addForm:{
           roleName:'',
           roleDesc:''
       },
       addFormRules:{
        roleName:[
            {required: true, message: '角色名称', trigger: 'blur' },
            {min:2,max:10,message:'请输入角色名称',trigger: 'blur' }
        ],
        roleDesc:[
            {min:3,max:15,message:'请输入角色描述',trigger: 'blur' }
        ]
        },
        editForm:{},
        editFormRules:{
        roleName:[
            {required: true, message: '角色名称', trigger: 'blur' },
            {min:2,max:10,message:'请输入角色名称',trigger: 'blur' }
        ],
        roleDesc:[
           {min:3,max:15,message:'请输入角色描述',trigger: 'blur' }
 
        ]
        }

   }
  },
  created() {
      this.getRolesList()
  },
  methods: {
     async getRolesList(){
        const{data:res} =await this.$http.get('roles')
    if(res.meta.status !==200){
        return this.$message.error('获取角色列表失败')
    }

    this.rolelist = res.data

      },
       addDialogClosed(){
      this.$refs.addFormRef.resetFields()
         },
  addUser(){
      // 表单预言证
      this.$refs.addFormRef.validate(async valid =>{
        if(!valid) return

        // 直接发起添加用户的网络请求
         const{data:res} = await this.$http.post('roles',this.addForm)

            if(res.meta.status !==201){
              this.$message.error('添加用户失败')
            }
            this.$message.success('添加用户成功')
            // 隐藏添加用户的对话框
            this.addDialogVisible = false
            this.getRolesList()
      })
  },
  editDialogClosed(){
      this.$refs.editFormRef.resetFields()
  },
  editUserInfo(){
    this.$refs.editFormRef.validate(async valid=>{
            if(!valid) return
            // 发起修改用户的请求
        const {data:res} = await this.$http.put('roles/'+this.editForm.roleId,
        {roleName:this.editForm.roleName,roleDesc:this.editForm.roleDesc})

            if(res.meta.status !==200){
            return this.$message.error("更新用户失败")
            }
            
            this.editDialogVisible =false
            this.getRolesList()
            this.$message.success('更新用户成功')


        })
  },
   // 展示编辑用户
    async showEditDialog(id){
      // console.log(id)
    const{data:res} = await this.$http.get('roles/'+ id)

      if(res.meta.status!==200){
        return this.$message.error('查询用户失败')
      }

      this.editForm = res.data
      console.log(res.data)

      this.editDialogVisible = true
    },
    async removeUserById(id){
        // 弹框询问用户是否删除
        console.log(id)
        const confirmResult = await this.$confirm('此操作会永久删除的啊, 还要继续吗？ 亲', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).catch(err => err)
            // 如果用户确认删除，返回的是一个字符串 confirm
            // 如果用户取消，返回也是字符串 cancel

            if(confirmResult !=='confirm'){
            return this.$message.info('取消了哦 亲')
            }

            // 确认删除 

        const{data:res} = await this.$http.delete('roles/' + id)

            if(res.meta.status !==200){
            return this.$message.error('删除用户失败')
            }
            this.$message.success('删除成功了哟')
            this.getRolesList()

        }
    },
 
}
</script>

<style scoped>
.el-tag{margin:7px}

</style>
