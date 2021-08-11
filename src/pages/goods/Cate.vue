<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button class="mbbutton" type="primary" @click="showAddCateDialog"
            >添加分类</el-button
          >
        </el-col>
      </el-row>

      <!-- 表格区域 -->
      <tree-table
        :data="cateList"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        show-index
        index-text="#"
        border
        :show-row-hover="false"
      >
        <!-- 是否有效 -->
        <template slot="isok" slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.cat_deleted === false"
            style="color: lightgreen;"
          ></i>
          <i class="el-icon-error" v-else style="color:red;"></i>
        </template>

        <!-- 排序 -->
        <template slot="order" slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag
            type="success"
            size="mini"
            v-else-if="scope.row.cat_level === 1"
            >二级</el-tag
          >
          <el-tag type="warning" size="mini" v-else>三级</el-tag>
        </template>

        <!-- 操作 -->
        <template slot="opt" slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini"
            >编辑</el-button
          >
          <el-button type="danger" icon="el-icon-delete" size="mini"
            >删除</el-button
          >
        </template>
      </tree-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[3, 5, 7, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 添加分类的对话框 -->
    <el-dialog
      title="添加分类"
      :visible.sync="addCateDialogVisible"
      width="50%"
      @close="addCateDialogVisible"
    >
      <!-- 添加分类的表单 -->
      <el-form
        :model="addCateForm"
        :rules="addCateFormRules"
        ref="addCateFormRef"
        label-width="100px"
      >
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <!-- options  用来指定数据源 -->
          <!-- props  用来指定配置对象 -->
          <el-cascader
            v-model="selectedKeys"
            expand-trigger="hover"
            :options="parentCateList"
            :props="cascaderProps"
            @change="parentCateChange"
            clearable
            change-on-select
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCateDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { nanoid } from 'nanoid'
export default {
  name: 'Cate',
  data() {
    return {
      // 查询条件
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      // 商品分类的数据列表，默认为空
      cateList: [
        {
          cat_id: nanoid(),
          cat_name: '大家电',
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_id: nanoid(),
              cat_name: '电视',
              cat_pid: 1,
              cat_level: 1,
              cat_deleted: false,
              children: [
                {
                  cat_id: nanoid(),
                  cat_name: '曲面电视',
                  cat_pid: 3,
                  cat_level: 3,
                  cat_deleted: false,
                  children: []
                },
                {
                  cat_id: nanoid(),
                  cat_name: '海信',
                  cat_pid: 3,
                  cat_level: 3,
                  cat_deleted: false,
                  children: []
                },
                {
                  cat_id: nanoid(),
                  cat_name: '夏普',
                  cat_pid: 3,
                  cat_level: 3,
                  cat_deleted: false,
                  children: []
                },
                {
                  cat_id: nanoid(),
                  cat_name: '创维',
                  cat_pid: 3,
                  cat_level: 3,
                  cat_deleted: false,
                  children: []
                }
              ]
            },
            {
              cat_id: nanoid(),
              cat_name: '空调',
              cat_pid: 1,
              cat_level: 1,
              cat_deleted: false,
              children: [
                {
                  cat_id: nanoid(),
                  cat_name: '曲面电视',
                  cat_pid: 3,
                  cat_level: 3,
                  cat_deleted: false,
                  children: []
                }
              ]
            },
            {
              cat_id: nanoid(),
              cat_name: '洗衣机',
              cat_pid: 1,
              cat_level: 1,
              cat_deleted: false,
              children: [
                {
                  cat_id: nanoid(),
                  cat_name: '曲面电视',
                  cat_pid: 3,
                  cat_level: 3,
                  cat_deleted: false,
                  children: []
                }
              ]
            },
            {
              cat_id: nanoid(),
              cat_name: '冰箱',
              cat_pid: 1,
              cat_level: 1,
              cat_deleted: false,
              children: [
                {
                  cat_id: nanoid(),
                  cat_name: '曲面电视',
                  cat_pid: 3,
                  cat_level: 3,
                  cat_deleted: false,
                  children: []
                }
              ]
            }
          ]
        },
        {
          cat_id: nanoid(),
          cat_name: '热门推荐',
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_id: nanoid(),
              cat_name: '电视',
              cat_pid: 1,
              cat_level: 1,
              cat_deleted: false,
              children: [
                {
                  cat_id: nanoid(),
                  cat_name: '曲面电视',
                  cat_pid: 3,
                  cat_level: 3,
                  cat_deleted: false,
                  children: []
                }
              ]
            }
          ]
        },
        {
          cat_id: nanoid(),
          cat_name: '海外购',
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_id: nanoid(),
              cat_name: '电视',
              cat_pid: 1,
              cat_level: 1,
              cat_deleted: false,
              children: [
                {
                  cat_id: nanoid(),
                  cat_name: '曲面电视',
                  cat_pid: 3,
                  cat_level: 3,
                  cat_deleted: false,
                  children: []
                }
              ]
            }
          ]
        },
        {
          cat_id: nanoid(),
          cat_name: '苏宁房产',
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_id: nanoid(),
              cat_name: '电视',
              cat_pid: 1,
              cat_level: 1,
              cat_deleted: false,
              children: [
                {
                  cat_id: nanoid(),
                  cat_name: '曲面电视',
                  cat_pid: 3,
                  cat_level: 3,
                  cat_deleted: false,
                  children: []
                }
              ]
            }
          ]
        },
        {
          cat_id: nanoid(),
          cat_name: '手机相机',
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_id: nanoid(),
              cat_name: '电视',
              cat_pid: 1,
              cat_level: 1,
              cat_deleted: false,
              children: [
                {
                  cat_id: nanoid(),
                  cat_name: '曲面电视',
                  cat_pid: 3,
                  cat_level: 3,
                  cat_deleted: false,
                  children: []
                }
              ]
            }
          ]
        }
      ],
      // 总数据条数
      total: 10,
      // 为table指定列的定义
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name'
        },
        {
          lable: '是否有效',
          // 表示，将当前列定义为模板列
          type: 'template',
          // 表示当前这一列使用模板名称
          template: 'isok'
        },
        {
          lable: '排序',
          // 表示，将当前列定义为模板列
          type: 'template',
          // 表示当前这一列使用模板名称
          template: 'order'
        },
        {
          lable: '操作',
          // 表示，将当前列定义为模板列
          type: 'template',
          // 表示当前这一列使用模板名称
          template: 'opt'
        }
      ],
      // 控制添加分类对话框的显示与隐藏
      addCateDialogVisible: false,
      // 添加分类的表单数据对象
      addCateForm: {
        // 将要添加的分类的名称
        cat_name: '',
        // 分类的等级，默认要添加的是一级分类
        cat_pid: 0,
        // 分类的等级，默认要添加的是一级分类
        cat_level: 0
      },
      // 添加分类表单的验证规则对象
      addCateFormRules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      },
      // 父级分类的列表
      parentCateList: [],
      // 指定级联选择器的配置对象
      cascaderProps: {
        value: 'cat_id',
        lable: 'cat_name',
        children: 'children'
      },
      // 选中的父级分类的Id数组
      selectedKeys: []
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    // 获取商品分类数据
    async getCateList() {
      const { data: res } = await this.$http.get('categoies', {
        params: this.queryInfo
      })

      if (res.meta.status !== 200) {
        return this.$message.error('获取商品分类数据失败！')
      }

      // 把数据列表，赋值给 cateList
      this.cateList = res.data.result

      //为总数据条数赋值
      this.total = res.data.total
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getCateList()
    },
    // 监听 pagenum 改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getCateList()
    },
    // 点击按钮，展示添加分类的对话框
    showAddCateDialog() {
      // 先获取父级分类的数据列表
      this.getAddCateDialog()
      // 再展示出对话框
      this.addCateDialogVisible = true
    },
    // 获取父级分类的数据列表
    async getAddCateDialog() {
      const { data: res } = await this.$http.get('categories', {
        params: { type: 2 }
      })

      if (res.meta.status !== 200) {
        return this.$message.error('获取父级分类数据失败！')
      }

      this.parentCateList = res.data
    },
    // 选择项发生变化触发这个函数
    parentCateChange() {
      //如果 selectedKeys 数组中的 length 大于0，证明选中的父级分类
      // 反之，就说明没有选中任何父级分类
      if (this.selectedKeys.length > 0) {
        // 父级分类的id
        this.addCateForm.cat_pid = this.selectedKeys[
          this.selectedKeys.length - 1
        ]
        // 为当前分类的等级赋值
        this.addCateForm.cat_level = this.selectedKeys.length
        return
      } else {
        // 父级分类的id
        this.addCateForm.cat_pid = 0

        // 为当前分类的等级赋值
        this.addCateForm.cat_level = 0
      }
    },
    // 点击按钮，添加新的分类
    addCate() {
      this.$refs.addCateFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post(
          'categories',
          this.addCateForm
        )

        if (res.meta.status !== 200) {
          this.$message.error('添加分类失败！')
        }

        this.$$message.success('添加分类成功！')
        this.getCateList()
        this.addCateDialogVisible = false
      })
    },
    // 监听对话框的关闭事件，重置表单数据
    addCateDialogVisible() {
      this.$refs.addCateFormRef.resetFields()
      this.selectedKeys = []
      this.addCateForm.cat_level = 0
      this.addCateForm.cat_pid = 0
    }
  }
}
</script>

<style lang="less" scoped>
.mbbutton {
  margin-bottom: 15px;
}

.el-cascader {
  width: 100%;
}
</style>
