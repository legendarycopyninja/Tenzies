import { useState } from 'react'
import { useEffect } from 'react'
import Dice from './Dice'
import './App.css'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {

  const [dice,setDice] = useState(allNewDice())
  const [tenzies,setTenzies] = useState(false)

useEffect(() => {
const isAllHeld = dice.every(die => die.isHeld)
const referenceValue = dice[0].value
const isAllValueSame = dice.every(die => die.value === referenceValue)
if(isAllHeld && isAllValueSame) {
  setTenzies(oldTenzies => !oldTenzies)
  console.log("you Won!")
}
} ,[dice])

  function allNewDice() {
    const diceArray =[]
    for(let i =0 ;i<10 ; i++){
      diceArray.push(getNewDie())
    }
    return diceArray
}

function getNewDie(){
  return {
    value:Math.ceil(Math.random() * 6),
    isHeld:false,
    id:nanoid()

  }
}

function holdDice(id){
  setDice(oldDice => oldDice.map(die => {
    return die.id === id ? {...die, isHeld: !die.isHeld} : die
  }))
}

const diceElements = dice.map(die => <Dice key={die.id} {...die} holdDice={()=>holdDice(die.id)}  /> )

function rollDice(){
  if(tenzies) {
    setDice(allNewDice())
    setTenzies(false)
  }else {
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ? die : getNewDie()
    }))
  }
}
  return (
    <div className="App">
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice values are the same. Select each die to freeze it at its current value between rolls.</p>
     <div className='diceroll_container'>
     {diceElements}
     </div>
     <button className='roll-dice' onClick={rollDice}>{tenzies?"New Game" : "Roll Dice"}</button>
    </div>
  )
}

export default App
