import React, { Component } from 'react';
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
  Text,
} from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';
import * as Font from 'expo-font';
import firebase from 'firebase';

import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

const appIcon = require('../assets/logo.png');

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      nombre: '',
      apellido: '',
      fontsLoaded: false,
    };
  }
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  registeruser(email, password, nombre, apellido) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredencial) => {
        Alert.alert('Registrado');
        this.props.navigation.replace('Login');
        firebase
          .database()
          .ref('/user/' + userCredencial.user.uid)
          .set({
            email: userCredencial.user.email,
            nombre: nombre,
            apellido: apellido,
          });
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  }

  render() {
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
      const { email, password, nombre, apellido} = this.state;

      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />

          <Text style={styles.appTitleText}>Registro</Text>

          {/* Agrega el código para crear dos entradas de teto más, para nombre y apellido.*/}

          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({ nombre: text })}
            placeholder={'ingrese su nombre '}
            placeholderTextColor={'#FFFFFF'}
          />
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({ apellido: text })}
            placeholder={'ingrese su apellido '}
            placeholderTextColor={'#FFFFFF'}
          />
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({ email: text })}
            placeholder={'ingresar correo electrónico'}
            placeholderTextColor={'#FFFFFF'}
          />
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({ password: text })}
            placeholder={'Ingresar contraseña'}
            placeholderTextColor={'#FFFFFF'}
            secureTextEntry
          />

          {/* Agrega el código para crear una entrada de texto más, para confirmar la contraseña.*/}

          <TouchableOpacity
            style={[styles.button, { marginTop: 20 }]}
            onPress={() =>
              this.registeruser(email, password, nombre, apellido)
            }>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15193c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },

  appTitleText: {
    color: 'white',
    textAlign: 'center',
    fontSize: RFValue(40),
    fontFamily: 'Bubblegum-Sans',
    marginBottom: RFValue(20),
  },
  textinput: {
    width: RFValue(250),
    height: RFValue(40),
    padding: RFValue(10),
    marginTop: RFValue(10),
    borderColor: '#FFFFFF',
    borderWidth: RFValue(4),
    borderRadius: RFValue(10),
    fontSize: RFValue(15),
    color: '#FFFFFF',
    backgroundColor: '#15193c',
    fontFamily: 'Bubblegum-Sans',
  },
  button: {
    width: RFValue(250),
    height: RFValue(50),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: RFValue(30),
    backgroundColor: 'white',
    marginBottom: RFValue(20),
  },
  buttonText: {
    fontSize: RFValue(24),
    color: '#15193c',
    fontFamily: 'Bubblegum-Sans',
  },
});
