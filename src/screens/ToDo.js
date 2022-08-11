//using AsyncStorage for OFFLINE LOCAL STORAGE

import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import React from 'react'

export default function ToDo({navigation}) {
  return (
    <View style={styles.body}>
     <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate("Task")}}><Text style={styles.textbuttonAdd}>+</Text>
     </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1
  },
  button: {
    height: 60,
    width: 60,
    backgroundColor: "#0080ff",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 10, 
    right: 10,
    elevation: 5,
  },
  textbuttonAdd: {
    fontWeight: "bold",
    color: "white",
    fontSize: 25,
  }
})