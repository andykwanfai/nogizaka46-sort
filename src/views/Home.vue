<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex lg2 md3 sm4 xs6>
      <Member v-bind="result[left]" target="left" />
    </v-flex>
    <v-flex lg2 md3 sm4 xs6>
      <Member v-bind="result[right]" target="right" />
    </v-flex>
  </v-layout>
</template>

<script>
import Member from "../components/Member";
import { mapState } from "vuex";

export default {
  components: {
    Member
  },
  data: () => ({}),
  created: function() {
    //shuffle the member list
    this.$store.dispatch("init");
  },
  computed: mapState({
    result: state => state.result,
    left: state => state.left,
    right: state => state.right
  })
};
</script>

<style>
</style>
