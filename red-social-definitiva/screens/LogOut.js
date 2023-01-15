import React, { Component } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  Text
} from "react-native";
import firebase from "firebase"



export default class LogOut extends Component{

componentDidMount(){
  firebase.auth().signOut()
  this.props.navigation.replace("Login")
}

render(){
return(
<View> 
<Text>Pantalla de Log Out</Text>
</View>
)}



}
