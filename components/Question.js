import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, Text, View } from 'react-native';

export default class Question extends Component {
    state = {
        correct: 0,
        incorrect: 0,
        pressedCorrect: false,
        pressedIncorrect: false
    }

    onPressCorrect = () => {
        if(!this.state.pressedCorrect) {
            var incorrectOffset = 0
            if(this.state.pressedIncorrect) {
                incorrectOffset = -1
            }
            this.setState({
                correct: this.state.correct + 1,
                incorrect: this.state.incorrect + incorrectOffset,
                pressedCorrect: true,
                pressedIncorrect: false
            });
        }
    }

    onPressIncorrect = () => {
        if(!this.state.pressedIncorrect) {
            var correctOffset = 0
            if(this.state.pressedCorrect) {
                correctOffset = -1
            }
            this.setState({
                incorrect: this.state.incorrect + 1,
                correct: this.state.correct + correctOffset,
                pressedIncorrect: true,
                pressedCorrect: false
            });
        }
    }

    refresh = (correct, incorrect, pressedCorrect, pressedIncorrect) => {
        this.setState({
            correct,
            incorrect,
            pressedCorrect,
            pressedIncorrect
        })
    }

    onPressAnswer = () => {
        const { navigate } = this.props.navigation;
        return navigate('Answer', {
            deck: this.props.navigation.state.params.deck,
            questionIndex: this.props.navigation.state.params.questionIndex,
            correct: this.state.correct,
            incorrect: this.state.incorrect,
            pressedCorrect: this.state.pressedCorrect,
            pressedIncorrect: this.state.pressedIncorrect,
            refresh: this.refresh
        });
    }

    onPressNextQuestion = () => {
        const { navigate } = this.props.navigation;
        const {correct, incorrect} = this.state
        const {deck, questionIndex} = this.props.navigation.state.params
        if((questionIndex+1)>=deck.questions.length) {
            return navigate('DeckList')
        }
        else {
            return navigate('Question', {
                deck: deck,
                questionIndex: questionIndex + 1,
                correct: correct,
                incorrect: incorrect,
                pressedCorrect: false,
                pressedIncorrect: false
            });
        }
    }

    onPressRestartQuiz = () => {
        const { navigate } = this.props.navigation;
        const {deck} = this.props.navigation.state.params
        return navigate('Question', {
            deck: deck,
            questionIndex: 0,
            correct: 0,
            incorrect: 0,
            pressedCorrect: false,
            pressedIncorrect: false
        });
    }

    onPressBackToDeck = () => {
        const { navigate } = this.props.navigation;
        const {deck} = this.props.navigation.state.params
        return navigate('Deck', {deck: deck})
    }

    componentDidMount () {
        const {correct, incorrect, pressedCorrect, pressedIncorrect} = this.props.navigation.state.params
        this.setState({
            correct,
            incorrect,
            pressedCorrect,
            pressedIncorrect
        })
    }

    render() {
        const { pressedCorrect, pressedIncorrect } = this.state
        const {deck} = this.props.navigation.state.params
        const question = deck.questions[this.props.navigation.state.params.questionIndex]
        const questionIndex = this.props.navigation.state.params.questionIndex+1
        const percentageCorrect = Math.round(100*this.state.correct/deck.questions.length)
        return (
            ((questionIndex)<deck.questions.length)?
                <View style={styles.container}>
                    <Text style={styles.index}>{questionIndex}/{deck.questions.length}</Text>
                    <Text style={styles.title}>{question.question}</Text>
                    <TouchableHighlight
                        onPress={this.onPressAnswer}
                    >
                        <Text style={styles.subTitle}>Answer</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.correctButton}
                        onPress={this.onPressCorrect}
                    >
                        <Text style={styles.buttonText}>Correct</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.incorrectButton}
                        onPress={this.onPressIncorrect}
                    >
                        <Text style={styles.buttonText}>Incorrect</Text>
                    </TouchableHighlight>
                    {(pressedCorrect || pressedIncorrect)?
                    <TouchableHighlight
                        style={styles.nextQuestionButton}
                        onPress={this.onPressNextQuestion}
                    >
                        <Text style={styles.nextQuestionButtonText}>Next Question</Text>
                    </TouchableHighlight>
                        :<View/>}
                </View>:
                <View style={styles.container}>
                    <Text style={styles.index}>{questionIndex}/{deck.questions.length}</Text>
                    {(pressedCorrect || pressedIncorrect)?
                        <Text style={styles.index}>{percentageCorrect}% correct</Text>:
                        <Text style={styles.index}> </Text>
                    }
                    <Text style={styles.title}>{question.question}</Text>
                    <TouchableHighlight
                        onPress={this.onPressAnswer}
                    >
                        <Text style={styles.subTitle}>Answer</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.correctButton}
                        onPress={this.onPressCorrect}
                    >
                        <Text style={styles.buttonText}>Correct</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.incorrectButton}
                        onPress={this.onPressIncorrect}
                    >
                        <Text style={styles.buttonText}>Incorrect</Text>
                    </TouchableHighlight>
                    {(pressedCorrect || pressedIncorrect)?
                    <TouchableHighlight
                        style={styles.restartQuizButton}
                        onPress={this.onPressRestartQuiz}
                    >
                        <Text style={styles.nextQuestionButtonText}>Restart Quiz</Text>
                    </TouchableHighlight>
                        :<View/>}
                    {(pressedCorrect || pressedIncorrect)?
                    <TouchableHighlight
                        style={styles.backToDeckButton}
                        onPress={this.onPressBackToDeck}
                    >
                        <Text style={styles.nextQuestionButtonText}>Back to Deck</Text>
                    </TouchableHighlight>
                        :<View/>}
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
        color: '#ff0000',
        textAlign:'center'
    },
    index: {
        fontSize: 18,
        color: '#000005',
        textAlign:'left'
    },
    correctButton: {
        marginTop:10,
        paddingTop:15,
        paddingBottom:15,
        marginLeft:30,
        marginRight:30,
        backgroundColor:'#00ff00',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#ffffff'
    },
    incorrectButton: {
        marginTop:10,
        paddingTop:15,
        paddingBottom:15,
        marginLeft:30,
        marginRight:30,
        backgroundColor:'#ff0000',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#ffffff'
    },
    buttonText: {
        color:'#ffffff',
        textAlign:'center'
    },
    nextQuestionButton: {
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
    nextQuestionButtonText: {
        color:'#000000',
        textAlign:'center'
    },
    restartQuizButton: {
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
    restartQuizButtonText: {
        color:'#000000',
        textAlign:'center'
    },
    backToDeckButton: {
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
    backToDeckButtonText: {
        color:'#000000',
        textAlign:'center'
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch'
    }
})
