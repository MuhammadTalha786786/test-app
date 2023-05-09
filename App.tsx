import { View, Text } from 'react-native'
import React, { useState } from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/screens/login/Login';
const AppStack = createStackNavigator();

const App = () => {

 
  return (
    <NavigationContainer>
    <AppStack.Navigator
      header="none"
      screenOptions={{
        headerShown: false,
      }}>
     
        <>
        
          <AppStack.Screen name="Login" component={Login} />
         
        </>
    
    </AppStack.Navigator>
  </NavigationContainer>
  )
}

export default App