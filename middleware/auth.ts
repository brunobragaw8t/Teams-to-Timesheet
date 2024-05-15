export default defineNuxtRouteMiddleware((to, _) => {
  const { user } = useAuth()

  if (to.path === '/login' && user.value) {
    return navigateTo('/')
  }

  if (to.path !== '/login' && !user.value) {
    return navigateTo('/login')
  }
})
