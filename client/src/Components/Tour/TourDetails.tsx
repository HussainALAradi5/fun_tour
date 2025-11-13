import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import TourApiService from "../../utilities/Services/TourService"

const TourDetails = () => {
  const { id } = useParams()
  const [tour, setTour] = useState<any>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    TourApiService.getTourById(Number(id))
      .then((res) => setTour(res))
      .catch(() => setErrorMessage("Failed to load tour details."))
  }, [id])

  if (errorMessage) {
    return <div className="p-6 text-red-500">{errorMessage}</div>
  }

  if (!tour) {
    return <div className="p-6 text-gray-500">Loading tour details...</div>
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-10 text-gray-800 dark:text-white">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4">{tour.tourName}</h1>
        <p className="mb-2">Start: {tour.startDate}</p>
        <p className="mb-2">End: {tour.endDate}</p>
        <p className="mb-2">Capacity: {tour.capacity}</p>
        <p className="mb-2">Base Price: ${tour.basePrice}</p>
      </div>
    </main>
  )
}

export default TourDetails
