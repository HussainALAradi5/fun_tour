import "../styles/header.css"
import HeaderButton from "./HeaderButton"

const Header = () => {
  const homePageHandler = () => {
    console.log("you clicked me!")
  }

  return (
    <div className="header">
      <HeaderButton buttonTitle="home" buttonHandler={homePageHandler} />
    </div>
  )
}

export default Header
