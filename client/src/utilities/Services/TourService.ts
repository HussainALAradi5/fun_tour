import ApiCallerService from "./ApiCallerService"

const TourApiService = {
  getAllTours: async () => {
    return await ApiCallerService.get("/tours")
  },

  getTourById: async (id: number) => {
    return await ApiCallerService.get(`/tours/${id}`)
  },

  createTour: async (tourData: any) => {
    return await ApiCallerService.post("/tours", tourData)
  },

  updateTour: async (id: number, tourData: any) => {
    return await ApiCallerService.put(`/tours/${id}`, tourData)
  },
}

export default TourApiService
