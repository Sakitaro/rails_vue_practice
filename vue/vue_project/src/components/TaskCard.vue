<template>
    <div class="task-card">
      <input type="checkbox" :checked="task.completed" @change="toggleCompleted">
      <div class="task-card-text">{{ task.content }}</div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TaskCard',
    components: {},
    // ここの表現気になる
    props: {
      task: {
        type: Object,
        required: true,
      },
    },
    methods: {
        toggleCompleted() {
            this.$emit('toggle-completed', this.task);
        }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .task-card {
    position: relative;
    width: 300px;
    height: min-content;
    min-height: 100px;
    background-color: white;
    padding: 24px;
    box-sizing: border-box;
    border: 1px solid #eee;
    border-radius: 8px;
    box-shadow: 2px 2px 4px #bbb;
    cursor: pointer;
  
    // ここの表現気になる
    &-text {
      font-size: 16px;
      font-weight: bold;
      user-select: none;
    }
  
    &:hover {
      right: 4px;
      bottom: 4px;
    }
  }
  </style>
  