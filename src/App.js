import './App.css';
import { useEffect, useState } from 'react'
import Card from './Card'

const cardImages = [
  {"src": "/assets/bajaBlast.png", matched: false },
  {"src": "/assets/beefBurritoSupreme.png", matched: false },
  {"src": "/assets/beefChalupaSupreme.png", matched: false },
  {"src": "/assets/borderSauce.png", matched: false },
  {"src": "/assets/chickenBurritoSupreme.png", matched: false },
  {"src": "/assets/chickenSoftTaco.png", matched: false },
  {"src": "/assets/cinnamonTwists.png", matched: false },
  {"src": "/assets/crunchwrapSupreme.png", matched: false },
  {"src": "/assets/loadedNachoTaco.png", matched: false },
  {"src": "/assets/nachosSupreme.png", matched: false },
  {"src": "/assets/quesalupa.png", matched: false },
  {"src": "/assets/steakQuesadilla.png", matched: false }
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState([])
  const [matches, setMatches] = useState([])
  const [selectedOne, setSelectedOne] = useState(null)
  const [selectedTwo, setSelectedTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)


  // make new array with two sets of cards then shuffle

  const shuffleDeck = () => {
    const shuffledDeck = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
      
      setSelectedOne(null)
      setSelectedTwo(null)
      setCards(shuffledDeck)
      setTurns(0)
      setMatches(0)
    }
    
    // store the selected cards
    const handleChoice = (card) => {
      selectedOne ? setSelectedTwo(card) : setSelectedOne(card)
    }

    // check for match
    useEffect(() => {
      if (selectedOne && selectedTwo) {
        setDisabled(true)
        if (selectedOne.src === selectedTwo.src) {
          setCards(prevCards => {
            return prevCards.map(card => {
              if (card.src === selectedOne.src) {
                return {...card, matched: true}
              } else {
                return card
              }
            })
          })
          resetTurn()
          setMatches(prevMatches => prevMatches +1)
        } else {
          setTimeout(() => resetTurn(), 1200)
        }
      }
    }, [selectedOne, selectedTwo])

    // reset selected cards and increase turn count
    const resetTurn = () => {
      setSelectedOne(null)
      setSelectedTwo(null)
      setTurns(prevTurns => prevTurns + 1)
      setDisabled(false)
    }

    // initiate game upon mount
    useEffect(() => {
      shuffleDeck()
    }, [])

  return (
    <div className="App">
      <div className="header">
        <h1>Ring A Bell?</h1>
        <p>Put your memory to the test and Live Mas with this tasty matching making game that'll leave you hungry for more!</p>
      </div>
      <button className="button" onClick={shuffleDeck}>New Game</button>
      <div className="game-stats">
        <p>Turns: {turns} </p>
        <p>Matches: {matches}</p>
      </div>
      <div className="game-board">
        {cards.map(card => (
          <Card 
          key={card.id} 
          card={card} 
          handleChoice={handleChoice} 
          flipped={card === selectedOne || card === selectedTwo || card.matched}
          disabled={disabled}
          />
        ))}
      </div>
      <div className="footer">Developed by <a href="https://www.devhenry.com/" target="_blank">Dave Henry</a> 2022.</div>
    </div>
  );
}

export default App;
