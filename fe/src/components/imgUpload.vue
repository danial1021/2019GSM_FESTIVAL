<template>
  <div>
    <file-pond
      name="bin"
      ref="pond"
      allow-multiple="false"
      max-files="1"
      accepted-file-types="image/jpeg, image/png"
      :server="server"
      v-bind:files="myFiles"
      v-on:init="handleFilePondInit"
      v-on:processfile="onload"
      />
  </div>
</template>

<script>
import vueFilePond from 'vue-filepond'

import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'

import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview)
export default {
  name: 'app',
  data () {
    return {
      myFiles: [],
      server: {
        url: `${this.$apiRootPath}user`,
        process: {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }
      }
    }
  },
  methods: {
    handleFilePondInit () {
      console.log('FilePond has initialized')
    },
    onload (e, r) {
      if (e) console.error(e.message)
      console.log(r)
    }
  },
  components: {
    FilePond
  }
}
</script>
