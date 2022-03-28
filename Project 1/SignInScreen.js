//template from https://blog.logrocket.com/react-native-form-validations-with-formik-and-yup/ and Youtube Channel "Pradip Debnath"
//SignInScreen.js

//TODO Need to read email and password from DB

import React from 'react'
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

const SignInScreen = ({navigation}) => {

  function getTest(inputEmail,inputPassword){
    console.log(inputEmail,inputPassword);
    console.log("");
    var value = false;
    var tempResponse = {};
    fetch('http://192.168.254.79:3000/rorrUsers')
      .then(response => response.json())
      //.then(users => console.log())
      .then(users => {
        //var x =
        var count = 0;
        //for (var key of Object.keys(users)){
        for ( var xObject in users){
          count++;
          var tempObj =users[xObject];
          //var tempObj =users[xObject];

          console.log(tempObj);

          var tempEmail =tempObj.rorrEmail;
          var tempPassword =tempObj.rorrPassword;
          console.log(tempEmail);
          console.log(tempPassword);
          if (tempEmail === inputEmail){
            console.log('Email matches');
            if(tempPassword === inputPassword){
              console.log('password matches');
              value= true;
              console.log(value);
              navigation.navigate("Welcome");
              break;

            }else{
              console.log('password not match');
              value=false;
              console.log(value);
              //alert("The username and/or password is not recognized.")
            }
          }else{
            console.log('Email NOT match');
            value =false;
            console.log(value);
            //alert("The username and/or password is not recognized.")

          }


          /*if (key === 'rorrEmail'){
            console.log(key);
            //if (x === inputEmail){
            //  if()
            //}
          }else{
            console.log("email not found");
          }*/
        }
        if (value==false){
          alert("The username and/or password is not recognized.");

        }
      })

      
    
    //console.log(tempResponse);
    //var test= verifyUser("hello");
    //console.log(test);
    //value=test;
    
    
    //return value;
    
  };

  function verifyUser(response){
    console.log("Inside verifyUser");
    console.log(response);
    var value2 = false;
    return value2;
  }

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
            //onSubmit={() => navigation.navigate("Welcome")}
            onSubmit={(values) => getTest(values.email,values.password)}

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
                  color="#ffa500"
                  title="Google SignIn"
                  onPress={()=> navigation.navigate("Welcome")}
                />
                </TouchableOpacity>
                <TouchableOpacity style = {{margin:5}}>
                <Button
                  color="#ffa500"
                  title="Go to DBTest screen"
                  onPress={()=> navigation.navigate("DBTest")}
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
