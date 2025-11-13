import { Link } from "react-router-dom"

const TicketCard = ({ ticket }: { ticket: any }) => {
  return (
    <Link
      to={`/tickets/${ticket.ticketId}`}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
    >
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
        Ticket #{ticket.ticketId}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Type: {ticket.type}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Price: ${ticket.price}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Tour: {ticket.tour?.tourName || "N/A"}
      </p>
    </Link>
  )
}

export default TicketCard
