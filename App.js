import React from 'react';
import { StackNavigator } from 'react-navigation';
import DeckList from './components/DeckList';
import Deck from './components/Deck';
import CreateDeck from './components/CreateDeck';
import CreateQuestion from './components/CreateQuestion';
import Question from './components/Question';
import Answer from './components/Answer';
import { setLocalNotification } from './utils/helpers'

export default class App extends React.Component {
    componentDidMount() {
        setLocalNotification()
    }

  render() {
    return (
      <Stack/>
    );
  }
}

const Stack = StackNavigator({
    DeckList: {
        screen: DeckList,
        navigationOptions: {
            title: "Decks",
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: 'black'
            }
        }
    },
    Deck: {
        screen: Deck,
        navigationOptions: {
            title: "Deck",
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: 'black'
            }
        }
    },
    CreateDeck: {
        screen: CreateDeck,
        navigationOptions: {
            title: "New Deck",
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: 'black'
            }
        }
    },
    CreateQuestion: {
        screen: CreateQuestion,
        navigationOptions: {
            title: "Add Card",
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: 'black'
            }
        }
    },
    Question: {
        screen: Question,
        navigationOptions: {
            title: "Quiz",
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: 'black'
            }
        }
    },
    Answer: {
        screen: Answer,
        navigationOptions: {
            title: "quiz",
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: 'black'
            }
        }
    }
})

