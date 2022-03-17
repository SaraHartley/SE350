import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button, TextInput } from 'react-native';
//import { useState } from 'react/cjs/react.production.min';
import React, {useState,useEffect} from 'react';

//npm install axios --save
import axios from 'axios';


//resources: https://reactnativecode.com/react-native-insert-text-input-data-to-mysql-server/
export default function App(){
  
  const[name, setName]=useState("");
  const[email, setEmail]=useState("");
  const[phoneNumber, setPhoneNumber]=useState("");

  //const[isSubmit,setIsSubmit]=useState(false);
  function InsertDataIntoServer(inputName,inputEmail, inputPhoneNumber){
    alert("Button Pressed")
    var TextInputName = inputName;
    var TextInputEmail = inputEmail ;
    var TextInputPhoneNumber = inputPhoneNumber;  
    alert(`TextInputName: ${TextInputName}, email: ${TextInputEmail}, phone number:${TextInputPhoneNumber}`)

    fetch('http://localhost/TestFolder/submit_user_info.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        name: TextInputName,

        email: TextInputEmail,

        phone_number: TextInputPhoneNumber

      })

    }).then((response) => response.json())
          .then((responseJson) => {

    // Showing response message coming from server after inserting records.
            //Alert.alert(responseJson);
            alert(`responseJson: ${responseJson}`);  
          }).catch((error) => {
            console.error(error);
          });
  
        }
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />

      <TextInput 
      placeholder="Username" 
      style={styles.input} 
      onChangeText={(text)=> setName(text)}
      />
      <TextInput 
      placeholder="Email" 
      style={styles.input} 
      autoCapitalize= "none"
      onChangeText={(text)=> setEmail(text)}/>
      <TextInput 
      placeholder="Password" 
      style={styles.input} 
      secureTextEntry={true}
      autoCapitalize="none"
      onChangeText={(text)=> setPhoneNumber(text)}
      />
      <View style={styles.buttonContainer}>
        {/*<Button title="Register" onPress={()=> setIsSubmit(true)}/>*/}
        <Button title="Insert Data into Database" onPress={()=>alert(`name: ${name}, email: ${email}, phone number:${phoneNumber}`)}/>
        <Button title="Insert Data into Database" onPress={()=>InsertDataIntoServer(name, email, phoneNumber)}/>
        <Button title="Insert Data into Database" onPress={()=>alert(`name: ${name}, email: ${email}, phone number:${phoneNumber}`)}/>
        
      </View>

      {/*<Button title="Insert Data into Database" onPress={()=>InsertDataIntoServer("Bob", "test@email.com", "0987654321")}/>*/}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    width: "55%",
  },
  buttonContainer:{
    marginTop: 20
  }
});
