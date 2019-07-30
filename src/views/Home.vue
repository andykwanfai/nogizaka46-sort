<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex lg2 md3 sm4 xs6>
      <Member v-bind="members[left]" target="left" />
    </v-flex>
    <v-flex lg2 md3 sm4 xs6>
      <Member v-bind="members[right]" target="right" />
    </v-flex>
  </v-layout>
</template>

<script>
import Member from "../components/Member";
import { mapState } from "vuex";

// console.log(members)
export default {
  components: {
    Member
  },
  data: () => ({}),
  created: function() {
    //shuffle the member list
    this.$store.dispatch("init", this.members);
  },
  computed: mapState({
    members: state => state.members,
    left: state => state.left,
    right: state => state.right
  })
};
</script>

<style>
</style>
