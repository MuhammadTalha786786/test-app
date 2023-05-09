import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/login/Login';
import RegisterScreen from './src/screens/register/Register';
import Home from './src/screens/home/Home';
import { selectIsLoggedIn } from './src/redux/auth/AuthReducer';
import { useSelector } from 'react-redux';
const AppStack = createStackNavigator();

const App = () => {
  const appState  =  useSelector((state:any)=>state.userAuthReducer)
  console.warn(appState.isLoggedIn)


  return (
    <NavigationContainer>
      <AppStack.Navigator
        header="none"
        screenOptions={{
          headerShown: false,
        }}>

        <>

          {
            appState.isLoggedIn ? <AppStack.Screen name="Home" component={Home} /> : <>
              <AppStack.Screen name="Login" component={Login} />
              <AppStack.Screen name="Register" component={RegisterScreen} /></>
          }







        </>

      </AppStack.Navigator>
    </NavigationContainer>
  )
}

export default App