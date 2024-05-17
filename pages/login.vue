<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

function authorize() {
  const { tenant, clientId } = useRuntimeConfig().public

  const url = new URL(`https://login.microsoftonline.com/${tenant}/oauth2/v2.0/authorize`)
  url.searchParams.append('client_id', clientId)
  url.searchParams.append('response_type', 'code')
  url.searchParams.append('redirect_uri', 'http://localhost:3000/login')
  url.searchParams.append('response_mode', 'query')
  url.searchParams.append('scope', 'offline_access user.read mail.read')

  window.location.href = url.toString()
}
</script>

<template>
  <div>
    <h1>Login</h1>
    <button @click="authorize">
      Click to login
    </button>
  </div>
</template>
