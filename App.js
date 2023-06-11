import React from 'react';
import { Text, View, StyleSheet, Button, Alert, Image } from 'react-native';
import 'firebase/auth';
import 'firebase/firestore';
import Navigator from './routes/homeStack';

export default function App() {
  return (
    <Navigator />

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
