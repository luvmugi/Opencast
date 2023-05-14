<template>
  <div class="defaltTitle"><span class="titleText">xxx煤矿三维态势感知</span></div>
  <!-- <div id="nav">
    <router-link to="/">1</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
  <Menu @changeMenu="changeMenu"></Menu>
  <router-view />
</template>
<script>
import Menu from '@/components/Menu.vue'
import { useMenuStore } from '@/store/useMenuStore'
export default {
  components: {
    Menu
  },
  created() {
    // let userStore = useMenuStore();
    // userStore.loadingInstance1 = this.$loading({ fullscreen: true, text: '加载中...' })
  },
  methods: {
    changeMenu(menu) {
      const userStore = useMenuStore()
      userStore.setSelectedMenu(menu)
      console.log(menu);
    }

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;

}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
