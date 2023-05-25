<template>
  <div class="todo">
    <h1>TodoList</h1>
    <div class="input-section">
      <input v-model="newTodo" type="text" placeholder="Enter new task">
      <button @click="addTodo">add</button>
    </div>

    <ul>
      <li v-for="(todo, index) in todos" :key="index">
        <span>{{ todo }}</span>
        <button @click="deleteTodo(index)">delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todos: [],
      newTodo: ''
    };
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim() !== '') {
        if (!this.todos.includes(this.newTodo)) {
          this.todos.push(this.newTodo)
        } else {
          alert('The same task already exists')
        }
        this.newTodo = '';
      }
    },
    deleteTodo(index) {
      this.todos.splice(index, 1);
    }
  }
}
</script>

<style lang="scss" scoped>
.todo {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}

.input-section {
  display: flex;
  gap: 8px;
}

</style>