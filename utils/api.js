import { AsyncStorage } from 'react-native'
import { formatQuizResults, QUIZ_STORAGE_KEY } from './_quiz'

export function getDecks() {
    return AsyncStorage.getItem(QUIZ_STORAGE_KEY)
        .then(formatQuizResults)
}

export function getDeck(deckKey) {
    return AsyncStorage.getItem(QUIZ_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            return data[deckKey]
        })
}

export function saveDeckTitle(deckKey, title) {
    return AsyncStorage.getItem(QUIZ_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            const newDeck = {
                title,
                questions: []
            }
            data[deckKey] = newDeck
            AsyncStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(data))
            return newDeck
        })
}


export function addCardToDeck(card, deckKey) {
    return AsyncStorage.getItem(QUIZ_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            const {questions} = data[deckKey]
            const newQuestions = questions.concat(card)
            data[deckKey].questions = newQuestions
            AsyncStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(data))
            return data
        })
}
