import React from 'react';
import List from './composition/List';
import './App.css';

// refactored App as a class component rather than function
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // moved object from store.js to state
      lists: [
        {
          id: '1',
          header: 'First list',
          cardIds: [ 'a', 'b', 'e', 'f', 'g', 'j', 'l', 'm' ],
        },
        {
          id: '2',
          header: 'Second list',
          cardIds: ['b', 'c', 'd', 'f', 'h', 'i', 'k'],
        },
        {
          id: '3',
          header: 'Third list',
          cardIds: [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm' ],
        },
        {
          id: '4',
          header: 'Fourth list',
          cardIds: [ 'l', 'm' ],
        },
      ],
      allCards: {
        'a': { id: 'a', title: 'First card', content: 'lorem ipsum' },
        'b': { id: 'b', title: 'Second card', content: 'lorem ipsum' },
        'c': { id: 'c', title: 'Third card', content: 'lorem ipsum' },
        'd': { id: 'd', title: 'Fourth card', content: 'lorem ipsum' },
        'e': { id: 'e', title: 'Fifth card', content: 'lorem ipsum' },
        'f': { id: 'f', title: 'Sixth card', content: 'lorem ipsum' },
        'g': { id: 'g', title: 'Seventh card', content: 'lorem ipsum' },
        'h': { id: 'h', title: 'Eighth card', content: 'lorem ipsum' },
        'i': { id: 'i', title: 'Ninth card', content: 'lorem ipsum' },
        'j': { id: 'j', title: 'Tenth card', content: 'lorem ipsum' },
        'k': { id: 'k', title: 'Eleventh card', content: 'lorem ipsum' },
        'l': { id: 'l', title: 'Twelfth card', content: 'lorem ipsum' },
        'm': { id: 'm', title: 'Thirteenth card', content: 'lorem ipsum' },
      },
    }
  }
  newRandomCard = () => {
    const id = Math.random().toString(36).substring(2, 4) + Math.random().toString(36).substring(2, 4);
    return {
      id,
      title: `Random Card ${id}`,
      content: 'lorem ipsum',
    }
  }
  handleAddRandomCard = (listId) => {
    // create a new card object with random card added
    const newCard = this.newRandomCard()
    const newCardsObj = {...this.state.allCards, [newCard.id]: newCard}
    // create a new list array with the random card added
    // to the list where the button was pressed
    const newLists = this.state.lists.map(
        listObj => {
          const newArr = (listObj.id === listId) ? 
            listObj.cardIds.concat(newCard.id) : listObj.cardIds  
          // used spread operator to prevent object in state 
          // from being altered by reference
          return {...listObj, cardIds: newArr}
        }
      )
    // set state with new list array and new card object
    this.setState({
      lists: newLists,
      allCards: newCardsObj
    })
  }
  omit = (obj, cardId) => {
    return Object.entries(obj).reduce(
      (newObj, [key, value]) =>
        key === cardId ? newObj : {...newObj, [key]: value},
        {}
    );
  }
  handleDeleteCard = (cardId) => {
    // creates new list array with references to deleted card removed
    const newLists = this.state.lists.map(
      listObj => {
        listObj.cardIds = listObj.cardIds.filter(item => item !== cardId)
        return listObj
      }
    )
    // creates new cards object with deleted card removed
    
    const newCardsObj = this.omit(this.state.allCards, cardId)
    // updates state with new list array and new cards object
    this.setState({
      lists: newLists,
      allCards: newCardsObj
    })
    console.log(this.state)
  }
  render() {
    console.log(this.state.lists, this.state.allCards)
    return (
      <main className='App'>
        <header className="App-header">
          <h1>Trelloyes!</h1>
        </header>
        <div className="App-list">
          {/* refactored to access state to generate List */}
          {this.state.lists.map(listItem =>
            <List 
              key={listItem.id}
              listId={listItem.id}
              header={listItem.header}
              cards={listItem.cardIds.map(i => this.state.allCards[i])} 
              onAddRandomCard={this.handleAddRandomCard}
              onDeleteCard={this.handleDeleteCard}
            />
          )}
        </div>
      </main>
    );
  }
}

export default App;
