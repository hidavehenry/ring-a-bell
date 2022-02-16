import './Card.css'

export default function Card({ card, handleChoice, flipped, disabled }) {

  const handleClick = () => {
    if (!disabled && !flipped) {
      handleChoice(card)
    }
  }

  return (
    <div className="card">
    <div className={flipped ? "flipped" : ""}>
      <img className="front" src={card.src} alt="menu item" />
      <img className="back"  src="/assets/backOfCard.png"  alt="Taco Bell Logo" onClick={handleClick}
      />
    </div>
  </div>
  )
}