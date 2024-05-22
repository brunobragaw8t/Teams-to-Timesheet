<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const auth = useAuth()

const user = auth.user

const settings = useSettings()
settings.load()

const settingsForm = ref<Settings>(settings.data.value)
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

    <div>
      <label for="cloudId">Cloud ID</label>
      <input v-model="settingsForm.cloudId" id="cloudId" />

      <label for="email">Email</label>
      <input v-model="settingsForm.email" id="email" />

      <label for="apiKey">API Key</label>
      <input v-model="settingsForm.apiKey" id="apiKey" />

      <button @click="settings.save(settingsForm)">
        Save settings
      </button>
    </div>
  </div>
</template>
