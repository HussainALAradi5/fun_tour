import ApiCallerService from "./ApiCallerService"

const UserApiCallerService = {
  getAllUsers: async () => {
    return await ApiCallerService.get("/users")
  },

  getUserById: async (userId: number) => {
    return await ApiCallerService.get(`/users/${userId}`)
  },

  updateUser: async (updatedUser: any) => {
    return await ApiCallerService.put("/users/update", updatedUser)
  },
}

export default UserApiCallerService
