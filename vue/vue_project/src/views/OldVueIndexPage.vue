<template>
    <div class="Index">
      <navbar></navbar> 
      <h1 class="title">Index</h1>
      <ul>
        <li v-for="(todo, index) in allTodos" :key="index">{{ todo.title }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  import Navbar from '@/components/Navbar.vue';
  
  export default {
  name: 'OldVueIndex',
  components: {
    Navbar,
  },
  computed: {
    allTodos() {
      return this.$store.getters.allTodos;
    },
  },
  created() {
    this.$store.dispatch('loadTodos');
  },
};
  </script>
  
  <style lang="scss" scoped>
  .title {
    margin-left: 40px;
  }
  </style>
  