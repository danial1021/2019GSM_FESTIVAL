<template>
  <v-stepper v-model="e6" vertical>
    <v-stepper-step :complete="e6 > 1" step="1">
      이름 쓰기
      <small>사용자 이름 쓰기</small>
    </v-stepper-step>
    <v-stepper-content step="1">
      <v-card color="grey lighten-5" class="mb-5" height="100px" ref="form">
        <v-card-text>
          <v-text-field
            v-model="form.name"
            label="이름"
            placeholder="홍길동"
            required
          ></v-text-field>
        </v-card-text>
      </v-card>
      <v-btn color="primary" @click.native="e6 = 2">Continue</v-btn>
    </v-stepper-content>
    <v-stepper-step :complete="e6 > 2" step="2">이동할 장소 선택</v-stepper-step>
    <v-stepper-content step="2">
      <v-card color="grey lighten-4" class="mb-5" height="100px" ref="form">
        <v-card-text>
          <v-autocomplete
            v-model="form.location"
            :items="locations"
            label="장소"
            placeholder="장소 선택..."
            required
          ></v-autocomplete>
        </v-card-text>
      </v-card>
      <v-btn color="primary" @click.native="e6 = 3">Continue</v-btn>
      <v-btn flat @click.native="e6 = 1">Backward</v-btn>
    </v-stepper-content>
    <v-stepper-step :complete="e6 > 3" step="3">머무를 시간 정하기</v-stepper-step>
    <v-stepper-content step="3">
      <v-card color="grey lighten-5" class="mb-5" height="150px" ref="form">
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs11 sm5>
              <v-menu
                ref="menu"
                :close-on-content-click="false"
                v-model="menu2"
                :nudge-right="40"
                :return-value.sync="form.time1"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="form.time1"
                  label="start time"
                  prepend-icon="access_time"
                  readonly
                ></v-text-field>
                <v-time-picker v-model="form.time1" @change="$refs.menu.save(form.time1)"></v-time-picker>
              </v-menu>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs11 sm5>
              <v-dialog
                ref="dialog"
                v-model="modal2"
                :return-value.sync="form.time2"
                persistent
                lazy
                full-width
                width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="form.time2"
                  label="time to end"
                  prepend-icon="access_time"
                  readonly
                ></v-text-field>
                <v-time-picker v-model="form.time2" actions>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="modal2 = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.dialog.save(form.time2)">OK</v-btn>
                </v-time-picker>
              </v-dialog>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
      <v-btn color="primary" @click.native="e6 = 4">Continue</v-btn>
      <v-btn flat @click.native="e6 = 2">Backward</v-btn>
    </v-stepper-content>
    <v-stepper-step step="4">사유 작성</v-stepper-step>
    <v-stepper-content step="4">
      <v-card color="grey lighten-4" class="mb-5" height="250px" ref="form">
        <v-card-text>
          <v-flex xs12>
            <v-text-field
              label="이동 사유를 작성해주세요"
              textarea
              :counter="1000"
              :rules="[(v) => v.length <= 1000 || 'Max 1000 characters']"
              full-width
              multi-line
              single-line
            ></v-text-field>
          </v-flex>
        </v-card-text>
      </v-card>
      <v-btn color="primary" @click.native="e6 = 1">Return to the beginning</v-btn>
      <v-btn flat @click.native="e6 = 3">Backward</v-btn>
      <v-btn color="primary" flat @click="submit">Submit</v-btn>
    </v-stepper-content>
  </v-stepper>
</template>

<script>
export default {
  data: () => ({
    form: {
      location: '',
      name: '',
      time1: null,
      time2: null
    },
    menu2: false,
    modal2: false,
    locations: [
      'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua &amp; Barbuda',
      'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas',
      'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin',
      'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia &amp; Herzegovina', 'Botswana', 'Brazil', 'British Virgin Islands'
    ],
    e6: 1
  }),

  methods: {
    submit () {
      this.$validator.validateAll()
        .then(r => {
          if (!r) throw new Error('모두 기입해주세요')
          else this.$axios.post('move', this.form)
        })
        .then(r => {
          if (!r.data.success) throw new Error(r.data.msg)
          this.$store.commit('pop', { msg: '신청이 완료 되었습니다', color: 'success' })
          this.$router.push('/')
        })
        .catch(e => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'warning' })
        })
    },
    pop (m, cl) {
      this.sb.act = true
      this.sb.msg = m
      this.sb.color = cl
    },
    check () {
      console.log(this.form)
    }
  }
}
</script>
