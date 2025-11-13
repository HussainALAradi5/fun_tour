import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_BASE_URL

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

const ApiCallerService = {
  get: async (endpoint: string) => {
    try {
      const response = await api.get(endpoint)
      return response.data
    } catch (error: any) {
      throw error.response?.data || "Server error"
    }
  },

  post: async (endpoint: string, data: any) => {
    try {
      const response = await api.post(endpoint, data)
      return response.data
    } catch (error: any) {
      throw error.response?.data || "Server error"
    }
  },

  put: async (endpoint: string, data: any) => {
    try {
      const response = await api.put(endpoint, data)
      return response.data
    } catch (error: any) {
      throw error.response?.data || "Server error"
    }
  },
  delete: async (endpoint: string) => {
    try {
      const response = await api.delete(endpoint)
      return response.data
    } catch (error: any) {
      throw error.response?.data || "Server error"
    }
  },
}

export default ApiCallerService
