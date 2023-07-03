<template>
    <div>
    <h1>Sign Up</h1>
      <form @submit.prevent="onSubmit">
        <input v-model="userInfo.name" type="text" placeholder="Username">
        <input v-model="userInfo.email" type="text" placeholder="Email">
        <input v-model="userInfo.password" type="password" placeholder="Password">
        <input v-model="userInfo.passwordConfirmation" type="password" placeholder="Confirm Password">
        <button type="submit">Register</button>
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
        userInfo: {
          name: '',
          email: '',
          password: '',
          passwordConfirmation: '',
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
        if (this.userInfo.password !== this.userInfo.passwordConfirmation) {
            this.$store.commit('setUserError', { message: "Passwords do not match" });
            return;
        }
        console.log(this.userInfo);
        this.$store.dispatch('signUp', {userInfo: this.userInfo});
      }
    }
  };
  </script>
