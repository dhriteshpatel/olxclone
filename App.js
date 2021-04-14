import React,{useState,useEffect} from 'react';
import {View, Text, StatusBar, SafeAreaView, StyleSheet} from 'react-native';
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen'
import CreateAdScreen from './screens/CreateAdScreen'
import ListItemScreen from './screens/ListItemScreen'
import AccountScreen from './screens/AccountScreen'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer,  DefaultTheme as  DefaultThemeNav} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather'
import auth from '@react-native-firebase/auth'

const Stack = createStackNavigator();

const Mytheme = {
  ...DefaultThemeNav,
  roundness: 2,
  colors: {
    ...DefaultThemeNav.colors,
    background: 'white',
  },
};

const Navigation = () =>{
  const [user, setUser] = useState('')
  useEffect(()=>{
   const unsubscribe = auth().onAuthStateChanged((userExist)=>{
      if(userExist){
          setUser(userExist)
      }else{
          setUser('')
      }
    })
    return unsubscribe
  },[])
  return (
    <NavigationContainer theme={Mytheme}>
      {user ? <TabNavigation /> :<AuthNavigation />}
     </NavigationContainer>
  )
}

const AuthNavigation = () =>{
  return(
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Signup" component={SignupScreen} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}

const Tab = createBottomTabNavigator();

const TabNavigation = () =>{
  return(
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({color}) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'home'
           
        } else if (route.name ==='Create'){
          iconName ='plus-circle'
        } else if(route.name ==='Account'){
          iconName ='user'
        }
        return <View><Feather name={iconName} size ={35} color={color} /></View>;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'deepskyblue',
      inactiveTintColor: 'gray',
    }}
    > 
      <Tab.Screen name="Home" component={ListItemScreen} options={{title:""}}/>
      <Tab.Screen name="Create" component={CreateAdScreen} options={{title:""}} />
      <Tab.Screen name="Account" component={AccountScreen} options={{title:""}} />
    </Tab.Navigator>
  )
}


const App = () => {

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: 'deepskyblue',
    },
  };



return (
    <>
     <PaperProvider theme={theme}>
     <StatusBar barStyle="dark-content" backgroundColor="deepskyblue" />
     <View style={styles.container}>
       <Navigation />
      {/* <LoginScreen />  */}
      {/* <SignupScreen /> */}
      {/* <CreateAdScreen /> */}
      {/* <ListItemScreen /> */}
       </View>
      </PaperProvider> 
    </>
  );
};



const styles = StyleSheet.create({
  container: {
    flex:1, 
    backgroundColor:'#fff'
  }
})

export default App;