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
          <template v-for="(item, index) in items">
            <v-list-tile
              :key="item.name"
              avatar
              ripple
              @click="toggle(index)"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">{{ item.title }}</v-list-tile-sub-title>
                <v-list-tile-sub-title>{{ item.reason }}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-list-tile-action-text>{{ item.time }}</v-list-tile-action-text>
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
            <v-divider
              v-if="index + 1 < items.length"
              :key="index"
            ></v-divider>
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
      selected: [2],
      items: [
        {
          time: '15 min',
          name: 'Ali Connors',
          title: 'Brunch this weekend?',
          reason: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
        },
        {
          time: '15 min',
          name: 'Ali Connors',
          title: 'Brunch this weekend?',
          reason: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
        },
        {
          time: '15 min',
          name: 'Ali Connors',
          title: 'Brunch this weekend?',
          reason: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
        },
        {
          time: '15 min',
          name: 'Ali Connors',
          title: 'Brunch this weekend?',
          reason: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
        },
        {
          time: '15 min',
          name: 'Ali Connors',
          title: 'Brunch this weekend?',
          reason: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
        }
      ],
      params: {
        search: '',
        return_time: ''
      }
    }
  },
  mounted () {
    this.getlist()
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
    getlist () {
      this.$axios.get(`board/read/${this.$route.params.name}`)
        .then(({ data }) => {
          if (!data.success) throw new Error(data.msg)
          this.board = data.d
          this.list()
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'warning' })
        })
    },
    list () {
      if (this.loading) return
      if (!this.board._id) return
      this.loading = true
      this.params.draw += 1
      this.params.skip = this.setSkip
      this.params.limit = this.pagination.rowsPerPage
      this.params.sort = this.setSort
      this.params.order = this.setOrder

      this.$axios.get(`article/list/${this.board._id}`, { params: this.params })
        .then(({ data }) => {
          if (!data.success) throw new Error(data.msg)
          this.pagination.totalItems = data.t
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
      this.$axios.get(`article/read/${atc._id}`)
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
