import { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';
export default function Home({ navigation }) {
    const pressHandler = () => {
        navigation.navigate('Reorder')
    }
    const pressHandler2 = () => {
        navigation.navigate('Scan barcode')
    }
    const pressHandler3 = () => {
        navigation.navigate('Notes')
    }
    const pressHandler4 = () => {
        navigation.navigate('Item lookup')
    }
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Welcome to Evan's Retail Handheld tool!{'\n'}</Text>
            <Text style={styles.paragraph}>This app includes various tools for running a successful retail business!</Text>
            <View style={styles.buttonContainer}>
                <Button title="Reorder" onPress={pressHandler} />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Scanner" onPress={pressHandler2} />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Notepad" onPress={pressHandler3} />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Lookup" onPress={pressHandler4} />
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    form: {
        margin: 30,
        marginTop: 60
    },
    label: {
        fontSize: 18,
        marginBottom: 30,
        textAlign: 'center',
        marginTop: 60
    },
    paragraph: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 30,
    },
    textInput: {
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2,
        textAlignVertical: 'top'
    },
    buttonContainer: {
        padding: 10
    },
    button: {
        width: '40%',
    },
    container: {
        padding: 20
    }
});
