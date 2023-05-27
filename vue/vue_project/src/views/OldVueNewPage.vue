<template>
    <div class="New">
      <navbar></navbar> 
      <h1 class="title">New</h1>
      <div>
        <input v-model="newTodo" type="text" placeholder="Enter new task">
        <button @click="addTodo">Add</button>
      </div>
    </div>
  </template>
  
  <script>
  import Navbar from '@/components/Navbar.vue';
  
  export default {
    name: 'OldVueNew',
    components: {
      Navbar,
    },
    data() {
      return {
        newTodo: '',
      };
    },
    methods: {
        addTodo() {
            if (this.newTodo.trim() !== '') {
                this.$store.dispatch('addTodo', this.newTodo).then(() => {
                this.newTodo = '';
                this.$store.dispatch('loadTodos').then(() => {
                    this.$router.push('/oldtodo/index');
                });
                });
            }
        },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .title {
    margin-left: 40px;
  }
  </style>
  