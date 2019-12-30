<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>회원 가입</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <form>
              <v-text-field
                v-validate="'required|min:4|max:20'"
                v-model="form.id"
                :counter="20"
                :error-messages="errors.collect('id')"
                label="아이디"
                data-vv-name="id"
                required
              ></v-text-field>
              <v-text-field
                v-validate="'required|min:6|max:40'"
                v-model="form.pwd"
                :counter="40"
                :error-messages="errors.collect('pwd')"
                label="비밀번호"
                data-vv-name="pwd"
                required
                type="password"
              ></v-text-field>
              <v-text-field
                v-validate="'required|min:1|max:40'"
                v-model="form.name"
                :counter="40"
                :error-messages="errors.collect('name')"
                label="이름"
                data-vv-name="name"
                required
              ></v-text-field>
              <v-layout row wrap v-if="form.radios!='teacher'">
                <v-flex xs3 sm3 d-flex>
                  <v-select
                    v-model="form.grade"
                    :items="grade"
                    label="학년"
                    required
                  ></v-select>
                </v-flex>
                &nbsp;&nbsp;&nbsp;
                <v-flex xs3 sm3 d-flex>
                  <v-select
                    v-model="form.class"
                    :items="class1"
                    label="반"
                    required
                  ></v-select>
                </v-flex>
                &nbsp;&nbsp;&nbsp;
                <v-flex xs3 sm3 d-flex>
                  <v-select
                  v-model="form.num"
                    :items="num"
                    label="번호"
                    required
                  ></v-select>
                </v-flex>
              </v-layout>
              <v-radio-group v-model="form.radios" :mandatory="false" row>
                <v-radio label="학생" value="student"></v-radio>
                <v-radio label="선생님" value="teacher"></v-radio>
              </v-radio-group>
              <v-checkbox
                v-validate="'required'"
                v-model="agree"
                :error-messages="errors.collect('agree')"
                value="1"
                label="약관동의: 실제 사용중인 아이디로 가입하지 마시기 바랍니다"
                data-vv-name="agree"
                type="checkbox"
                required
              ></v-checkbox>

              <v-btn @click="submit">가입</v-btn>
              <v-btn @click="clear">초기화</v-btn>
            </form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-snackbar
      v-model="sb.act"
    >
      {{ sb.msg }}
      <v-btn
        :color="sb.color"
        flat
        @click="sb.act = false"
      >
        닫기
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import ko from 'vee-validate/dist/locale/ko'
export default {
  $_veeValidate: {
    validator: 'new'
  },
  data: () => ({
    form: {
      id: '',
      name: '',
      pwd: '',
      grade: '',
      class: '',
      num: '',
      lv: '',
      radios: ''
    },
    sb: {
      act: false,
      msg: '',
      color: 'warning'
    },
    agree: null,
    dictionary: {
      messages: ko.messages,
      attributes: {
        id: '아이디',
        pwd: '비밀번호',
        name: '이름',
        agree: '약관동의',
        grade: '학년',
        class: '반',
        num: '번호',
        radios: 'radios'
        // custom attributes
      },
      custom: {
      }
    },
    grade: ['1학년', '2학년', '3학년'],
    class1: ['1반', '2반', '3반', '4반'],
    num: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21']
  }),
  mounted () {
    this.$validator.localize('ko', this.dictionary)
  },
  methods: {
    submit () {
      this.$validator.validateAll()
        .then(r => {
          if (!r) throw new Error('모두 기입해주세요')
          if (this.form.radios === 'teacher') {
            delete this.form.grade
            delete this.form.class
            delete this.form.num
            this.form.lv = 1
          } else {
            this.form.grade = this.form.grade.slice(0, 1)
            this.form.class = this.form.class.slice(0, 1)
            this.form.num = this.form.num.slice(0, 1)
            this.form.lv = 2
          }
          return this.$axios.post('register', this.form)
        })
        .then(r => {
          if (!r.data.success) throw new Error(r.data.msg)
          this.$store.commit('pop', { msg: '가입 완료 되었습니다', color: 'success' })
          this.$router.push('/sign')
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
    clear () {
      this.form.id = ''
      this.form.pwd = ''
      this.form.name = ''
      this.form.grade = ''
      this.form.class = ''
      this.form.num = ''
      this.form.radios = ''
      this.agree = null
      this.$validator.reset()
    }
  }
}
</script>
