<template>
    <div class="Index">
      <navbar></navbar> 
      <h1 class="title">Index</h1>
      <div>Search: <input v-model="searchQuery" type="text"></div>
      <div>
       <input type="radio" value="all" v-model="filter">
       <label for="all">all</label>
       <input type="radio" value="done" v-model="filter">
       <label for="done">done</label>
       <input type="radio" value="yet" v-model="filter">
       <label for="yet">yet</label>
       <div>Counts: {{ todoCounts[filter] }}</div>
      </div>
      <ul class="todo-list">
        <li class="todo-item" v-for="(todo, index) in filteredTodos" :key="index">
        <input type="checkbox" v-model="todo.completed">
        {{ todo.title }}
        </li>
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
  data() {
    return {
        searchQuery: '',
        filter: 'all',
    };
  },
  computed: {
    filteredTodos() {
        switch (this.filter) {
            case 'done':
                return this.allTodos.filter(todo => todo.completed);
            case 'yet':
                return this.allTodos.filter(todo => !todo.completed);
            default:
                return this.allTodos;
        }
    },
    allTodos() {
      return this.$store.getters.allTodos;
    },
    todoCounts() {
        return {
            all: this.allTodos.length,
            done: this.allTodos.filter(todo => todo.completed).length,
            yet: this.allTodos.filter(todo => !todo.completed).length,
        }
    },
  },
  created() {
    this.$store.dispatch('loadTodos');
  },
};
</script>
  
<style lang="scss" scoped>
.Index {
    padding: 10px;
}
ul {
  list-style: none;
}

.todo-list {
    max-height: 500px;
    overflow-y: auto;
    border: 1px solid #ccc;
    border-width: 1px 0;
    padding: 20px;
}

.todo-item {
    width: 50%;
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
    overflow-wrap: break-word;
}

</style>
  