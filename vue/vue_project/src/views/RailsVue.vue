<template>
    <div class="rails-vue-page">
      <div>
        <router-link :to="{ name: 'SignIn' }">Sign In</router-link>
      </div>
      <div>
        <router-link :to="{ name: 'SignUp' }">Sign Up</router-link>
      </div>
      <div>
        <router-link :to="{ name: 'TopPage'}">TopPageに戻る</router-link>
      </div>
    </div>
  </template>