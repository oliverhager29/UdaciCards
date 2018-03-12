import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, Text, View, TextInput } from 'react-native';
import {NavigationActions} from 'react-navigation'
import { addCardToDeck } from '../utils/api.js'

export default class CreateDeck extends Component {
    state = {
        question: "Enter question",
        answer: "Enter answer"
    }

    onPressSubmit = () => {
        const {question,answer} = this.state
        const deckKey = this.props.navigation.state.params.deckKey
        addCardToDeck({question, answer}, deckKey).then( () => {
            this.props.navigation.state.params.refresh()
        })
        const backAction = NavigationActions.back({
            key: null
        })
        this.props.navigation.dispatch(backAction);
    }

    componentDidMount () {
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput clearTextOnFocus={true} onChangeText={(question) => this.setState({question})} value={this.state.question}/>
                <TextInput clearTextOnFocus={true} onChangeText={(answer) => this.setState({answer})} value={this.state.answer}/>
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.onPressSubmit}
                >
                    <Text style={styles.buttonText}>Submit</Text>
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
    button: {
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
    buttonText: {
        color:'#000000',
        textAlign:'center'
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch'
    }
})
