<template>
    <div class="Home">
      <navbar></navbar> 
      <h1 class="title">Home</h1>
    </div>
  </template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'OldVueHome',
  components: {
    Navbar,
  },
}
</script>
  
  <style lang="scss" scoped>
  .title {
    margin-left: 40px;
  }
  </style>
  