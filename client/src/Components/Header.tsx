import { useNavigate, useLocation } from "react-router-dom"
import "../styles/header.css"
import HeaderButton from "./HeaderButton"

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const homePageHandler = () => {
    navigate("/")
  }

  const profilePageHandler = () => {
    navigate("/profile")
  }

  return (
    <div className="header">
      {location.pathname !== "/" && (
        <HeaderButton buttonTitle="Home" buttonHandler={homePageHandler} />
      )}
      {location.pathname !== "/profile" && (
        <HeaderButton
          buttonTitle="Profile"
          buttonHandler={profilePageHandler}
        />
      )}
    </div>
  )
}

export default Header
