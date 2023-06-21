<template>
    <div class="my-page">
    <div @click="signOut">Sing Out</div>
      <div class="title">My Page</div>
      <div class="add-tasks-form">
        <input class="input-add-tasks-content" type="text" v-model="inputText">
        <div class="add-button" @click="addTasks">add</div>
      </div>
      <div class="task-cards">
        <TaskCard
          v-for="(task, index) in tasks"
          :key="index"
          :task="task"
          @toggle-completed="toggleCompleted"
        />
      </div>
    </div>
  </template>
  
  <script>
  import TaskCard from '@/components/TaskCard'
  
  export default {
    name: 'MyPage',
    components: {
      TaskCard,
    },
    data() {
      return {
        tasks: [],
        inputText: '',
      };
    },
    created() {
      this.loadTasks();
    },
    methods: {
      async loadTasks() {
        this.tasks =  await this.$store.dispatch('loadTasks');
      },
      async addTasks() {
        if (!this.inputText) {
        return window.alert('Please enter your task');
        }
        await this.$store.dispatch('addTask', { content: this.inputText });
        this.inputText = '';
      },
      async signOut() {
        this.$store.dispatch('signOut');
      },
      async toggleCompleted(task) {
        await this.$store.dispatch('toggleTaskCompleted', task);
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .my-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 36px;
    min-height: 100vh;
    padding: 36px;
    box-sizing: border-box;
  
    .title {
      font-size: 36px;
      font-weight: bold;
    }
  
    .add-tasks-form {
      display: flex;
      gap: 36px;
      align-items: center;
  
      .input-add-tasks-content {
        height: 36px;
        width: 300px;
        font-size: 16px;
        padding: 0 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
      }
  
      .add-button {
        height: 40px;
        width: 64px;
        border-radius: 4px;
        line-height: 40px;
        text-align: center;
        background-color: #5af;
        color: white;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        user-select: none;
  
        &:hover {
          background-color: #7cf;
        }
      }
    }
  
    .task-cards {
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
      width: 1000px;
    }
  }
  </style>
  