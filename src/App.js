import { useEffect, useState } from 'react';
import './App.css';
import { Button, Container, Grid } from '@mui/material';
import Card from './components/Card'


const cardImages = [
  {"src": "/img/popa.png", matched: false},
  {"src": "/img/juve.png", matched: false},
  {"src": "/img/as.png", matched: false},
  {"src": "/img/dama.png", matched: false},
  {"src": "/img/10.png", matched: false},
  {"src": "/img/2.png", matched: false},
]

function App() {
  //shuffle card

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)


  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    if(choiceOne && choiceTwo) {
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            //daca avem match updatam proprietatea de matched
            if(card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              //altfel returnam cardul
              return card
            }
          })
        })
        resetTurn()
      } else { 
        setTimeout(() => resetTurn(), 1000)
        
      }
    }
  }, [choiceOne, choiceTwo])

  useEffect(() => {
    shuffleCards()
  }, [])

  //duplicate cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random()})) 

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }


  console.log(cards)

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  console.log("C1", choiceOne)
  console.log("C2", choiceTwo)

  return (
    <>
      <Container sx={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', my:5}}>
        <Button variant="contained" onClick={() => shuffleCards()}>New Game</Button>
        <p style={{color:"#fff", fontWeight:'bold'}}>Turns: {turns}</p>
      </Container>
 
        <Grid container spacing={3}>
          {cards?.map(card => (
            <Grid item xs={4} sm={4} md={3} lg={3} key={card.id} sx={{display:'flex', justifyContent:'center'}}>
                <Card key={card.id} card={card} handleChoice={handleChoice} 
                flipped={(card === choiceOne) || (card === choiceTwo) || (card.matched)}
                disabled={disabled}
                />
            </Grid>
          ))}
      </Grid>
    </>
  );
}

export default App;
