<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const auth = useAuth()

const user = auth.user
</script>

<template>
  <div>
    <h1>Index</h1>

    <h2 v-if="user">
      Welcome, {{ user.name }}
    </h2>

    <button @click="auth.logout()">
      Click to logout
    </button>
  </div>
</template>
