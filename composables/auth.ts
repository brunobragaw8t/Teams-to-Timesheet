import { z } from 'zod'

const userSchema = z.object({
  name: z.string(),
  accessToken: z.string(),
  refreshToken: z.string(),
})

type User = z.infer<typeof userSchema>

export const useAuth = () => {
  const user = useState<User | null>('user', () => null)

  function login(u: User) {
    user.value = u
  }

  function logout() {
    user.value = null
  }

  return { user, login, logout }
}
