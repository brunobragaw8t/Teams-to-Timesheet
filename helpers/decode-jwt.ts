export function decodeJWT(token: string): Record<string, unknown> | null {
  try {
    function base64UrlDecode(str: string): string {
      const base64 = str.replace(/-/g, '+').replace(/_/g, '/')
      return decodeURIComponent(atob(base64).split('').map(c =>
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2),
      ).join(''))
    }

    const [header, payload, signature] = token.split('.')

    if (!header || !payload || !signature) {
      return null
    }

    const decodedPayload = base64UrlDecode(payload)

    return JSON.parse(decodedPayload)
  }
  catch (error) {
    console.error('Failed to decode JWT', error)
    return null
  }
}
