import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, Text, View } from 'react-native';
import { getDeck } from '../utils/api.js'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

export default class Deck extends Component {
    state = {
        deck: null
    }

    refresh = () => {
        const deckKey = this.state.deck.title.trim().replace(" ", "")
        const deck = getDeck(deckKey).then( deck => {
            this.setState({deck})
        })
    }

    onPressAddCard = () => {
        const { navigate } = this.props.navigation;
        const deckKey = this.state.deck.title.trim().replace(" ", "")
        return navigate('CreateQuestion', {
            deckKey: deckKey,
            refresh: this.refresh
        });
    }

    onPressStartQuiz = () => {
        const {navigate} = this.props.navigation;
        const {deck} = this.state

        if (deck.questions !== null && deck.questions !== undefined && deck.questions.length > 0) {
            clearLocalNotification()
                .then(setLocalNotification)
            return navigate('Question', {
                deck: deck,
                questionIndex: 0,
                correct: 0,
                incorrect: 0,
                pressedCorrect: false,
                pressedIncorrect: false
            });
        }
    }

    onPressBackToDeckList = () => {
        const { navigate } = this.props.navigation;
        return navigate('DeckList');
    }

    componentDidMount () {
        const deck = this.props.navigation.state.params.deck
        this.setState({deck})
    }

    render() {
        const {deck} = this.state
        return (
            (deck===null)?<Text>Loading ...</Text>:

                <View style={styles.container}>
                    <Text style={styles.title}>{deck.title}</Text>
                    <Text style={styles.subTitle}>{deck.questions.length} cards</Text>
                    <TouchableHighlight
                        style={styles.addCardButton}
                        onPress={this.onPressAddCard}

                    >
                        <Text style={styles.addCardButtonText}>Add Card</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.startQuizButton}
                        onPress={this.onPressStartQuiz}

                    >
                        <Text style={styles.startQuizButtonText}>Start Quiz</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.backToDeckListButton}
                        onPress={this.onPressBackToDeckList}

                    >
                        <Text style={styles.backToDeckListButtonText}>Back to Decks</Text>
                    </TouchableHighlight>
                </View>

        );
    }

}

const styles = StyleSheet.create({
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        textAlign:'center'
    },
    subTitle: {
        fontSize: 18,
        color: '#000005',
        textAlign:'center'
    },
    addCardButton: {
        marginTop:10,
        paddingTop:15,
        paddingBottom:15,
        marginLeft:30,
        marginRight:30,
        backgroundColor:'#FFFFFF',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#000000'
    },
    addCardButtonText: {
        color:'#000000',
        textAlign:'center'
    },
    startQuizButton: {
        marginTop:10,
        paddingTop:15,
        paddingBottom:15,
        marginLeft:30,
        marginRight:30,
        backgroundColor:'#ffffff',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#000000'
    },
    startQuizButtonText: {
        color:'#000000',
        textAlign:'center'
    },
    backToDeckListButton: {
        marginTop:10,
        paddingTop:15,
        paddingBottom:15,
        marginLeft:30,
        marginRight:30,
        backgroundColor:'#FFFFFF',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#000000'
    },
    backToDeckListButtonText: {
        color:'#000000',
        textAlign:'center'
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch'
    }
})
