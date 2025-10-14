import ApiCallerService from "./ApiCallerService"

const AuthService = {
  register: async (userData: any) => {
    return await ApiCallerService.post("/users/register", userData)
  },

  login: async (credentials: { identifier: string; password: string }) => {
    return await ApiCallerService.post("/users/login", credentials)
  },
  isLoggedIn: (): boolean => {
    return !!localStorage.getItem("user")
  },
}

export default AuthService
