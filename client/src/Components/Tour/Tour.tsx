import { useEffect, useState } from "react"
import TourApiService from "../../utilities/Services/TourService"
import TourCard from "./TourCard"
import TourPlaceHolderCard from "./TourPlaceHolderCard"

const TourPage = () => {
  const [tours, setTours] = useState<any[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    TourApiService.getAllTours()
      .then((res) => setTours(res))
      .catch(() => setErrorMessage("Failed to load tours."))
  }, [])

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-10 text-gray-800 dark:text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">All Tours</h1>

        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tours.length > 0 ? (
            tours.map((tour) => <TourCard key={tour.tourId} tour={tour} />)
          ) : (
            <TourPlaceHolderCard />
          )}
        </div>
      </div>
    </main>
  )
}

export default TourPage
