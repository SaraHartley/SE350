//template from https://blog.logrocket.com/react-native-form-validations-with-formik-and-yup/ and Youtube Channel "Pradip Debnath"
//SignInScreen.js
import React, {useState,useEffect} from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
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
  Image,
  TouchableOpacity
} from 'react-native'
import SignUp from './SignUpScreen'
import * as google2 from 'expo-google-app-auth';

const SignInScreen = ({navigation}) => {
const[oauth,setOauth]=useState(false);
  
  useEffect(()=>{
  if (oauth){
    alert(`oauth is ${oauth}`);
    setOauthFalse();
  }})

  function setOauthFalse(){
    setOauth(false);
    //alert(`inside setOauthFalse, oauth is ${oauth}`);
    navigation.navigate("Welcome");
  }  
  async function signInWithGoogleAsync() { 
    try {
        const result = await google2.logInAsync({
            iosClientId: "642601661518-3v6o437skkh4ottn4ktsrt3j39f0eiiq.apps.googleusercontent.com",
            androidClientId: "642601661518-n6t866vl5hn2m3gduq2ad3lr8b7vkuep.apps.googleusercontent.com",
            scopes: ['profile', 'email'],
        });

        if (result.type === 'success') {
            console.log("success");
            setOauth(true);
            return result.accessToken;
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          return { error: true };
    }
  };

  const signInWithGoogle = () => {
    signInWithGoogleAsync()
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        
        <Image source={require('./assets/se350logo.jpg')} style ={{width:150, height:150}} />
        <Text style={{fontSize:40}}>Rorr</Text>

        <View style={styles.loginContainer}>
          <Text>Login Screen</Text>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{ email: '', password: '' }}
            //onSubmit={values => console.log(values)}
            onSubmit={() => navigation.navigate("Welcome")}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, }) => (
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, }) => (
              <>
                <TextInput
                  name="email"
                  placeholder="Email Address"
                  style={styles.textInput}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                />
                {(errors.email && touched.email) &&
                  <Text style={styles.errorText}>{errors.email}</Text>
                }
                <TextInput
                  name="password"
                  placeholder="Password"
                  style={styles.textInput}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry
                />
                {(errors.password && touched.password) &&
                  <Text style={styles.errorText}>{errors.password}</Text>
                }
                <TouchableOpacity style = {{margin:5}}>
                <Button 
                  color="#ffa500"
                  onPress={handleSubmit}
                  title="LOGIN"
                  disabled={!isValid} 
                />
                </TouchableOpacity>
               <TouchableOpacity style = {{margin:5}}>
                <Button
                  color="#ffa500"
                  title="Go to SignUp screen"
                  onPress={()=> navigation.navigate("SignUp")}
                />
                </TouchableOpacity>

                <TouchableOpacity style = {{margin:5}}>
                <Button
                  onPress={() =>  signInWithGoogle() }
                  color="#ffa500"
                  title="Google SignIn"
                />
                </TouchableOpacity>

              </>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </>
  )
}
const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  })
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkgray',
  },
  loginContainer: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
    backgroundColor: '#e6e6e6'
  },
  textInput: {
    height: 40,
    width: '100%',
    margin: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
})
export default SignInScreen
