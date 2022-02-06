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
  const [level, setLevel] = useState(null)
  const [gameOver, setGameOver] = useState(false)

  
  
  
  // make new array with two sets of cards then shuffle
  
  const shuffleDeck = () => {
    const shuffledDeck = [...cardImages.slice(level), ...cardImages.slice(level)]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card, id: Math.random() }))

    setSelectedOne(null)
    setSelectedTwo(null)
    setCards(shuffledDeck)
    setTurns(0)
    setMatches(0)
  }

  useEffect(() => {
    shuffleDeck()
  },[level])

  const newGame = () => {
    setLevel(null)
    setGameOver(false)
  }

    // easy = 6, medium = 8, hard = 12
    const handleChange = (e) => {
      setLevel(e.target.value)
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

    const matchCheck = () => {
      if (matches === (cardImages.slice(level).length)) {
        setGameOver(true)
      } else {
      }
    }

    useEffect(() => {
      matchCheck()
    }, [matches])

    // reset selected cards and increase turn count
    const resetTurn = () => {
      setSelectedOne(null)
      setSelectedTwo(null)
      setTurns(prevTurns => prevTurns + 1)
      setDisabled(false)
    }

    //initiate game upon mount
    useEffect(() => {
      shuffleDeck()
    }, [])

  return (
    <div className="App">
      <div className="header">
        <h1>Ring A Bell?</h1>
        <p>Put your memory to the test and Live Mas with this tasty matching making game that'll leave you hungry for more!</p>
      </div>  

      {!level && !gameOver && (
      <div className="dropdown">
        <h2>How much heat can you handle:</h2>
        <select className="dropdown-options" onChange={handleChange}>
          <option value="null">Pick one</option>
          <option value="6">Mild</option>
          <option value="3">Medium</option>
          <option value="0">Hot</option>
        </select>
      </div>
      )}

    {level && !gameOver && (
      <>
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
        <button className="button" onClick={newGame}>New Game</button>
      </>
    )}
    {gameOver && (
      <>
        <div className="gameover">
          <h1>GAME OVER!</h1>
          <p>You got {matches} matches in {turns} turns</p>
          <p>Well done!</p>
          <button className="button" onClick={newGame}>Play Again?</button>
        </div>
      </>
    )}
      <div className="footer">Developed by <a href="https://www.devhenry.com/" target="_blank" rel="noreferrer">Dave Henry</a> 2022.
      </div>
    </div>
  );
}

export default App;
