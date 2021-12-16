<template>
  <div id="app">
    {{this.$route.meta.layout}}
       <component :is="layout">
            <router-view/>
       </component>
    
  </div>
</template>

<script>
import MainLayout from "@/layouts/MainLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
export default {
  name: 'App', 
  components: {
    MainLayout, AuthLayout
  },
  computed:{
    layout(){
      return this.$route.meta?.layout || 'main-layout'
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  padding: 40px;
}
</style>
