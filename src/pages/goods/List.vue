<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getGoodsList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="goAddPage">添加商品</el-button>
        </el-col>
      </el-row>
    </el-card>

    <!-- table表格区域 -->
    <el-table :data="goodsList" border stripe>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="商品名称" prop="goods_name"></el-table-column>
      <el-table-column
        label="商品价格(元)"
        prop="goods_price"
        width="120px"
      ></el-table-column>
      <el-table-column
        label="商品重量"
        prop="goods_weight"
        width="100px"
      ></el-table-column>
      <el-table-column label="创建时间" prop="add_time" width="150px">
        <template slot-scope="scope">
          {{ scope.row.add_time | dateFormat }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150px">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="removeById(scope.row.goods_id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页区域 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      background
    >
    </el-pagination>
  </div>
</template>

<script>
import { nanoid } from 'nanoid'
export default {
  name: 'List',
  data() {
    return {
      // 查询参数对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      // 商品列表
      goodsList: [
        {
          goods_id: nanoid(),
          goods_name: '大疆无人机',
          goods_price: '2888',
          goods_weight: '200g',
          add_time: 1628780354648
        },
        {
          goods_id: nanoid(),
          goods_name: '滑板',
          goods_price: '888',
          goods_weight: '5000g',
          add_time: 1628780354648
        },
        {
          goods_id: nanoid(),
          goods_name: '笔记本',
          goods_price: '28888',
          goods_weight: '2kg',
          add_time: 1628780354648
        },
        {
          goods_id: nanoid(),
          goods_name: '电视',
          goods_price: '2888',
          goods_weight: '20kg',
          add_time: 1628780354648
        },
        {
          goods_id: nanoid(),
          goods_name: '冰箱',
          goods_price: '2888',
          goods_weight: '30kg',
          add_time: 1628780354648
        },
        {
          goods_id: nanoid(),
          goods_name: '空调',
          goods_price: '2888',
          goods_weight: '20kg',
          add_time: 1628780354648
        },
        {
          goods_id: nanoid(),
          goods_name: '汽车玻璃水',
          goods_price: '888',
          goods_weight: '1L',
          add_time: 1628780354648
        },
        {
          goods_id: nanoid(),
          goods_name: '枕头',
          goods_price: '88',
          goods_weight: '300g',
          add_time: 1628780354648
        },
        {
          goods_id: nanoid(),
          goods_name: '电动车',
          goods_price: '5888',
          goods_weight: '30kg',
          add_time: 1628780354648
        },
        {
          goods_id: nanoid(),
          goods_name: '自行车',
          goods_price: '2888',
          goods_weight: '10kg',
          add_time: 1628780354648
        },
        {
          goods_id: nanoid(),
          goods_name: 'SUV汽车',
          goods_price: '288888',
          goods_weight: '2t',
          add_time: 1628780354648
        }
      ],
      // 总数据条数
      total: 0
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    // 根据分页获取对应的商品列表
    async getGoodsList() {
      const { data: res } = await this.$http.get('goods', {
        params: this.queryInfo
      })

      if (res.meta.status !== 200) {
        return this.$message.error('获取商品列表失败!')
      }

      this.$message.success('获取商品列表成功!')
      this.goodsList = res.data.goods
      this.total = res.data.total
    },
    //
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getGoodsList()
    },
    //
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getGoodsList()
    },
    async removeById(id) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该商品, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(error => error)

      if (confirmResult !== 'confirm') {
        return this.$message.info('已经取消删除!')
      }

      const { data: res } = this.$http.delete(`goods/${id}`)

      if (res.meta.status !== 200) {
        return this.$message.error('删除失败!')
      }

      this.$message.success('删除成功!')
      this.getGoodsList()
    },
    goAddPage() {
      this.$router.push('/goods/add')
    }
  }
}
</script>

<style lang="less" scoped>
.el-input {
  width: 300px;
}
</style>
