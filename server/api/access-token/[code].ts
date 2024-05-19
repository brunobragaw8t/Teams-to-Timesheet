import { useRequestURL } from 'nuxt/app'
import { z } from 'zod'

const routerParamsSchema = z.object({
  code: z.string(),
})

const tokensSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
})

export default defineEventHandler(async (event) => {
  let code: string

  try {
    const params = await getValidatedRouterParams(event, routerParamsSchema.parse)
    code = params.code
  }
  catch {
    throw createError({
      statusCode: 400,
      statusMessage: 'Authorization code must be a string',
    })
  }

  const cfg = useRuntimeConfig()
  const url = useRequestURL()

  const res = await $fetch(`https://login.microsoftonline.com/${cfg.public.tenant}/oauth2/v2.0/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: cfg.public.clientId,
      scope: 'offline_access user.read mail.read',
      code: code,
      redirect_uri: `${url.protocol}//${url.host}/login`,
      grant_type: 'authorization_code',
      client_secret: cfg.clientSecret,
    }),
  })

  let tokens: z.infer<typeof tokensSchema>

  try {
    tokens = tokensSchema.parse(res)
  }
  catch {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid response from Microsoft Graph API',
    })
  }

  return {
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
  }
})
