export const useAuth = () => {
  const user = useState<{ name: string } | null>('user', () => null)

  function login() {
    user.value = { name: 'John Doe' }
  }

  function logout() {
    user.value = null
  }

  return { user, login, logout }
}
