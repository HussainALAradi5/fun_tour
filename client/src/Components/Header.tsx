import "../styles/header.css"
import PrimaryButton from "./PrimaryButton"

const Header = () => {
  const homePageHandler = () => {
    console.log("you clicked me!")
  }

  return (
    <div className="header">
      <PrimaryButton buttonTitle="home" buttonHandler={homePageHandler} />
    </div>
  )
}

export default Header
