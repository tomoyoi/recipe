<template>
  <div class="container d-block">
    <h1>Recipe collection</h1>
    <img
    height=200
    width=250
    class="mt-5"
    src="@/assets/images/food.jpg">
    <v-btn class="mt-5 button is-primary is-rounded" @click="login">
      ログイン
    </v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      console.log('login')
+     this.$store.dispatch('login')
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: 'Lora', serif;
}
</style>