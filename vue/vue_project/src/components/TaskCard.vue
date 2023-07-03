<template>
    <div class="task-card">
      <input type="checkbox" :checked="task.completed" @change="toggleCompleted" :disabled="disableCheckbox">
      <div class="task-card-text">{{ task.content }}</div>
      <div v-if="showUserInfo">
        <div>{{ task.user.name }}</div>
        <button v-if="isFollowing" @click="unfollowUser">Unfollow</button>
        <button v-else @click="followUser">Follow</button>
      </div>
    </div>
  </template>

  <script>
  export default {
    name: 'TaskCard',
    props: {
      task: {
        type: Object,
        required: true,
      },
      disableCheckbox: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      isFollowing() {
        return this.$store.state.followingUsers.some(user => user.id === this.task.user.id);
      },
      showUserInfo() {
        return this.$store.state.user.id !== this.task.user.id;
      }
    },
    methods: {
        toggleCompleted() {
          this.$emit('toggle-completed', this.task);
        },
        followUser() {
          this.$store.dispatch('followUser', this.task.user.id);
        },
        unfollowUser() {
          this.$store.dispatch('unfollowUser', this.task.user.id);
        },
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
