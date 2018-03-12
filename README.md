<h1>Functionality</h1>
UdaciCards lets a user create decks of cards with a question on one side and the answer on the other side.

The app starts with a list of decks and an "Add Deck" button. 
Pressing on a list item leads to the Deck screen that displays the deck's title and the number of cards within that deck.
There is an "Add Card" button which leads to a screen which allows adding a card (entering card's question and answer).
There is a "Back to Decks" button that leads back to the start screen (list of decks).
there is a "Start Quiz" button which let's the user to do a quiz on the cards of the deck.

The "Add Deck" button in the start screen let's the user add a deck by entering a title. After submitting the deck screen is shown for the new deck. From here cards can added and a quiz can be started as described before.

The Quiz screens show either the question or the answer and the user can mark on both screens whether the guessed answer was correct or incorrect.
The user can override the former decision by pressing the opposite button.  
A card index (current card index / number of cards) is shown on all quiz screens.
The user has to press the "Correct" or "Incorrect" button in order to see the "Next Question" button which leads to the question of the next card.
If that card is the last card, then a success percentage is shown after pressing either the "Correct" or "Incorrect" button.
Further a "Restart Quiz" button and a "Back to Deck" button is show. First restarts the quiz (start with first card on deck).
The seconds button leads back the deck screen.

A Notification is set up the reminds the user to take a test daily.

<h1>Implementation Details</h1>

The navigation is realized as StackNavigation:
````
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
````

The start screen uses a ScrollView with a list item table to allow displaying an unlimited number of decks.

The state uses AsyncStorage with the following JSON model:
````
{
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}
````

The following operations are offered:
````
getDecks() returns all decks
getDeck(deckKey) returns deck by key
saveDeckTitle(deckKey, title) returns new deck
addCardToDeck(card, deckKey) returns updated deck

````
<h1>Installation</h1>

````
# install all package
yarn install
````
````
# run simulator
yarn start
````
````
# after start completed press i for staring the IOS simulator or a for starting an Android device or simulator.
# On an Android device install the Expo app and use the camera to read the configuration (see instructions displayed).
````

