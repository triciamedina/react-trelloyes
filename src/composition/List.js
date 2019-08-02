import React from 'react';
import './List.css';
import Card from './Card'

function List(props) {
    return (
        <section className='List'>
            <header className='List-header'>
                <h2>{props.header}</h2>
                {/* added new random card button*/}
                <button 
                    className='.List-add-button'
                    // event listener calls  add random card function 
                    // and passes the id of the list as an argument
                    onClick={() => props.onAddRandomCard(props.listId)}
                >
                    add random card
                </button>
            </header>
            <div className='List-cards'>
                {props.cards.map(item => 
                    <Card 
                        key={item.id}
                        // added a prop for the card id 
                        cardId={item.id}
                        title={item.title}
                        content={item.content} 
                        onDeleteCard={props.onDeleteCard}
                    />
                )}
            </div>
        </section>
    )
}

export default List;