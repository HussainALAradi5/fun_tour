import ApiCallerService from "./ApiCallerService"

const TicketApiService = {
  getAllTickets: async () => {
    return await ApiCallerService.get("/tickets")
  },

  getTicketById: async (id: number) => {
    return await ApiCallerService.get(`/tickets/${id}`)
  },

  createTicket: async (ticketData: any) => {
    return await ApiCallerService.post("/tickets", ticketData)
  },

  updateTicket: async (id: number, ticketData: any) => {
    return await ApiCallerService.put(`/tickets/${id}`, ticketData)
  },

  deleteTicket: async (id: number) => {
    return await ApiCallerService.delete(`/tickets/${id}`)
  },
}

export default TicketApiService
