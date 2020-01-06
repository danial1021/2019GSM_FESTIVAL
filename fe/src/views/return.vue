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
          <template v-for="(article, index) in articles">
            <v-list-tile
              :key="article"
              @click="read(article)"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ article.name }}</v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">{{ article.title }}</v-list-tile-sub-title>
                <v-list-tile-sub-title>{{ article.content }}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-icon
                  v-if="selected.indexOf(index) < 0"
                  color="grey lighten-1"
                >
                  star_border
                </v-icon>

                <v-icon
                  v-else
                  color="yellow darken-2"
                >
                  star
                </v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>
    <v-dialog v-model="dialog" persistent max-width="500px" :fullscreen="$vuetify.breakpoint.xs">
      <v-card v-if="!dlMode" light>
        <v-card-title>
          <span class="headline">제목: {{selArticle.title}}</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <p>내용</p>
          <!-- {{selArticle.content}} -->
          <viewer :value="selArticle.content"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="warning darken-1" flat>수정</v-btn>
          <v-btn color="error darken-1" flat>삭제</v-btn>
          <v-btn color="secondary darken-1" flat @click.native="dialog = false">닫기</v-btn>
        </v-card-actions>
        <v-card-text>
          <v-card-text v-if="ca">
            <v-alert v-model="ca" type="warning">
              <h4>정말 진행 하시겠습니까?</h4>
              <v-btn color="error" @click="del()">확인</v-btn>
              <v-btn color="secondary" @click="ca=false">취소</v-btn>
            </v-alert>
          </v-card-text>
        </v-card-text>
      </v-card>
      <v-card light v-else>
        <v-card-title>
          <span class="headline">글 {{(dlMode === 1) ? '작성' : '수정'}}</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  label="제목"
                  persistent-hint
                  required
                  v-model="form.title"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <editor v-model="form.content"/>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="(dlMode === 1) ? add() : mod()">확인</v-btn>
          <v-btn color="red darken-1" flat @click.native="dialog = false">취소</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
        content: '무엇?'
      },
      search: '',
      ca: false,
      dialog: false,
      dlMode: 0,
      selArticle: {},
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
          this.loading = false
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'warning' })
          this.loading = false
        })
    },
    read (atc) {
      this.selArticle = atc
      this.loading = true
      this.$axios.get(`return/read/${atc._id}`)
        .then(({ data }) => {
          if (!data.success) throw new Error(data.msg)
          this.dlMode = 0
          this.dialog = true
          this.selArticle = data.d[0]
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
    }
  }
}
</script>
