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
      <Card
        cardTitle="Card Title"
        cardDetails="This is a test card."
        cardHandler={cardHandler}
      />
    </div>
  )
}

export default HomePage
