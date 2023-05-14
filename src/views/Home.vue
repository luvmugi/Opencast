<template>
  <router-view></router-view>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home',
  mounted() {
    console.log(process.env.VUE_APP_BASE_API)
  },
}
</script>
<style scoped>
@import url('../assets/css/global.scss');
</style>