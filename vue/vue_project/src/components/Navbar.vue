<template>
    <div class="links">
      <div>
        <router-link :to="{ name: 'OldVueHome' }">Home</router-link>
      </div>
      <div>
        <router-link :to="{ name: 'OldVueIndex' }">Index</router-link>
      </div>
      <div>
        <router-link :to="{ name: 'OldVueNew'}">New</router-link>
      </div>
      <div>
        <router-link :to="{ name: 'TopPage'}">Top Page</router-link>
      </div>
    </div>
  </template>
  
  <style lang="scss" scoped>
.links {
    display: flex;
}
  
.links div {
    margin-right: 10px;
}
  </style>
  