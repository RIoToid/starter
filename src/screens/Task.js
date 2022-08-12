import { Alert, StyleSheet, Text, View } from 'react-native';
import React, {useState} from 'react';
import { TextInput } from 'react-native-gesture-handler';
import CustomButton from '../utils/CustomButton';
import CheckBox from '@react-native-community/checkbox';

import { useDispatch, useSelector } from 'react-redux';
import { setTasks } from '../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

export default function Task({navigation}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [done, setDone] = useState(false);

    const {tasks, taskID} = useSelector(state => state.taskReducer);
    const dispatch = useDispatch();

    useEffect(() => {
      getTask(); // to be defined
    }, [])

    const getTask = () =>{
      const Task = tasks.find(task => task.ID === taskID)
      if(Task){
        setTitle(Task.title);
        setDescription(Task.description);
        setDone(Task.done);
      }
    }

    const setTask = () =>{
        if (title.length == 0){
            Alert.alert("Warning!", "Please write your task title.")
        }
        else{
            try {
                var task = {
                    ID: taskID,
                    title: title,
                    description: description,
                    done: done, //keeps the box checked 
                };
                const index = tasks.findIndex(task => task.ID ===taskID);
                let newTasks = [];
                if (index > -1){
                  newTasks = [...tasks];
                  newTasks[index] = task;
                }else {
                   newTasks = [...tasks, task];
                }
                console.log(newTasks);
                AsyncStorage.setItem("Tasks", JSON.stringify(newTasks))//key here is Tasks
                     .then(()=>{
                        dispatch(setTasks(newTasks));
                         Alert.alert("Success!", "Task added successfully");
                         navigation.goBack();
                        })
                     .catch(error => console.log(error, "exit code 1"))

            }catch(error){
                console.log(error, "exit code 2");
            }
        }
    }

  return (
    <View style={styles.body}>
      <TextInput 
        value={title}
        style={styles.input}
        placeholder={"Title"}
        onChangeText={(value) => setTitle(value)}
      />
      <TextInput
        value={description} 
        style={styles.input}
        placeholder={"Description"}
        multiline
        onChangeText={(value) => {setDescription(value)}}
      />
      <View style={styles.checkbox_row}>
      <CheckBox 
        value={done} //controlled by state
        onValueChange={(newValue) => setDone(newValue)}
      />
      <Text style={styles.checkbox_text}>Done</Text>
      </View>
      <CustomButton 
        title="Save Task"
        color="#1eb900"
        style={{width: "100%"}}
        onPressFunction={setTask}
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
    },
    checkbox_row: {
      flexDirection: "row",
    },
    checkbox_text: {
      fontSize: 20,
      marginLeft: 5,
    }


})