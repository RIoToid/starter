import 'react-native-gesture-handler';
import React from "react";
import {StyleSheet, Text, View, Image} from "react-native";
import Splash from "./screens/Splash";
import ToDo from "./screens/ToDo";
import Done from "./screens/Done";


import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


// import stack navigator --> root
//import bottom navigator

const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return(
    <Tab.Navigator
      screenOptions={({route}) =>(
        {tabBarIcon: ({focused, size, color}) => {
          let imageSource;
          if (route.name ==="To-Do"){
            imageSource = require("../assets/starter-list.webp");
            size= focused? 25 : 20;
          }else if(route.name === "Done"){
            imageSource = require("../assets/starter-done.png");
            size= focused? 25 : 20;
          }
          return (
            <Image 
              style = {styles.tabImage}
              source={imageSource}
              size={size}
              color={color}
            />
          )
        }}
      )}
    >
      <Tab.Screen 
        name= "To-Do"
        component={ToDo} //to create screen and import
      />
      <Tab.Screen 
        name="Done"
        component={Done}
      />
    </Tab.Navigator>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen 
          name="Splash"
          component={Splash}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen 
          name="My Tasks"
          component={HomeTabs} //to implement funtion HomeTabs
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  tabImage: {
    resize: "contain",
    height: 25,
    width: 25,
  }
})

export default App;