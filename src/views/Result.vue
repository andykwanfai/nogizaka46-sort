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
        <tr v-for="(item, index) in result" v-bind:key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.name }}</td>
        </tr>
      </tbody>
    </v-simple-table>
    <v-btn class="ma-2" color="blue" dark @click.stop="dialog = true">
      <v-icon dark>mdi-share-variant</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>
          <div class="flex-grow-1"></div>
          <v-btn text icon large>
            <v-icon @click="dialog = false">close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-textarea id="result-string" outlined no-resize v-bind:value="resultString()"></v-textarea>
        </v-card-text>
        <v-divider></v-divider>
        <div id="copy-label">コピー：</div>
        <v-card-actions>
          <v-btn fab dark color="grey" @click="range=0;copy()">
            <!-- <v-icon>mdi-content-copy</v-icon> -->
            ALL
          </v-btn>
          <v-btn fab dark color="grey" @click="range=5;copy()">TOP 5</v-btn>
          <v-btn fab dark color="grey" @click="range=10;copy()">TOP 10</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["sorted"],
  data: () => ({ dialog: false, range: 0 }),
  created: function() {
    if (!this.$props.sorted) {
      this.$router.push({ name: "home" });
    }
    // this.$store.dispatch("init");
  },
  methods: {
    resultString: function() {
      let string = "";
      const result = this.$store.state.result;
      let length;
      if (this.range === 0) {
        length = result.length;
      } else {
        length = this.range;
      }

      for (let i = 0; i < length; i++) {
        string += `${i + 1} ${result[i].name}\n`;
      }
      return string;
    },
    copy: async function() {
      await setTimeout(function() {}, 100);
      const copyText = document.getElementById("result-string");
      if (copyText) {
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");
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
