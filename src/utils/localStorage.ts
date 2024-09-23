export const setTokens = (access: string, refresh: string) => {
  localStorage.setItem('access', access)
  localStorage.setItem('refresh', refresh)
}
export const setToken = (name: string, value: string) => {
  localStorage.setItem(`${name}`, `${value}`)
}
export const getTokens = () => {
  const access = localStorage.getItem('access')
  const refresh = localStorage.getItem('refresh')
  return { access, refresh }
}
export const clearTokens = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('refreshToken')
}
export const getToken = (name: string) => {
  return localStorage.getItem(name)
}
