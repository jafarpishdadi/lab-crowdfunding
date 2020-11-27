import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Intro from '../screens/Intro';
import SplashScreen from '../screens/SplashScreen';
import Login from '../screens/Login';
import Profile from '../screens/Profile';
import Register from '../screens/Register';
import OTPVerification from '../screens/OTPVerification';
import PasswordUpdate from '../screens/PasswordUpdate';
import ProfileEdit from '../screens/ProfileEdit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from '../screens/Home';
import Donation from '../screens/Donation';
import Colors from '../styles/Colors';
import Payment from '../screens/Payment';
import DonationDetail from '../screens/DonationDetail';
import Help from '../screens/Help';
import Statistic from '../screens/Statistic';
import Inbox from '../screens/Inbox';
import DonationHistory from '../screens/DonationHistory';
import DonationCreate from '../screens/DonationCreate';


const Stack = createStackNavigator()
const Tab = createMaterialBottomTabNavigator()

const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="ProfileEdit" component={ProfileEdit} options={{ headerShown: true }} />
      <Stack.Screen name="Help" component={Help} options={{ headerShown: true }} />
    </Stack.Navigator>
  )
}

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Donation" component={Donation} options={{ headerShown: true }} />
      <Stack.Screen name="Payment" component={Payment} options={{ headerShown: true }} />
      <Stack.Screen name="DonationDetail" component={DonationDetail} 
        options={{ 
          headerShown: true, 
          headerTransparent: true, 
          title: '', 
          headerTintColor: 'white' 
        }} 
      />
      <Stack.Screen name="Statistic" component={Statistic} options={{ headerShown: true }} />
      <Stack.Screen name="DonationHistory" component={DonationHistory} options={{ headerShown: true, title: 'Donation History' }} />
      <Stack.Screen name="DonationCreate" component={DonationCreate} options={{ headerShown: true, title: 'Create Fundraise' }} />
    </Stack.Navigator>
  )
}

const DashboardTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Inbox') {
            iconName = focused ? 'chat-processing' : 'chat-processing-outline';
          } else if (route.name === 'ProfileTab') {
            iconName = focused ? 'account' : 'account-outline';
          }

          // You can return any component that you like here!
          return <MaterialCommunityIcons name={iconName} size={26} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>

      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={Inbox}
        options={{
          tabBarLabel: 'Inbox',
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  )
}

const MainNavigation = ({ initialRouteName }) => {
  
  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      <Stack.Screen name="Intro" component={Intro} options={{ headerShown: false}} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false}} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false}} />
      <Stack.Screen name="OTPVerification" component={OTPVerification} options={{ headerShown: true, title: 'Email Verification'}} />
      <Stack.Screen name="PasswordUpdate" component={PasswordUpdate} options={{ headerShown: true, title: 'Account Security'}} />
      <Stack.Screen name="DashboardTab" component={DashboardTab} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

const AppNavigation = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [initialRoute, setInitialRoute] = useState('Intro')

  useEffect(() => {
    const getDataStorage = async () => {
      try {
        let isFreshInstall = await AsyncStorage.getItem('seen-intro')
        
        if (isFreshInstall) {
          setInitialRoute('DashboardTab')
        }

        setTimeout(() => {
          setIsLoading(!isLoading)
        }, 3000)
      
      } catch (err) {
        console.log("AppNavigation -> err", err)
      }
    }

    getDataStorage()
  }, []) 

  if (isLoading) {
    return <SplashScreen />
  }
  
  return (
    <NavigationContainer>
      <MainNavigation initialRouteName={initialRoute} />
    </NavigationContainer>
  )
}

export default AppNavigation
