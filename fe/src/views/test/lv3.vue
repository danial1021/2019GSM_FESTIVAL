<template>
  <v-container fluid :grid-list-md="!$vuetify.breakpoint.xs">
    <v-layout wrap row>

      <v-flex xs12 sm6>
        <v-card light>
          <v-card-text >
            <editor v-model="editorText"/>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12 sm6>
        <v-card light>
          <v-card-text >
            <viewer :value="editorText" />
          </v-card-text>
        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      editorText: ''
    }
  }
}
</script>
