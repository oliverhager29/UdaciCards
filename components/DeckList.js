import React, { Component } from 'react';
import { FlatList, TouchableHighlight, StyleSheet, Text, ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements'
import { getDecks } from '../utils/api.js'

export default class DeckList extends Component {
    state = {
        decks: null
    }
    componentDidMount () {
        const decks = getDecks().then( decks => {
            this.setState({decks})
        })
    }

    refresh = () => {
        const decks = getDecks().then( decks => {
            this.setState({decks})
        })
    }

    onPressAddDeck = () => {
        const { navigate } = this.props.navigation;
        return navigate('CreateDeck', { refresh: this.refresh });
    }

    goToNextScreen = (deck) => {
        const { navigate } = this.props.navigation;
        return navigate('Deck', { deck: deck });
    }

    render() {
        let deckList = []
        if(this.state.decks!==null) {
            deckList = Object.keys(this.state.decks).map(key => this.state.decks[key])
        }
        return (
            (deckList.length===0)?<Text>Loading ...</Text>:

            <ScrollView style={styles.container}>
                <List>
                    <FlatList
                        data={deckList}
                        renderItem={({ item }) => (
                            <TouchableHighlight onPress={() => this.goToNextScreen(item)}>
                            <ListItem
                                roundAvatar
                                title={`${item.title}`}
                                subtitle={item.questions.length}
                            />
                            </TouchableHighlight>
                            )}
                        keyExtractor={item => item.title}
                    />
                </List>
                <TouchableHighlight
                    style={styles.addDeckButton}
                    onPress={this.onPressAddDeck}

                >
                    <Text style={styles.addDeckButtonText}>Add Deck</Text>
                </TouchableHighlight>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    addDeckButton: {
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
    addDeckButtonText: {
        color:'#000000',
        textAlign:'center'
    }
})
