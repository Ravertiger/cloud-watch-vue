<template>
  <el-container style="height: 100%;" v-loading="onloading">
    <el-header class="main-header" style="position: fixed; width: 100%;">
      <span @click= "toMainPage" class="login-title"><img src="../assets/logo.png" style="height: 24px; margin-right: 10px;"/>望云</span>
      <div>
        <span style="margin-right: 5px;">王小虎</span>
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class=" row-header">
        <div style="margin-left: 10px">
          <span>当前备忘录：</span>
          <el-select v-model="value" @click="bookchange(item.bookid)" placeholder="切换备忘录">
            <el-option v-for="item in options" :key="item.bookid" :label="item.title" :value="item.createtime">
            </el-option>
          </el-select>
          <el-button><i class="el-icon-folder-add"></i> 新建备忘录</el-button>
        </div>
        <div>
          <el-button type="primary" @click="hideEditor" style="margin-right: 30px"><i class="el-icon-document-add"></i>
            创建备忘</el-button>
        </div>
      </div>
    </el-header>
    <el-container style="height: 100vh; width: 40vw; overflow: auto">
      <div class="slide-sideTab" v-show="sideTab" v-loading="editorHtmlLoading">
      <Editor></Editor>
    </div>
      <el-main class="main-rows">
        <el-table :data="tableData" @row-click="showData" v-loading="loading" height="70vh">
          <el-table-column prop="noteid" label="id" width="1" v-if="false">
          </el-table-column>
          <el-table-column prop="createtime" label="日期" width="140">
          </el-table-column>
          <el-table-column prop="title" label="标题" width="220">
          </el-table-column>
          <el-table-column prop="container" label="预览">
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer class="main-footer">
        <el-pagination
        layout="prev, pager, next"
        :total="totalpage"
        :page-size="10"
        @current-change="handleCurrentChange"
        >
        </el-pagination>
      </el-footer>
    </el-container>
  </el-container>
</template>

<style scoped>
.body-bg {
  margin: 0;
}

.slide-sideTab {
  position: fixed;
  width: 60vw;
  height: 100vh;
  z-index: 999;
  right: 0;
  background-color: aliceblue;
  margin-top: 161px;
}

.el-container {
  margin-top: 0;
}

.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.main-rows {
  margin-top: 160px;
}

.main-header {
  display: flex;
  font-size: 12px;
  justify-content: space-between;
  background-color: rgb(54, 191, 237);
  box-shadow: 0px 3px 8px rgba(100, 100, 100, 0.6);
  z-index: 1000;
}

.login-title {
  font-size: 1.2rem;
  font-weight: bolder;
  align-items: center;
  display: flex;
  align-items: center;
  color: rgb(255, 255, 255);
  cursor: pointer;
}

.row-fixed {
  position: fixed;
}

.row-header {
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px rgb(163, 163, 163) solid;
  padding: 80px 0 20px 0;
  z-index: 1000;
  width: 100vw;
}

.main-footer{
  margin-top: 10px;
}
</style>

<script>
import Editor from './Editor.vue'
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'Home',
  data () {
    return {
      tableData: [{createtime: 1, title: 'undefine', container: ''}],
      sideTab: true,
      options: [{createtime: 1, title: 'undefine', bookid: 1}],
      value: '',
      defaultbook: '',
      loading: false,
      onloading: true,
      editorHtmlLoading: false,
      totalpage: 1
    }
  },
  components: { Editor },
  methods: {
    hideEditor () {
      this.sideTab = !this.sideTab
    },
    showData (row) {
      console.log(row.noteid)
      this.editorHtmlLoading = true
      setTimeout(() => {
        this.editorHtmlLoading = false
      }, 2000)
    },
    handleCurrentChange (val) {
      console.log(val)
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 2000)
    },
    toMainPage () {
      console.log('clickmeeee')
      this.$router.push({ name: 'HelloWorld' })
    },
    bookchange (bookid) {
      console.log(bookid)
    }
  },
  async beforeMount () {
    console.log('before')
    let that = this
    let data = qs.stringify({'satoken': localStorage.getItem('userID')})
    await axios.post('http://localhost:22222/booklist', data, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      .then(res => {
        console.log(res.data)
        if (res.status === 200) {
          that.options = res.data
          that.value = res.data[3].title
          that.defaultbook = res.data[3].bookid
        } else {
          alert(res.data.msg)
        }
      })
      .catch(err => {
        console.log(err)
      })
    let data2 = qs.stringify({'satoken': localStorage.getItem('userID'), 'bookid': this.defaultbook})
    await axios.post('http://localhost:22222/notelist', data2, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      .then(res => {
        if (res.status === 200) {
          console.log(res.data)
          that.tableData = res.data
        } else {
          alert(res.data.msg)
        }
        this.onloading = false
      })
      .catch(err => {
        console.log(err)
        this.onloading = false
      })
  },
  mounted () {
    console.log('finish')
    this.value = this.options[0].label
    this.totalpage = this.tableData.length
  }
}
</script>
