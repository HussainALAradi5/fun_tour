import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_BASE_URL

const ApiCallerService = {
  post: async (endpoint: string, data: any) => {
    try {
      const response = await axios.post(`${BASE_URL}${endpoint}`, data)
      return response.data
    } catch (error: any) {
      throw error.response?.data || "Server error"
    }
  },

  get: async (endpoint: string) => {
    try {
      const response = await axios.get(`${BASE_URL}${endpoint}`)
      return response.data
    } catch (error: any) {
      throw error.response?.data || "Server error"
    }
  },

  put: async (endpoint: string, data: any) => {
    try {
      const response = await axios.put(`${BASE_URL}${endpoint}`, data)
      return response.data
    } catch (error: any) {
      throw error.response?.data || "Server error"
    }
  },
}

export default ApiCallerService
