<template>
  <v-layout justify-center row fill-height>
    <v-simple-table id="result">
      <thead>
        <tr>
          <th>順位</th>
          <th>名前</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in rankResult()" v-bind:key="index">
          <td>{{ item.rank }}</td>
          <td>{{ item.name }}</td>
        </tr>
      </tbody>
    </v-simple-table>
    <v-btn class="ma-1" color="blue" dark @click.stop="dialog = true">
      <v-icon dark>mdi-share-variant</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>
          <div class="flex-grow-1"></div>
          <v-btn text>
            <v-icon @click="dialog = false">close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-textarea
            id="result-string"
            readonly
            hide-details
            outlined
            no-resize
            v-bind:value="resultString()"
          ></v-textarea>
        </v-card-text>
        <v-divider></v-divider>
        <div id="copy-label">Copy:</div>
        <v-card-actions>
          <v-btn fab dark color="blue-grey" @click="range=0;copy()">
            <!-- <v-icon>mdi-content-copy</v-icon> -->
            ALL
          </v-btn>
          <v-btn fab dark color="blue-grey" @click="range=5;copy()">TOP 5</v-btn>
          <v-btn fab dark color="blue-grey" @click="range=10;copy()">TOP 10</v-btn>
        </v-card-actions>
        <v-snackbar v-model="snackbar" :timeout="1500" top multi-line>Copied</v-snackbar>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["sorted"],
  data: () => ({ dialog: false, range: 0, snackbar: false }),
  created: function() {
    if (!this.$props.sorted && process.env.NODE_ENV === "production") {
      this.$router.push({ name: "home" });
    } else {
      this.$store.dispatch("init");
    }
  },
  methods: {
    rankResult: function() {
      const result = this.$store.state.result;
      let rank = [];
      let currentRanking = 1;
      rank.push({ name: result[0].name, rank: currentRanking });
      for (let i = 1; i < result.length; i++) {
        if (
          (result[i].drawId || result[i - 1].drawId) &&
          result[i].drawId === result[i - 1].drawId
        ) {
          rank.push({ name: result[i].name, rank: currentRanking });
        } else {
          currentRanking = i + 1;
          rank.push({ name: result[i].name, rank: i + 1 });
        }
      }
      return rank;
    },
    resultString: function() {
      let string = "";
      const result = this.rankResult();
      let length;
      if (this.range === 0) {
        length = result.length;
      } else {
        length = this.range;
      }

      for (let i = 0; i < length; i++) {
        string += `${result[i].rank} ${result[i].name}\n`;
      }
      return string;
    },
    copy: async function() {
      this.snackbar = false;
      await setTimeout(function() {}, 100);
      const copyText = document.getElementById("result-string");
      if (copyText) {
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");
        this.snackbar = true;
      }
    }
  },
  computed: {
    ...mapState({
      result: state => state.result
    })
  }
};
</script>

<style lang="scss" scoped>
#result {
  th,
  td {
    font-size: 20px;
  }
}
.v-card__actions {
  padding-left: 24px;
  padding-bottom: 16px;
}
.v-card__text {
  padding-bottom: 0px;
}

#copy-label {
  padding-left: 24px;
  padding-top: 5px;
}
</style>
