import './App.css';
import { useEffect, useState } from 'react'

const cardImages = [
  {"src": "/assets/bajaBlast.png"}
  {"src": "/assets/beefBurritoSupreme.png"}
  {"src": "/assets/beefChalupaSupreme.png"}
  {"src": "/assets/borderSauce.png"}
  {"src": "/assets/chickenBurritoSupreme.png"}
  {"src": "/assets/chickenSoftTaco.png"}
  {"src": "/assets/cinnamonTwists.png"}
  {"src": "/assets/crunchwrapSupreme.png"}
  {"src": "/assets/friesSupreme.png"}
  {"src": "/assets/loadedNachoTaco.png"}
  {"src": "/assets/nachosSupreme.png"}
  {"src": "/assets/quesalupa.png"}
  {"src": "/assets/steakQuesadilla.png"}
]

function App() {
  return (
    <div className="App">
      <h2>Ring A Bell?</h2>
      <button className="button">New Game</button>
      <div>Turns: </div>
      <div>Matches: </div>
    </div>
  );
}

export default App;
