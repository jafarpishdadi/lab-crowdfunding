import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Intro from '../screens/Intro/index';
import SplashScreen from '../screens/SplashScreen/index';
import Login from '../screens/Login/index';
import Profile from '../screens/Profile';
import Register from '../screens/Register';
import OTPVerification from '../screens/OTPVerification';
import PasswordUpdate from '../screens/PasswordUpdate';
import ProfileEdit from '../screens/ProfileEdit';


const Stack = createStackNavigator()

const MainNavigation = () => (
  <Stack.Navigator>
    <Stack.Screen name="Intro" component={Intro} options={{ headerShown: false}} />
    <Stack.Screen name="Login" component={Login} options={{ headerShown: false}} />
    <Stack.Screen name="Register" component={Register} options={{ headerShown: false}} />
    <Stack.Screen name="OTPVerification" component={OTPVerification} options={{ headerShown: true, title: 'Email Verification'}} />
    <Stack.Screen name="PasswordUpdate" component={PasswordUpdate} options={{ headerShown: true, title: 'Account Security'}} />
    <Stack.Screen name="Profile" component={Profile} options={{ headerShown: true, title: 'My Profile'}} />
    <Stack.Screen name="ProfileEdit" component={ProfileEdit} options={{ headerShown: true, title: 'Profile Setting'}} />
  </Stack.Navigator>
)

const AppNavigation = () => {
  
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(!isLoading)
    }, 3000)
  }, [])

  if (isLoading) {
    return <SplashScreen />
  }
  
  return (
    <NavigationContainer>
      <MainNavigation />
    </NavigationContainer>
  )
}

export default AppNavigation
