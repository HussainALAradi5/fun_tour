import { useEffect, useState } from "react"
import TourApiService from "../utilities/Services/TourService"
import TourPlaceHolderCard from "../Components/Tour/TourPlaceHolderCard"
import TourCard from "../Components/Tour/TourCard"

const HomePage = () => {
  const [tours, setTours] = useState<any[]>([])

  useEffect(() => {
    TourApiService.getAllTours()
      .then(setTours)
      .catch(() => setTours([]))
  }, [])

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Welcome to Tour System
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tours.length > 0
            ? tours
                .slice(0, 3)
                .map((tour) => <TourCard key={tour.tourId} tour={tour} />)
            : [1, 2, 3].map((i) => (
                <TourPlaceHolderCard key={`placeholder-${i}`} />
              ))}
        </div>
      </div>
    </main>
  )
}

export default HomePage
