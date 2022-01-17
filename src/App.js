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
  {"src": "/assets/friesSupreme.png", matched: false },
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


  // make new array with two sets of cards then shuffle

  const shuffleDeck = () => {
    const shuffledDeck = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
      
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
        if (selectedOne.src === selectedTwo.src) {
          console.log('matches')
          resetTurn()
          setMatches(prevMatches => prevMatches +1)
        } else {
          console.log('no match')
          resetTurn()
        }
      }
    }, [selectedOne, selectedTwo])

    // reset selected cards and increase turn count
    const resetTurn = () => {
      setSelectedOne(null)
      setSelectedTwo(null)
      setTurns(prevTurns => prevTurns + 1)
    }

  return (
    <div className="App">
      <h1>Ring A Bell?</h1>
      <button className="button" onClick={shuffleDeck}>New Game</button>
      <p>Turns: {turns} </p>
      <p>Matches: {matches}</p>

      <div className="game-board">
        {cards.map(card => (
          <Card key={card.id} card={card} handleChoice={handleChoice} />
        ))}
      </div>
    </div>
  );
}

export default App;
