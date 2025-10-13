import "../styles/card.css"

type CardProps = {
  cardTitle: string
  cardDetails: string
  cardHandler: () => void
}

const Card = ({ cardTitle, cardDetails, cardHandler }: CardProps) => {
  return (
    <div className="card-container" onClick={cardHandler}>
      <h1 className="card-title">{cardTitle}</h1>
      <p className="card-details">{cardDetails}</p>
    </div>
  )
}

export default Card
