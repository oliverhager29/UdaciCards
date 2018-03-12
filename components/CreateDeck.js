import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, Text, View, TextInput } from 'react-native';
import { saveDeckTitle } from '../utils/api.js'

export default class CreateDeck extends Component {
    state = {
        title: "Enter title"
    }

    onPressSubmit = () => {
        const {title} = this.state
        const deckKey = title.trim().replace(" ", "")
        saveDeckTitle(deckKey, title).then( deck => {
            this.props.navigation.state.params.refresh()
        })
        const { navigate } = this.props.navigation;
        return navigate('Deck', { deck: {title: title, questions: []} });
    }

    componentDidMount () {
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>What is the title</Text>
                <Text style={styles.title}>of your new</Text>
                <Text style={styles.title}>deck?</Text>
                <TextInput clearTextOnFocus={true} onChangeText={(title) => this.setState({title})} value={this.state.title}/>
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
