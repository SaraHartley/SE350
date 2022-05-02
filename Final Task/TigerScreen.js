//WelcomeScreen.js
//template from https://blog.logrocket.com/react-native-form-validations-with-formik-and-yup/ and Youtube Channel "Pradip Debnath"
import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native'
import SignUp from './SignUpScreen'
import SignInScreen from './SignInScreen'
import LottieView from 'lottie-react-native';



const TigerScreen = ({navigation}) => {
  //const {passVal}=route.params;
  return (
    <>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
        <LottieView
            style={styles.lottie}
            source={require('./assets/tiger.json')}
            autoPlay
        />
        <TouchableOpacity
            style={styles.button}
            onPress={()=> navigation.navigate("SignIn")}>
            <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        
      </View>
    </>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      lottie: {
        width: '90%',
        height: 500
      },
      button: {
        position: 'relative',
        borderRadius: 30,
        backgroundColor: '#c95314',
        marginTop: 15,
        width: 120

      },
      buttonText: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign:'center'
        
      },
    });
export default TigerScreen
