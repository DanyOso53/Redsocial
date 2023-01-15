import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./StackNavigator";
import LogOut from "../screens/LogOut"
import Profile from "../screens/Profile";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    
    <Drawer.Navigator useLegacyImplementation screenOptions={{headerShown:true}}>
      <Drawer.Screen name="Inicio" component={StackNavigator} />
      <Drawer.Screen name="Perfil" component={Profile} />
      <Drawer.Screen name="LogOut" component={LogOut}/>
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
