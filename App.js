import Expo, { Notifications } from 'expo';
import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import registerForNotifications from './services/push-notification';

export default class App extends React.Component {
  async componentDidMount(){
    await registerForNotifications();
    Notifications.addListener((notification) => {
      const { data : {text }} = notification;
      if(origin === 'received' && text){
        Alert.alert("New Push Notification", text, [
          { text: "OK" },
          { text: "Cancel" }
        ]);
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up Main.js to start working on your app!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
