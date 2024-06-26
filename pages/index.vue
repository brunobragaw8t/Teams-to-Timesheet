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
      <input
        id="cloudId"
        v-model="settingsForm.cloudId"
      >

      <label for="email">Email</label>
      <input
        id="email"
        v-model="settingsForm.email"
      >

      <label for="apiKey">API Key</label>
      <input
        id="apiKey"
        v-model="settingsForm.apiKey"
      >

      <button @click="settings.save(settingsForm)">
        Save settings
      </button>
    </div>

    <MeetingsList />
  </div>
</template>
