<template>
    <div>
      <h1>Sign In</h1>
      <form @submit.prevent="onSubmit">
        <input v-model="credentials.emailOrName" type="text" placeholder="Email or Username">
        <input v-model="credentials.password" type="password" placeholder="Password">
        <button type="submit">Login</button>
        <p v-if="userError">{{ userError }}</p>
      </form>
      <div>
        <router-link :to="{ name: 'RailsVue'}">return</router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        credentials: {
          emailOrName: '',
          password: ''
        }
      };
    },
    computed: {
      userError() {
        return this.$store.getters.userError;
      }
    },
    methods: {
      onSubmit() {
        console.log(this.credentials);
        this.$store.dispatch('signIn', {credentials: this.credentials});
      }
    }
  };
  </script>
  