import { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from 'react-navigation';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import * as MailComposer from 'expo-mail-composer';

export default function App() {

    [message, setMessage] = useState();
    [recipient, setRecipient] = useState();

    onChangeHandler = (value) => {
        setRecipient(value);

    }

    onChangeHandler2 = (value) => {
        setMessage(value);
    }


    sendMessageWithEmail = async () => {
        const isAvailable = await MailComposer.isAvailableAsync();

        if (isAvailable) {
            var options = {
                // recipients (array) -- An array of e-mail addressess of the recipients.
                recipients: [recipient],
                // ccRecipients (array) -- An array of e-mail addressess of the CC recipients.
                // bccRecipients (array) -- An array of e-mail addressess of the BCC recipients.
                // subject (string) -- Subject of the mail.
                subject: 'My Subject Line',
                // body (string) -- Body of the mail.
                body: message
                // isHtml (boolean) -- Whether the body contains HTML tags so it could be formatted properly. Not working perfectly on Android.
                // attachments (array) -- An array of app's internal file uris to attach.
            };
            const sentAlert = Alert.alert(
                'Success!',
                'Message sent',
                [
                    { text: 'OK' }
                ],
                { cancelable: true },
            );

            MailComposer.composeAsync(options).then(sentAlert);

        } else {
            console.log("Email is not available on this device " + "Address: " + recipient + " " + "Message: " + message);
        }
    }

    return (
        <View style={styles.form}>
            <Text style={styles.label}>Order Entry Form</Text>
            <TextInput
                style={styles.textInput}

                onChangeText={onChangeHandler}
                placeholder="Vendor address"
            />
            <TextInput
                style={styles.textInput}
                multiline
                numberOfLines={10}
                onChangeText={onChangeHandler2}
                placeholder="Please enter part number and quantity"
            />
            <View style={styles.buttonContainer}>
                <Button style={styles.button} title="Send Order" onPress={sendMessageWithEmail} />
            </View>
        </View>
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
        textAlign: 'center'
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
        paddingVertical: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        width: '40%',
    }
});
