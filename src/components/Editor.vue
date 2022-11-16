<template>
  <div style="border: 1px solid #ccc;">
      <Toolbar
          style="border-bottom: 1px solid #ccc"
          :editor="editor"
          :defaultConfig="toolbarConfig"
          :mode="mode"
      />
      <Editor
          style="height: 500px; overflow-y: hidden;"
          v-model="html"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="onCreated"
      />
  </div>
</template>

<script>
import Vue from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

export default Vue.extend({
  name: 'editor',
  components: { Editor, Toolbar },
  data () {
    return {
      editor: null,
      html: '<p>打开需要编辑的笔记</p>',
      toolbarConfig: { },
      editorConfig: { placeholder: '请输入内容...',
        MENU_CONF: {
          uploadImage: {
            server: 'http://localhost:22222/uploadmedia',
            fieldName: 'file',
            // 单个文件的最大体积限制，默认为 2M
            maxFileSize: 3 * 1024 * 1024 // 3M
          }
        }
      },
      mode: 'default' // or 'simple'
    }
  },
  methods: {
    onCreated (editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    }
  },
  mounted () {
    // 模拟 ajax 请求，异步渲染编辑器
    setTimeout(() => {
      this.html = '<p>打开需要编辑的笔记</p>'
    }, 1500)
    let that = this
    function keyDown (e) {
      let currkey = 0
      e = e || window.event
      currkey = e.keyCode || e.which || e.charCode
      if (currkey === 83 && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        that.$notify.success({
          title: '保存提醒',
          message: '已成功保存',
          position: 'bottom-right'
        })
      }
    }
    document.onkeydown = keyDown
  },
  beforeDestroy () {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  }
})
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>
