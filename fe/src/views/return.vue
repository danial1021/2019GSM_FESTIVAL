<template>
  <v-layout row>
    <v-flex xs11 sm12 offset-sm0>
      <v-card>
        <v-toolbar color="pink" dark>
          <v-btn icon>
            <v-icon>assignment_ind</v-icon>
          </v-btn>
          <v-toolbar-title>외출 명단</v-toolbar-title>

          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-toolbar>

        <v-list two-line>
          <template v-for="article in articles">
            <v-list-tile
              v-if="article.ret == '복귀 안함'"
              :key="article"
              @click="ret(article)"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ article.name }}</v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">{{ article.title }}</v-list-tile-sub-title>
                <v-list-tile-sub-title>{{ article.content }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-else
              :key="article"
              @click="unreturn(article)"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ article.name }}</v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">{{ article.title }}</v-list-tile-sub-title>
                <v-list-tile-sub-title>{{ article.content }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      selected: [],
      articles: {
        name: '로딩중...',
        title: '로딩중...',
        content: '무엇?',
        ret: ''
      },
      search: '',
      ca: false,
      dlMode: 0,
      timeout: null,
      loading: false
    }
  },
  mounted () {
    this.list()
  },
  watch: {
    'search' (m) {
      this.delay()
    }
  },
  methods: {
    toggle (index) {
      const i = this.selected.indexOf(index)

      if (i > -1) {
        this.selected.splice(i, 1)
      } else {
        this.selected.push(index)
      }
    },
    list () {
      if (this.loading) return
      this.loading = true
      this.$axios.get(`return/list/${this.search}`)
        .then(({ data }) => {
          if (!data.success) throw new Error(data.msg)
          this.articles = data.ds
          console.log(this.articles)
          this.loading = false
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'warning' })
          this.loading = false
        })
    },
    delay () {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.list()
      }, 1000)
    },
    ret (atc) {
      this.form = {
        ret: '복귀함'
      }
      this.$axios.put(`return/${atc._id}`, this.form)
        .then(({ data }) => {
          atc.ret = data.ret
          this.$store.commit('pop', { msg: '복귀했습니다.', color: 'warning' })
          if (!data.success) throw new Error(data.msg)
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'warning' })
        })
    },
    unreturn (atc) {
      this.form = {
        ret: '복귀 안함'
      }
      this.$axios.put(`return/${atc._id}`, this.form)
        .then(({ data }) => {
          atc.ret = data.ret
          this.$store.commit('pop', { msg: '복귀취소됬습니다.', color: 'warning' })
          if (!data.success) throw new Error(data.msg)
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'warning' })
        })
    }
  }
}
</script>
