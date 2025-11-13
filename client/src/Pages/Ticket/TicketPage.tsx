import { useEffect, useState } from "react"
import TicketApiService from "../../utilities/Services/TicketService"
import TicketCard from "../../Components/Ticket/TicketCard"

const TicketPage = () => {
  const [tickets, setTickets] = useState<any[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    TicketApiService.getAllTickets()
      .then(setTickets)
      .catch(() => setErrorMessage("Failed to load tickets."))
  }, [])

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-10 text-gray-800 dark:text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">All Tickets</h1>

        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tickets.map((ticket) => (
            <TicketCard key={ticket.ticketId} ticket={ticket} />
          ))}
        </div>
      </div>
    </main>
  )
}

export default TicketPage
