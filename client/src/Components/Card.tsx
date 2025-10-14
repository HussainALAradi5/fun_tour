import "../styles/card.css"

type CardProps = {
  cardTitle: string
  cardDetails: string
  cardHandler: () => void
  className?: string
}

const Card = ({
  cardTitle,
  cardDetails,
  cardHandler,
  className = "",
}: CardProps) => {
  return (
    <div className={`card-container ${className}`} onClick={cardHandler}>
      <h1 className="card-title">{cardTitle}</h1>
      <p className="card-details">{cardDetails}</p>
    </div>
  )
}

export default Card
