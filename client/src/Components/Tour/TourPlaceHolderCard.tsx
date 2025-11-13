const TourPlaceHolderCard = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center justify-center text-center">
    <div className="text-4xl mb-2">🗺️</div>
    <h3 className="text-xl font-semibold mb-2">No tours available</h3>
    <p className="text-sm text-gray-600 dark:text-gray-300">
      Check back soon or contact us to suggest a destination!
    </p>
  </div>
)

export default TourPlaceHolderCard
