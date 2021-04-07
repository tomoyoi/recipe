<template>
  <v-container>
    <h1>Recipe collection</h1>
    <img
    height=200
    width=250
    class="mt-5"
    src="@/assets/images/food.jpg">
    <v-row wrap justify="center" align="center">
      <v-col :sm="12" :md="8">
        <p class="text-center">ログインユーザのみ閲覧可能なコンテンツ</p>
          <template>
            <v-app>
              <v-container v-cloak @drop.prevent="addDropFile" @dragover.prevent>
                <v-file-input
                  v-model="file"
                  accept="image/png, image/jpeg, image/bmp"
                  prepend-icon="mdi-camera"
                  placeholder="画像をドラッグ＆ドロップか選択してください。"
                ></v-file-input>
              </v-container>
            </v-app>
          </template>
        <div class="pa-5">
          <v-btn
            block
            color="indigo darken-1"
            nuxt
            to="/sample"
            class="white--text"
          >
            サンプルページへ
          </v-btn>
        </div>
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
export default {
  data: function () {
    return {
      file: [],
    };
  },
  methods: {
    addDropFile(e) {
      this.file = e.dataTransfer.files[0];
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