<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const user = useAuth().user
</script>

<template>
  <div>
    <h1>Index</h1>

    <h2 v-if="user">
      Welcome, {{ user.name }}
    </h2>
  </div>
</template>
