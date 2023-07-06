<template>
    <div class="all-tasks-page">
     <div class="title">All Tasks</div>
     <div>
      <router-link :to="{ name: 'MyPage' }">MyPage</router-link>
    </div>
    <button @click="taskFilter = 'all'">Show All</button>
    <button @click="taskFilter = 'following'">Show Following</button>
    <button @click="taskFilter = 'like'">Show Likes</button>
     <div class="task-cards">
      <!-- ここでTaskCardにpropを渡している -->
        <TaskCard
          v-for="(task, index) in filteredTasks"
          :key="index"
          :task="task"
          @update-task="updateTask"
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
        taskFilter: 'all',
      };
    },
    created() {
      this.loadAllTasks();
    },
    computed: {
      currentUser() {
        return this.$store.state.user;
      },
      filteredTasks() {
        if (this.taskFilter === 'following') {
          return this.allTasks.filter(task => this.$store.getters.followingUsers.some(user => user.id === task.user.id));
        } else if (this.taskFilter === 'like') {
          return this.allTasks.filter(task => this.$store.getters.likes.some(like => like.task_id === task.id))
        }
        return this.allTasks;
      },
    },
    methods: {
      async loadAllTasks() {
        this.allTasks =  await this.$store.dispatch('loadAllTasks');
      },
      async toggleCompleted(task) {
        await this.$store.dispatch('toggleTaskCompleted', task);
      },
      updateTask(updatedTask) {
        const index = this.allTasks.findIndex(t => t.id === updatedTask.id);
        if (index > -1) {
          this.$set(this.allTasks, index, updatedTask);
       }
      },
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
