import './Card.css'

export default function Card({ card, handleChoice }) {

  const handleClick = () => {
    handleChoice(card)
  }

  return (
    <div className="card">
    <div>
      <img className="front" src={card.src} alt="menu item" />
      <img 
      className="back" 
      src="/assets/backOfCard.png" 
      alt="back of card" 
      onClick={handleClick}
      />
    </div>
  </div>
  )
}
