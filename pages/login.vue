<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <div>
    <h1>Login</h1>
    <button>Click to login</button>
  </div>
</template>
