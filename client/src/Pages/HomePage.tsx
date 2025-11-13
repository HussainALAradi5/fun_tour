const HomePage = () => {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Welcome to Tour System
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">Explore Destinations</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Discover amazing places to visit and plan your next adventure.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default HomePage
