import { StyleSheet, Text, View } from 'react-native';
import React, {useState} from 'react';
import { TextInput } from 'react-native-gesture-handler';
import CustomButton from '../utils/CustomButton';

export default function Task() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");


  return (
    <View style={styles.body}>
      <TextInput 
        value={title}
        style={styles.input}
        placeholder={"Title"}
        onChange={(value) => setTitle(value)}
      />
      <TextInput
        value={description} 
        style={styles.input}
        placeholder={"Description"}
        multiline
        onChange={(value) => setDescription(value)}
      />
      <CustomButton 
        title="Save Task"
        color="#1eb900"
        style={{width: "100%"}}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: "center",
        padding: 10,
    },
    input: {
        borderWidth: 1,
        margin: 10,
        borderRadius: 10,
        height: 45,
        width: "100%",
        bordercolor: "#555555",
        backgroundColor: "#ffffff",
        textAlign: "left",
        fontSize: 15,
        paddingHorizontal: 10,
    }


})