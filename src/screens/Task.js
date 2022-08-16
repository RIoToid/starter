import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import CustomButton from '../utils/CustomButton';
import CheckBox from '@react-native-community/checkbox';

import {useDispatch, useSelector} from 'react-redux';
import {setTasks} from '../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';

export default function Task({navigation}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [done, setDone] = useState(false);
  const [color, setColor] = useState('white');
  const [showModalBell, setShowModalBell] = useState(false);
  const [alarm, setAlarm] = useState('1');

  const {tasks, taskID} = useSelector(state => state.taskReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getTask(); // to be defined
  }, []);

  const getTask = () => {
    const Task = tasks.find(task => task.ID === taskID);
    if (Task) {
      setTitle(Task.title);
      setDescription(Task.description);
      setDone(Task.done);
      setColor(Task.color);
    }
  };

  const setTask = () => {
    if (title.length == 0) {
      Alert.alert('Warning!', 'Please write your task title.');
    } else {
      try {
        var task = {
          ID: taskID,
          title: title,
          description: description,
          done: done, //keeps the box checked
          color: color,
        };
        const index = tasks.findIndex(task => task.ID === taskID);
        let newTasks = [];
        if (index > -1) {
          newTasks = [...tasks];
          newTasks[index] = task;
        } else {
          newTasks = [...tasks, task];
        }
        console.log(newTasks);
        AsyncStorage.setItem('Tasks', JSON.stringify(newTasks)) //key here is Tasks
          .then(() => {
            dispatch(setTasks(newTasks));
            Alert.alert('Success!', 'Task added successfully');
            navigation.goBack();
          })
          .catch(error => console.log(error, 'exit code 1'));
      } catch (error) {
        console.log(error, 'exit code 2');
      }
    }
  };
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //////////////////

  return (
    <View style={styles.body}>
      <Modal
        visible={showModalBell} //controlled by the state
        onRequestClose={() => setShowModalBell(false)}
        transparent
        animationType="slide">
        <View style={styles.centered_view}>
          <View style={styles.bell_modal}>
            <View style={styles.bell_body}>
              <Text>Remind me after</Text>
              <TextInput
                onChangeText={value => setAlarm(value)} //controlled by the state
                keyboardType="numeric"
                style={styles.bell_input}
              />
              <Text>minute(s)</Text>
            </View>
            <View style={styles.bell_row}>
              <TouchableOpacity
                style={styles.bell_button_cancel}
                onPress={() => setShowModalBell(false)}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity //</View>onPress={setTaskAlarm}
                style={styles.bell_button_ok}>
                <Text>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <TextInput
        value={title}
        style={styles.input}
        placeholder={'Title'}
        onChangeText={value => setTitle(value)}
      />
      <TextInput
        value={description}
        style={styles.input}
        placeholder={'Description'}
        multiline
        onChangeText={value => {
          setDescription(value);
        }}
      />
      <View style={styles.color_bar}>
        <TouchableOpacity
          onPress={() => setColor('white')}
          style={styles.color_white}>
          {color === 'white' && (
            <Image
              style={styles.image_check}
              source={require('../../assets/starter-check2-removebg-preview.png')}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setColor('red')}
          style={styles.color_red}>
          {color === 'red' && (
            <Image
              style={styles.image_check}
              source={require('../../assets/starter-check2-removebg-preview.png')}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setColor('blue')}
          style={styles.color_blue}>
          {color === 'blue' && (
            <Image
              style={styles.image_check}
              source={require('../../assets/starter-check2-removebg-preview.png')}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setColor('green')}
          style={styles.color_green}>
          {color === 'green' && (
            <Image
              style={styles.image_check}
              source={require('../../assets/starter-check2-removebg-preview.png')}
            />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.bell_view}>
        <TouchableOpacity
          onPress={() => setShowModalBell(true)}
          style={styles.bell_button}>
          <Image
            style={styles.image_bell}
            source={require('../../assets/starter-bell-removebg-preview.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <CheckBox
          value={done} //controlled by state
          onValueChange={newValue => setDone(newValue)}
        />
        <Text style={styles.checkbox_text}>Done</Text>
      </View>
      <CustomButton
        title="Save Task"
        color="#1eb900"
        style={{width: '100%'}}
        onPressFunction={setTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  input: {
    borderWidth: 1,
    margin: 10,
    borderRadius: 10,
    height: 45,
    width: '100%',
    bordercolor: '#555555',
    backgroundColor: '#ffffff',
    textAlign: 'left',
    fontSize: 15,
    paddingHorizontal: 10,
  },
  checkbox_row: {
    flexDirection: 'row',
  },
  checkbox_text: {
    fontSize: 20,
    marginLeft: 5,
  },
  color_bar: {
    flexDirection: 'row',
    height: 50,
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: 10,
  },
  color_white: {
    flex: 1,
    backgroundColor: 'white',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  color_red: {
    flex: 1,
    backgroundColor: '#cc0003',
    justifyContent: 'center',
    alignItems: 'center',
  },
  color_blue: {
    flex: 1,
    backgroundColor: '#abdcd1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  color_green: {
    flex: 1,
    backgroundColor: '#9eab00',
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image_check: {
    height: 20,
    width: 20,
  },
  bell_view: {
    flexDirection: 'row',
  },
  bell_button: {
    flex: 1,
    height: 50,
    backgroundColor: 'blue',
    borderRadius: 10,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image_bell: {
    height: 30,
    width: 30,
  },
  centered_view: {
    backgroundColor: '#00000099',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bell_modal: {
    height: 200,
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bell_body: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bell_row: {
    flexDirection: 'row',
    flex: 1,
  },
  bell_input: {
    width: 50,
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    margin: 10,
    textAlign: 'center',
    fontSize: 20,
    borderRadius: 5,
  },
  bell_button_cancel: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bell_button_ok: {
    flex: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
