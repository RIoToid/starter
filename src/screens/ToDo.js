//using AsyncStorage for OFFLINE LOCAL STORAGE

import AsyncStorage from '@react-native-async-storage/async-storage';

import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, Alert} from 'react-native';
import React from 'react';


import { useDispatch, useSelector } from 'react-redux';
import { setTaskId, setTasks } from '../redux/actions';

import { useEffect } from 'react';
import CheckBox from '@react-native-community/checkbox';

export default function ToDo({navigation}) {

  const {tasks} = useSelector(state => state.taskReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getTasks();

  }, []) //runs only once

  const checkTask = (id, newValue) => {
    const index = tasks.findIndex(task => task.ID === id);
    if (index > -1){
      let newTasks = [...tasks];
      newTasks[index].done = newValue;
      AsyncStorage.setItem("Tasks", JSON.stringify(newTasks))
        .then(() => {
          dispatch(setTasks(newTasks));
          Alert.alert("Success!", "Task status has been updated");
        })
        .catch(error => console.log(error, "todo screen - task status update error"))
    }
  }

  const deleteTask = (id) => {
    const filteredTasks = tasks.filter(task => task.ID !== id);
    AsyncStorage.setItem("Tasks", JSON.stringify(filteredTasks))
    .then(() =>{ 
      dispatch(setTasks(filteredTasks));
      Alert.alert("Success!", "Task removed successfully.")
      console.log(tasks);
    })
    .catch(error => console.log(error, "ToDo screen, exit code 1"))
  }

  const getTasks = () => {
    AsyncStorage.getItem("Tasks")
    .then(tasks =>{
      const parsedTasks = JSON.parse(tasks);
      if (parsedTasks && typeof parsedTasks === "object"){
        dispatch(setTasks(parsedTasks));
      }
    }).catch(error => console.log(error))
  }

  return (
    <View style={styles.body}>
      <FlatList 
        data={tasks}
        renderItem={({item}) => (
          <TouchableOpacity 
          onPress={() => { 
            dispatch(setTaskId(item.ID));
           navigation.navigate("Task");
          }}
          style={styles.item}>
            <View style={styles.item_row}>
              <CheckBox 
                value={item.done} //keeps the checkbox status
                onValueChange={(newValue) => checkTask(item.ID, newValue)} // function checkTask(arg1, arg2) to be implemented
              />
              <View style={styles.item_body}>
                <Text style={styles.title}>{item.title}</Text>
                 <Text style={styles.subtitle}>{item.description}</Text>
              </View>
              <TouchableOpacity 
                onPress={() => deleteTask(item.ID)}
              >
                <Image 
                style={styles.image_trash_can}
                source={require("../../assets/starter-trash_can.png")} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      
     <TouchableOpacity 
      style={styles.button} 
      onPress={() => {
        dispatch(setTaskId(tasks.length +1));
        navigation.navigate("Task")}}><Text style={styles.textbuttonAdd}>+</Text>
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
  },
  item_row: {
    flexDirection: "row",
    alignItems: "center",
  },
  item_body: {
    flex: 1,
  },
  item: {
    justifyContent: "center",
    marginHorizontal: 10,
    marginVertical: 7,
    paddingRight: 10,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    color: "black",
    fontSize: 30,
    margin: 5,
  },
  subtitle: {
    color: "grey",
    margin: 5,
    fontSize: 20,
  },
  image_trash_can: {
    height: 25,
    width: 25,
  }
})