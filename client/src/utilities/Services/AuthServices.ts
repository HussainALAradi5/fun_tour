import ApiCallerService from "./ApiCallerService"

const setJwt = (token: string, user: any) => {
  localStorage.setItem("token", token)
  localStorage.setItem("user", JSON.stringify(user))
}

const getJwt = () => {
  const token = localStorage.getItem("token")
  const userRaw = localStorage.getItem("user")


  let user = null
  try {
    user = userRaw && userRaw !== "undefined" ? JSON.parse(userRaw) : null
  } catch (err) {
    localStorage.removeItem("user")
  }

  return { token, user }
}

const clearJwt = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
}

const AuthService = {
  login: async (credentials: { identifier: string; password: string }) => {
    const response = await ApiCallerService.post("/users/login", credentials)
    const { token, user } = response
    setJwt(token, user)
    return user
  },

  register: async (userData: any) => {
    const response = await ApiCallerService.post("/users/register", userData)
    const { token, user } = response
    setJwt(token, user)
    return user
  },

  logout: () => {
    clearJwt()
  },

  isLoggedIn: (): boolean => {
    return !!getJwt().token
  },

  getCurrentUser: () => {
    return getJwt().user
  },

  getToken: () => {
    return getJwt().token
  },
}

export default AuthService
