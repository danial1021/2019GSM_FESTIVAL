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
              @click="toggle(index)"
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
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      selected: []
    }
  },
  mounted () {
    this.list()
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

      this.$axios.get(`return/list/`)
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
          this.selArticle.content = data.d.content
          this.selArticle.cnt.view = data.d.cnt.view
          this.loading = false
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'warning' })
          this.loading = false
        })
    }
  }

}
</script>
