import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Alert, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('notes.db');

export default function App() {
    const [imageUri, setImageUri] = useState(null);
    const [note, setNote] = useState('');

    const handleChoosePhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync();
        if (!result.cancelled) {
            setImageUri(result.uri);
        }
    };

    const handleSaveNote = () => {
        if (imageUri) {
            FileSystem.getInfoAsync(FileSystem.documentDirectory + 'photos').then((info) => {
                if (!info.exists) {
                    FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'photos').then(() => {
                        saveNoteToDatabase();
                    });
                } else {
                    saveNoteToDatabase();
                }
            });
        } else {
            Alert.alert('Error', 'Please select a photo');
        }
    };

    const saveNoteToDatabase = () => {
        const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
        const destUri = FileSystem.documentDirectory + 'photos/' + filename;
        FileSystem.moveAsync({
            from: imageUri,
            to: destUri
        }).then(() => {
            db.transaction((tx) => {
                tx.executeSql(
                    'INSERT INTO notes (photoUri, note) VALUES (?, ?)',
                    [destUri, note],
                    () => {
                        Alert.alert('Note Saved', 'Your note has been saved successfully');
                        setNote('');
                    },
                    (txObj, error) => console.log(`Error: ${error}`)
                );
            });
        });
    };

    const handleViewNotes = () => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM notes',
                [],
                (_, { rows }) => {
                    const notes = rows._array.map((note) => `${note.photoUri}\n${note.note}\n\n`);
                    Alert.alert('Saved Notes', notes.join(''));
                },
                (txObj, error) => console.log(`Error: ${error}`)
            );
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Quick notes</Text>
            <Text style={styles.paragraph}>Add notes and photos here for future review. Deffective or damaged item? Customer request? Need to follow up on something later? Record here and return to it later!</Text>
            <TouchableOpacity style={styles.imageContainer} onPress={handleChoosePhoto}>
                {imageUri ? (
                    <Image source={{ uri: imageUri }} style={styles.image} />
                ) : (
                    <Text style={styles.paragraph}>Choose a photo from camera roll</Text>
                )}
            </TouchableOpacity>
            <TextInput
                style={styles.textInput}
                multiline
                numberOfLines={4}
                placeholder="Enter a note"
                value={note}
                onChangeText={(text) => setNote(text)}
            />
            <View style={styles.button}>
                <Button title="Save Note" onPress={handleSaveNote} />
            </View>
            <View>
                <Button title="View Notes" onPress={handleViewNotes} />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    title: {
        fontSize: 20,
        fontWeight: 600
    },
    paragraph: {
        margin: 10

    },
    chooseLabel: {
        padding: 10,
        fontWeight: 500
    },
    textInput: {
        padding: 10,
    },
    button: {
        paddingBottom: 10
    }
})

