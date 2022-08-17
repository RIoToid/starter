import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import PushNotification from 'react-native-push-notification';

export default function Splash({navigation}) {
  useEffect(() => {
    createChannels();
    setTimeout(() => {
      navigation.replace('My Tasks'); // to do screen My Tasks nested tab navigator
    }, 2000);
  }, []); // to be run only the first time

  const createChannels = () => {
    PushNotification.createChannel({
      channelId: 'task-channel',
      channelName: 'Task Channel',
    });
  };

  return (
    <View style={styles.body}>
      <Image
        style={styles.logo}
        source={require('../../assets/starter-todo.png')}
      />
      <Text style={styles.text}>Slay The Day!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 150,
    width: 150,
    margin: 20,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0080ff',
  },
  text: {
    fontSize: 40,
    color: '#ffffff',
  },
});
