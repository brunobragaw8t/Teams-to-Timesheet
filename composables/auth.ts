import { z } from 'zod'

export const userSchema = z.object({
  name: z.string(),
  accessToken: z.string(),
  refreshToken: z.string(),
})

export type User = z.infer<typeof userSchema>

export const useAuth = () => {
  const user = useState<User | null>('user', () => null)

  function login(u: User) {
    user.value = u
    localStorage.setItem('user', JSON.stringify(u))
    navigateTo('/')
  }

  function logout() {
    user.value = null
    localStorage.removeItem('user')
    navigateTo('/login')
  }

  return { user, login, logout }
}
