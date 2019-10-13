<template>
  <v-container fill-height>
    <v-layout align-center justify-center row>
      <v-flex>
        <v-layout justify-center row>
          <v-flex lg4 md6 sm8 xs12>Battle No. {{counter}}</v-flex>
        </v-layout>
        <v-layout justify-center row>
          <v-flex lg2 md3 sm4 xs6>
            <Member v-bind="result[left]" target="left" />
          </v-flex>
          <v-flex lg2 md3 sm4 xs6>
            <Member v-bind="result[right]" target="right" />
          </v-flex>
        </v-layout>
        <v-layout justify-center row>
          <v-flex lg4 md6 sm8 xs12>
            <v-hover v-slot:default="{ hover }">
              <v-btn
                id="draw-btn"
                block
                :elevation="hover ? 8 : 0"
                outlined
                color="secondary"
                v-on:click="select"
                height="56px"
                class="ma-1"
              >
                <b>引き分け</b>
              </v-btn>
            </v-hover>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
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
    right: state => state.right,
    counter: state => state.counter
  }),
  methods: {
    select: function() {
      this.$store.dispatch("select", "draw");
    }
  }
};
</script>

<style scoped>
b {
  font-size: 1.5rem;
}
</style>
