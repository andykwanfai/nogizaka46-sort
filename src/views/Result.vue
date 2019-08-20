<template>
  <v-layout align-center justify-center row fill-height>
    <v-simple-table id="result">
      <thead>
        <tr>
          <th>順位</th>
          <th>名前</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in result" v-bind:key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.name }}</td>
        </tr>
      </tbody>
    </v-simple-table>
  </v-layout>
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
  th,
  td {
    font-size: 20px;
  }
}
</style>
