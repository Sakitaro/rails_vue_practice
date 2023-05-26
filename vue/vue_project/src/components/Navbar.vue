<template>
    <ul class="links">
      <li>
        <router-link :to="{ name: 'OldVueHome' }">Home</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'OldVueIndex' }">Index</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'OldVueNew'}">New</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'TopPage'}">Top Page</router-link>
      </li>
    </ul>
  </template>
  
  <style lang="scss" scoped>
  .links {
    display: flex;
    list-style: none;
  }
  
  .links li {
    margin-right: 10px;
  }
  </style>
  