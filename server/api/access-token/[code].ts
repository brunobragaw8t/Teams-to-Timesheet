export default defineEventHandler(async (event) => {
  console.log('entrou')

  const code = getRouterParam(event, 'code')

  if (!code) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Authorization code is required',
    })
  }

  const cfg = useRuntimeConfig()

  const res = await $fetch(`https://login.microsoftonline.com/${cfg.public.tenant}/oauth2/v2.0/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: cfg.public.clientId,
      scope: 'offline_access user.read mail.read',
      code: code,
      redirect_uri: 'http://localhost:3000/login',
        grant_type: 'authorization_code',
      client_secret: cfg.clientSecret
    })
  })

  return {
    accessToken: res.access_token,
    refreshToken: res.refresh_token,
  }
})
