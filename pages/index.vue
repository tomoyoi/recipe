<template>
  <v-container class="text-center">
    <h1>レシピコレクション</h1>
    <img
    height=200
    width=250
    class="mt-5"
    src="@/assets/images/food.jpg">
    <v-row wrap justify="center" align="center">
      <v-col :sm="12" :md="8">
          <template>
            <v-app>
              {{ this.results }}
              <v-container v-cloak @drop.prevent="addDropFile" @dragover.prevent>
                <v-file-input
                  v-model="file"
                  @change="setImage"
                  @click:clear="clearCanvas"
                  accept="image/png, image/jpeg, image/bmp"
                  prepend-icon="mdi-camera"
                  placeholder="画像をドラッグ＆ドロップか選択してください"
                ></v-file-input>
                <v-btn
                  class="my-2"
                  color="#389382"
                  :disabled="!file"
                  block
                  @click="detectHandWriting(file)"
                >手書き文字をデジタルに変換！</v-btn>
                <v-row justify="center" align="center">
                  <canvas width="500" height="500" ref="preview"></canvas>
                </v-row>
              </v-container>
            </v-app>
          </template>
        <div class="pa-5">
          <v-btn
            block
            outlined
            color="grey darken-3"
            @click="signOut"
          >
            ログアウト
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import detectHandWriting from "../libs/visionApi";
export default {
  data: function () {
    return {
      file: [],
      results: null,
    };
  },
  methods: {
    addDropFile(e) {
      this.file = e.dataTransfer.files[0];
      this.setImage();
    },
    setImage() {
      if (this.file && this.file.type.startsWith("image/")) {
        const url = window.URL.createObjectURL(this.file);
        const img = new window.Image();
        img.src = url;
        img.onload = () => {
          const canvas = this.$refs.preview;
          const context = canvas.getContext("2d");
          if (img.width > canvas.width) {
            const scale = canvas.width / img.width;
            const sw = img.width;
            const sh = img.height;
            const dw = img.width * scale;
            const dh = img.height * scale;
            canvas.width = dw;
            canvas.height = dh;
            context.drawImage(img, 0, 0, sw, sh, 0, 0, dw, dh);
          } else {
            context.drawImage(img, 0, 0);
          }
        };
      }
    },
    clearCanvas() {
      const canvas = this.$refs.preview;
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
    },
    detectHandWriting: async function() {
      try {
        const data = await detectHandWriting(this.file);
        if (data && data.responses) {
          const fullTextAnnotation = data.responses[0].fullTextAnnotation;
          const boundingPolies = [];
          boundingPolies.push(fullTextAnnotation.text);
          this.results = fullTextAnnotation.text;
        }
      } catch (error) {
        console.log(error);
      }
    },
    signOut: function(err) {
      this.$store
        .dispatch('signOut')
        .then(() => {
          this.$router.push({
            name: 'login'
          })
        })
        .catch((err) => {
          alert(err.message)
        })
    }
  }
}
</script>