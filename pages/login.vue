<script setup lang="ts">
import { z } from 'zod'
import { decodeJWT } from '~/helpers/decode-jwt'

definePageMeta({
  middleware: 'auth',
})

const auth = useAuth()

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

onMounted(async () => {
  const userLocalStorage = localStorage.getItem('user')

  if (userLocalStorage) {
    let user: User;

    try {
      user = userSchema.parse(JSON.parse(userLocalStorage))
      auth.login(user)
      return
    } catch {}
  }

  const params = new URLSearchParams(window.location.search)
  const code = params.get('code')

  if (!code) {
    return
  }

  const res = await $fetch('/api/access-token/' + code)

  let parsed: { accessToken: string, refreshToken: string }

  try {
    parsed = z.object({
      accessToken: z.string(),
      refreshToken: z.string(),
    }).parse(res)
  }
  catch (err) {
    console.error('Failed to parse response:', err)
    return
  }

  const payload = decodeJWT(parsed.accessToken)

  let userData: { name: string }

  try {
    userData = z.object({
      name: z.string(),
    }).parse(payload)
  }
  catch (err) {
    console.error('Failed to parse user data:', err)
    return
  }

  auth.login({
    accessToken: parsed.accessToken,
    refreshToken: parsed.refreshToken,
    name: userData.name,
  })
})
</script>

<template>
  <div>
    <h1>Login</h1>
    <button @click="authorize">
      Click to login
    </button>
  </div>
</template>
