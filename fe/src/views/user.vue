<template>
  <v-container>
    <div>
      <v-card>
          <li>
            <td>ddd</td>
            <td>ddd</td>
          </li>
          <h1>dfddf</h1>
          <strike>dfdfdfd</strike>
        <v-card-title>회원 정보 수정</v-card-title>
        <v-card-text>
          <input id="bin" type="file" >
        </v-card-text>
        <v-card-actions>
          <v-btn @click="upload">올림</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-container>
</template>
<script>
export default {
  mounted () {
  },
  methods: {
    upload () {
      const fd = new FormData()
      fd.append('name', 'xxxx')
      fd.append('bin', document.getElementById('bin').files[0])
      this.$axios.post('/user', fd)
        .then(r => {
          console.log('success')
        })
        .catch(e => console.log(e.message))
    }
  }
}
</script>
