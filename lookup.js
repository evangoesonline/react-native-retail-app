import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDr8RgLEh_BQjMABkO6EPo4Pz0G47q8wp4",
    authDomain: "final-project-ab798.firebaseapp.com",
    projectId: "final-project-ab798",
    storageBucket: "final-project-ab798.appspot.com",
    messagingSenderId: "929794663213",
    appId: "1:929794663213:web:66eea44e89cc18006ee9a4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function App() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        const q = query(collection(db, 'items'), where('name', '>=', searchQuery));
        const querySnapshot = await getDocs(q);
        const results = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSearchResults(results);
    };

    const renderItem = ({ item }) => {
        return (
            <View style={styles.item}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
        );
    };

    return (

        <View style={styles.container}>
            <Text style={styles.label}>Use this page to search product catalogue</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Search items"
                value={searchQuery}
                onChangeText={text => setSearchQuery(text)}
                onSubmitEditing={handleSearch}
            />
            <FlatList
                style={styles.itemList}
                data={searchResults}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    itemList: {
        flex: 1,
    },
    item: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemDescription: {
        fontSize: 14,
    },
    label: {
        fontWeight: 500,
        paddingBottom: 10

    }
});
