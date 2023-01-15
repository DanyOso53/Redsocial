import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./navigation/DrawerNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/Register" 
import firebase from "firebase"
import {firebaseConfig} from "./config"

if (!firebase.apps.length) 
{ firebase.initializeApp(firebaseConfig); }
else { firebase.app(); }

const Stack = createStackNavigator();
const StackNew = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registro" component={RegisterScreen} />
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
    </Stack.Navigator>
  );
};


export default function App() {
  return (
    
    <NavigationContainer>
      <StackNew />
    </NavigationContainer>
  );
}