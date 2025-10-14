import { useNavigate, useLocation } from "react-router-dom"
import "../styles/header.css"
import HeaderButton from "./HeaderButton"
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

  return (
    <div className="header">
      {location.pathname !== "/" && (
        <HeaderButton buttonTitle="Home" buttonHandler={homePageHandler} />
      )}

      {isLoggedIn ? (
        <>
          {location.pathname !== "/profile" && (
            <HeaderButton
              buttonTitle="Profile"
              buttonHandler={profilePageHandler}
            />
          )}
          <HeaderButton buttonTitle="Logout" buttonHandler={logoutHandler} />
        </>
      ) : (
        <>
          {location.pathname !== "/login" && (
            <HeaderButton buttonTitle="Login" buttonHandler={loginHandler} />
          )}
          {location.pathname !== "/register" && (
            <HeaderButton
              buttonTitle="Register"
              buttonHandler={registerHandler}
            />
          )}
        </>
      )}
    </div>
  )
}

export default Header
