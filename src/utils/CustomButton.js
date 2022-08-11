import { StyleSheet, Text, View, Pressable} from 'react-native'
import React from 'react'


export default function CustomButton(props) { // props: title, onPressFuntion, color
  return (
    <Pressable
        onPress={props.onPressFunction}
        hitSlop = {{top: 10, bottom: 10, right: 10, left: 10}}
        android_ripple= {{color: "#00000050"}}
        style={({pressed}) => [
            {backgroundColor: pressed ? '#dddddd' : props.color},
            styles.button,
            {...props.style}
        ]}
    ><Text style={styles.text}>{props.title}</Text>

    </Pressable>
  )
}

const styles = StyleSheet.create({
    button: {
        width: 150,
        height: 50,
        borderRadius: 5,
        margin: 10,
        justifyContent: "center",
        alignSelf: "center" //changed this from alignItems to alignSelf and it worked fine
    },
    text: {
        color: "white",
        textAlign: "center",
        fontSize: 15,
        margin: 10,
    }
})