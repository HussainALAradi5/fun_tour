import { Link } from "react-router-dom"

const TourCard = ({ tour }: { tour: any }) => {
  return (
    <Link
      to={`/tours/${tour.tourId}`}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
    >
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
        {tour.tourName}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        {tour.startDate} → {tour.endDate}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Capacity: {tour.capacity}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Price: ${tour.basePrice}
      </p>
    </Link>
  )
}

export default TourCard
