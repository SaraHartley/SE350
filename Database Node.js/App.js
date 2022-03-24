
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View,Button,SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
 

const App=({navigation})=> {
  const emailValue ="next@hotmail.com";
  const passwordValue ="password2";
  const fullNameValue ="Santa Claus";

  async function postTest(){
    //console.log(username);
    await fetch('http://192.168.254.79:3000/newUser', {
      method: 'POST', // Here you're saying that you want to make a POST request. Could be any method, like a GET, for example.
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }, // You can specify your requisition headers here. That line is optional.
      body: JSON.stringify({ // Here's the fun part. Put your data here.
        //"username": this.state.name,
        //username: username,
        email: emailValue,
        password: passwordValue,
        fullName: fullNameValue

      })
      
    })
    .then(response => response.json()) 
    .then(serverResponse => console.log(serverResponse))
    .catch((error) => console.warn(error))
  }

  function test(){
    fetch('http://192.168.254.79:3000/rorrUsers')
      .then(response => response.json())
      .then(users => console.log(users))
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Text>Insert data into the database</Text>

      
      
      <Button
        title="Post Button"
        //onPress={()=>alert('pressed')}
        onPress={postTest}
        //onPress={()=>console.log(username)}
      />

      <Text>Get the data from the database</Text>
      
      <Button
        title="Get Button"
        //onPress={()=>alert('pressed')}
        onPress={test}
      />

        <TouchableOpacity style = {{margin:5}}>
            <Button
                color="#ffa500"
                title="Go to SignIn screen"
                onPress={()=> navigation.navigate("SignIn")}
            />
        </TouchableOpacity>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
