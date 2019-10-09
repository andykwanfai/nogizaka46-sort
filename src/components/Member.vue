<template>
  <v-card v-ripple="{ center: true }" v-on:click="select" class="ma-1" hover>
    <v-img v-bind:src="`${publicPath}img/profile%20pic/24th%20single/${img}.jpg`"></v-img>
    <v-card-title class="justify-center">
      <b>{{name}}</b>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  props: ["name", "generation", "img", "target"],
  data: () => ({
    publicPath: process.env.BASE_URL
  }),
  methods: {
    select: function() {
      this.$store.dispatch("select", this.target);
    }
  }
};
</script>

<style>
b {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
