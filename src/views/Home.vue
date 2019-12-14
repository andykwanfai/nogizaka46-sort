<template>
  <v-container fill-height>
    <v-layout align-center justify-center row>
      <v-flex>
        <v-layout justify-center row>
          <v-flex lg4 md6 sm8 xs11>Battle No. {{counter}}</v-flex>
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
          <v-flex lg4 md6 sm8 xs11>
            <v-hover v-slot:default="{ hover }">
              <v-btn
                id="draw-btn"
                block
                :elevation="hover ? 8 : 0"
                outlined
                color="secondary"
                v-on:click="select"
                height="56px"
              >
                <b>引き分け</b>
              </v-btn>
            </v-hover>
          </v-flex>
        </v-layout>
        <v-layout justify-center row>
          <v-flex lg4 md6 sm8 xs11>
            <v-btn id="undo-btn" color="blue" v-on:click="undo" dark>
              <v-icon left>mdi-reply</v-icon>undo
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Member from "../components/Member";
import { mapState } from "vuex";
import { cloneDeep } from "lodash";

export default {
  components: {
    Member
  },
  data: () => ({ isDisable: true, history: [] }),
  created: function() {
    // shuffle the member list
    this.$store.dispatch("init");

    //stack the state of comparison
    this.$store.subscribeAction((action, state) => {
      this.history.push(cloneDeep(state));
    });
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
    },
    undo: function() {
      if (this.history.length > 0) {
        this.$store.replaceState(this.history.pop());
      }
    }
  }
};
</script>

<style scoped>
b {
  font-size: 1.5rem;
}
#undo-btn {
  margin-top: 10px;
}
</style>
