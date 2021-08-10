<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <el-table :data="rightsList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="权限名称" prop="authName"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="权限等级" prop="level">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === 0">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.level === 1"
              >二级</el-tag
            >
            <el-tag type="warning" v-else>三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { nanoid } from 'nanoid'
export default {
  name: 'Rights',
  data() {
    return {
      //权限列表
      rightsList: [
        {
          id: nanoid(),
          authName: '商品管理',
          level: 0,
          pid: 0,
          path: 'goods',
          children: [
            {
              id: nanoid(),
              authName: '商品列表',
              path: null,
              pid: 101,
              children: [
                {
                  id: nanoid(),
                  authName: '添加商品',
                  path: null,
                  pid: '104,101'
                }
              ]
            }
          ]
        },
        {
          id: nanoid(),
          authName: '订单管理',
          level: 0,
          pid: 0,
          path: 'orders'
        },
        {
          id: nanoid(),
          authName: '权限管理',
          level: 0,
          pid: 0,
          path: 'rights'
        },
        { id: nanoid(), authName: '商品列表', level: 1, pid: 0, path: 'goods' },
        { id: nanoid(), authName: '添加商品', level: 2, pid: 0, path: 'goods' },
        {
          id: nanoid(),
          authName: '订单列表',
          level: 1,
          pid: 0,
          path: 'orders'
        },
        {
          id: nanoid(),
          authName: '添加订单',
          level: 2,
          pid: 0,
          path: 'orders'
        },
        { id: nanoid(), authName: '用户列表', level: 0, pid: 1, path: 'users' },
        { id: nanoid(), authName: '角色列表', level: 0, pid: 1, path: 'roles' },
        { id: nanoid(), authName: '权限列表', level: 0, pid: 1, path: 'rights' }
      ]
    }
  },
  created() {
    //获取所有的权限
    this.getRightsList()
  },
  methods: {
    //获取权限列表
    async getRightsList() {
      const { data: res } = await this.$http.get('rights/list')
      if (rea.meta.status !== 200) {
        return this.message.error('获取权限列表失败！')
      }
      this.rightsList = res.data
    }
  }
}
</script>

<style lang="less" scoped></style>
