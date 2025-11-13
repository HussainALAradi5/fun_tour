import { useNavigate, useLocation } from "react-router-dom"
import AuthService from "../utilities/Services/AuthServices"

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const isLoggedIn = AuthService.isLoggedIn()

  const homePageHandler = () => navigate("/")
  const profilePageHandler = () => navigate("/profile")
  const loginHandler = () => navigate("/login")
  const registerHandler = () => navigate("/register")
  const logoutHandler = () => {
    localStorage.removeItem("user")
    navigate("/")
  }

  const buttonClass =
    "px-4 py-2 rounded-md text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-300 transition-all duration-200"

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1
            className="text-xl font-bold text-gray-800 dark:text-white cursor-pointer"
            onClick={homePageHandler}
          >
            Tour System
          </h1>

          <nav className="flex space-x-4">
            {location.pathname !== "/" && (
              <button className={buttonClass} onClick={homePageHandler}>
                Home
              </button>
            )}

            {isLoggedIn ? (
              <>
                {location.pathname !== "/profile" && (
                  <button className={buttonClass} onClick={profilePageHandler}>
                    Profile
                  </button>
                )}
                <button className={buttonClass} onClick={logoutHandler}>
                  Logout
                </button>
              </>
            ) : (
              <>
                {location.pathname !== "/login" && (
                  <button className={buttonClass} onClick={loginHandler}>
                    Login
                  </button>
                )}
                {location.pathname !== "/register" && (
                  <button className={buttonClass} onClick={registerHandler}>
                    Register
                  </button>
                )}
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
