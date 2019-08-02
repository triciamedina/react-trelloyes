import React from 'react';
import './Card.css'

function Card(props) {
    return (
        <div className='Card'>
            <button 
                type="button"
                // question: when writing the function this way 
                // does that negate need for 'this'?
                onClick={() => props.onDeleteCard(props.cardId)}
            >
                delete
            </button>
            <h3>{props.title}</h3>
            <p>{props.content}</p>
        </div>
    )
}

export default Card;