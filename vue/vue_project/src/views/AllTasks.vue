<template>
    <div class="all-tasks-page">
     <div class="title">All Tasks</div>
     <div>
      <router-link :to="{ name: 'MyPage' }">MyPage</router-link>
    </div>
     <div class="task-cards">
        <TaskCard
          v-for="(task, index) in allTasks"
          :key="index"
          :task="task"
          @toggle-completed="toggleCompleted"
          :disableCheckbox="true"
        />
      </div>
    </div>
</template>

<script>
  import TaskCard from '@/components/TaskCard'

  export default {
    name: 'AllTasksPage',
    components: {
      TaskCard,
    },
    data() {
      return {
        allTasks: [],
        inputText: '',
      };
    },
    created() {
      this.loadAllTasks();
    },
    computed: {
      currentUser() {
        return this.$store.state.user;
      },
    },
    methods: {
      async loadAllTasks() {
        this.allTasks =  await this.$store.dispatch('loadAllTasks');
      },
      async toggleCompleted(task) {
        await this.$store.dispatch('toggleTaskCompleted', task);
      }
    }
  }
  </script>

  <style lang="scss" scoped>

.all-tasks-page {
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
    .task-cards {
        display: flex;
        gap: 24px;
        flex-wrap: wrap;
        width: 1000px;
      }
}
  </style>
