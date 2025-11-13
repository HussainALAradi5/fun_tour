import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import TicketApiService from "../../utilities/Services/TicketService"

const TicketDetails = () => {
  const { id } = useParams()
  const [ticket, setTicket] = useState<any>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    TicketApiService.getTicketById(Number(id))
      .then(setTicket)
      .catch(() => setErrorMessage("Failed to load ticket details."))
  }, [id])

  if (errorMessage) {
    return <div className="p-6 text-red-500">{errorMessage}</div>
  }

  if (!ticket) {
    return <div className="p-6 text-gray-500">Loading ticket details...</div>
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-10 text-gray-800 dark:text-white">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Ticket #{ticket.ticketId}</h1>
        <p className="mb-2">Type: {ticket.type}</p>
        <p className="mb-2">Price: ${ticket.price}</p>
        <p className="mb-2">Tour: {ticket.tour?.tourName || "N/A"}</p>
        <p className="mb-2">
          Reservation ID: {ticket.reservation?.reservationId || "N/A"}
        </p>
      </div>
    </main>
  )
}

export default TicketDetails
