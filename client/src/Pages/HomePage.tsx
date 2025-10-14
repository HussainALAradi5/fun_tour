import Card from "../Components/Card"
import Header from "../Components/Header"

import "../styles/home.css"
const HomePage = () => {
  const cardHandler = () => {
    console.log("Card clicked!")
  }

  return (
    <div className="home-page-container">
      <Header />
      <div className="home-page-cards-contaier">
        <Card
          cardTitle="Tour"
          cardDetails="this tour will take you to bahrain and gulf, have a nice and safe travel."
          cardHandler={cardHandler}
        />
      </div>
    </div>
  )
}

export default HomePage
