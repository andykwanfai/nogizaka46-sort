<template>
  <ul id="result">
    <li v-for="(item, index) in result" v-bind:key="index">{{ index+1 }} {{ item.name }}</li>
  </ul>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["sorted"],
  data: () => ({}),
  created: function() {
    if (!this.$props.sorted) {
      this.$router.push({ name: "home" });
    }
  },
  methods: {},
  computed: mapState({
    result: state => state.result
  })
};
</script>

<style lang="scss" scoped>
#result {
  list-style: none;
}
</style>
