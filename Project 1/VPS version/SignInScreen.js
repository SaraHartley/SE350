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
  
 /* useEffect(()=>{
  if (oauth){
    setOauthFalse();
  }})

  function setOauthFalse(){
    setOauth(false);
    navigation.navigate("Welcome");
  }*/
  useEffect(()=>{
    if (oauth){
      console.log("inside useEffect()");
      console.log(`1st temp function oauth is ${oauth}`);
      setOauth(false);
      console.log(`2nd temp function oauth is ${oauth}`);
      navigation.navigate("Welcome");
      console.log(`after navigation oauth is ${oauth}`);

  }});  
  async function signInWithGoogleAsync() { 
    try {
        const result = await google2.logInAsync({
            iosClientId: "642601661518-3v6o437skkh4ottn4ktsrt3j39f0eiiq.apps.googleusercontent.com",
            androidClientId: "642601661518-n6t866vl5hn2m3gduq2ad3lr8b7vkuep.apps.googleusercontent.com",
            scopes: ['profile', 'email'],
        });

        if (result.type === 'success') {
            console.log("success");
            //setOauth(true);
            //return result.accessToken;
            const userEmail = result.user.email;
            console.log(userEmail);
            getOTest(userEmail);  
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
 function getOTest(inputEmail){
    //print out input value from user
    console.log(inputEmail);
    console.log("\n");

    //set flag variable
    var value = true;
    var tempResponse = {};

    //read table data
    fetch('http://34.68.45.171:3000/rorrUsers')
      .then(response => response.json())

      //search if username already in DB
      .then(users => {
        var count = 0;

        //loop through db objects
        for ( var xObject in users){
          count++;
          var tempObj =users[xObject];
          console.log("\n");
          console.log(tempObj);

          var tempEmail =tempObj.rorrEmail;
          console.log(tempEmail);

          //compare user input to current object username
          if (tempEmail === inputEmail){
            console.log('Email already exists');
            //set flag variable to true
            value = true;
            console.log(value);
            break;

          }else{
            console.log('Email does not exist already');
            value = false;
            console.log(value);
          }
        }

        //change variable oauth to true so the user 
                //is redirected to welcome page 
        if (value===true){
          console.log(`dbtest oauth is ${oauth}`);
          setOauth(true);
        }else{
        //alert user that they used invalid email
          alert("The email you used is not in a registered user.");
          }
      })
  };

  function getTest(inputEmail,inputPassword){
    console.log(inputEmail,inputPassword);
    console.log("");
    var value = false;
    var tempResponse = {};
    fetch('http://34.68.45.171:3000/rorrUsers')
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
          alert("The username and/or password is not recognized. Please check the capitalization.");

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
