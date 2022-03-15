import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View,Button,SafeAreaView,AppRegistry,TextInput } from 'react-native';
import React,{Component} from 'react';
 //iadd rqact native server libraryu
// import routes from './routes'

class App extends Component{
  onPressButton=()=>{
    alert('alert from function test')
    console.log("user pressed button from function test")

    fetch('http://192.168.254.79:3000/users')
    //fetch('http://localhost:3000/users')

    .then(response => response.json())
    //.then(users => console.warn(users))
    .then(users => console.log(users))
    //.then(users => alert(users))
    //alert(users)
    

  };
  
  render(){
    //const [text,onChangeText] = useState("");

    return (
      <SafeAreaView style={styles.container}>
        <Text>Open up App.js to start working on your 350-database-test app!</Text>
        {/*<TextInput>
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        </TextInput>*/}
        <Button
          //onPress={this.test2}
          onPress={this.onPressButton}

          title="Button"
          //onPress={()=>alert('pressed')}
        />
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  };
};
//works!
//function test2(){
//  alert('alert from test2')
//};

//doesn't work
function test(){
  alert('alert from function test')
  console.log("user pressed button from function test")

  //fetch('http://192.168.254.79:3000/users')
  fetch('http://localhost:3000/users')

    .then(response => response.json())
    //.then(users => console.warn(users))
    .then(users => console.log(users))
    //.then(users => alert(users))

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    margin:15,
    borderColor: 'black',
    borderWidth: 1
  },
});

export default App;
