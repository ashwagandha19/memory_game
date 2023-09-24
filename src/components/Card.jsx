import React from 'react'
import '../App.css'

const Card = ({card, handleChoice, flipped, disabled}) => {

  const handleClick = () => {
    if(!disabled) {
        handleChoice(card)
    }
  }

  console.log("FLIPPED", flipped)
    
  return (
    <div className="card">
        <div className={flipped ? "flipped" : ""}>
            <img src={card.src} className='front' alt="card front" />
            <img 
                src="/img/cover.png" 
                className='back' 
                alt="card back" 
                onClick={handleClick} 
            />
        </div>
    </div>

  )
}

export default Card