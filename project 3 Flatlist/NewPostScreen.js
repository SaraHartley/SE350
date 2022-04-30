///NewPostScreen.js
//template from https://blog.logrocket.com/react-native-form-validations-with-formik-and-yup/ and Youtube Channel "Pradip Debnath"
import React, {useState} from 'react'
import { Formik } from 'formik';
import * as yup from 'yup';
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
  useWindowDimensions, 
  Image,
  FlatList, 
  TouchableOpacity
} from 'react-native'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { Ionicons } from '@expo/vector-icons';
import Axios from 'axios';
//import { SafeAreaView } from 'react-native-safe-area-context';
import SignUp from './SignUpScreen'

const NewPostScreen = ({navigation}) => {
  //const stuff
  const [tweet, setTweet] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [users, setUsers] = useState([]);
  const [emailChoice, setEmailChoice] = useState("No Account Chosen");

  
  function onPostTweet(inputTweet){
    console.log(inputTweet);
    setTweet(inputTweet);
  }
  function getUsers(){
    console.log("inside getUsers");
    var tempArray = [];
    fetch('http://192.168.254.79:3000/rorrUsers2')
      .then(response => response.json())
      //.then(users => console.log(users))
      .then(results => {
        console.log(results);
        setUsers(results);
      })
  };
    
  function callSetUsers(){
    getUsers();
    console.log(users);
  }
  function callSetEmailChoice(email){
      console.log(email);
      setEmailChoice(email);
  }
    
  //const navigation = NavigationContainer();

  const goBack = () => {
    navigation.navigate('Welcome');
  };

    
    const lemonadePic='https://pyxis.nymag.com/v1/imgs/245/4b9/b4496eda47e6c7c641cc7fa774498cab82-25-beyonce-lemonade-cover.rsquare.w700.jpg';

    
    
    const GridViewUsers=({email})=>(
      <View style={styles.gridStyle}>
        <TouchableOpacity onPress={()=>callSetEmailChoice(email)}>
        <Text style={styles.gridText}>{email}</Text>
        <Image source={{uri: lemonadePic}}  
         style={{width: 50, height: 50}} />  
        </TouchableOpacity>
      </View>
    );
    
    const GridViewPosts=({email})=>(
      <View style={styles.gridStyle}>
        <TouchableOpacity onPress={()=>alert(`${email}`)}>
        <Text style={styles.gridText}>{email}</Text>
        <Image source={{uri: lemonadePic}}  
         style={{width: 50, height: 50}} />  
        </TouchableOpacity>
      </View>
    );
    const layout = useWindowDimensions();
    const FirstRoute = () => (
      <SafeAreaView style={styles.container2}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={goBack}>
          <Ionicons name="close-sharp" size={35} color={'#c95314'} />
        </TouchableOpacity>
        
      </View>
      <View style={styles.newTweetContainer}>
      <Image 
        source={{ uri: 'https://cdn.discordapp.com/attachments/930280305363943506/954570868388954162/se350logo.jpg' }}
        style={{
          width: 50,
          height: 50, 
          borderRadius: 50, 
        }}
      />
      <Formik
        validationSchema={postValidationSchema}
        initialValues={{ post: ''}}
        //onSubmit={values => console.log(values)}
        //onSubmit={() => navigation.navigate("Welcome")}
        onSubmit={(values) => onPostTweet(values.post)}

      >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, }) => (
        <>
        <View style={styles.inputContainer}>
        <TextInput
          name = "post"
          placeholder={"What's on your mind?"}
          style={styles.tweetInput}
          //onChangeText={setTweet}
          onChangeText={handleChange('post')}
          onBlur={handleBlur('post')}
          value={values.post}
          numberOfLines={3}
          multiline={true}
        />
        {(errors.post && touched.post) &&
                  <Text style={styles.errorText}>{errors.post}</Text>
        }
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Rorr</Text>
        </TouchableOpacity>
        </View>
        </>
            )}
          </Formik>
      </View>
    </SafeAreaView>
    );
    
    
    const SecondRoute = () => (
      <SafeAreaView style={styles.MainContainer}>
        <Button  
          color="#ffa500"
          title="Refresh Screen"
          onPress={()=> callSetUsers()} 
       />
      <FlatList
      data={users}
      renderItem={({item})=> <GridViewUsers email={item.rorrEmail}/>}
      keyExtractor={(item) => item.rorrId}
      numColumns={1}
      key={item=> item.rorrId}
      />
      </SafeAreaView>
    );

    const ThirdRoute = () => (
        <SafeAreaView style={styles.MainContainer}>
        <Text>{emailChoice}</Text>
        <Text>{tweet}</Text>

        {/*<FlatList
        data={Music}
        renderItem={({item})=> <GridViewPosts name={item.name} picture={item.picture} price={item.price}/>}
        keyExtractor={item => item.id}
        numColumns={2}
        key={item=> item.id}
        />*/}
        </SafeAreaView>
      );
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
    { key: 'first', title: 'New Post' },
    { key: 'second', title: 'Users' },
    { key: 'third', title: 'Users Posts' },

    ]);
   
    const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    });
   
    const renderTabBar = props => (
        <TabBar
            {...props}
            activeColor={'white'}
            inactiveColor={'black'}
            style={{marginTop:25,backgroundColor:'red'}}
        />
    );  
  return (
    <>
      <StatusBar barStyle="dark-content" />
      {/*<SafeAreaView style={styles.container}>
          <Text>New Post Screen</Text>
          <Button
            color="#ffa500"
            title="Welcome"
            onPress={()=> navigation.navigate("Welcome")}
        />
  </SafeAreaView>*/}
      <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
      />
    </>
  )
}
const postValidationSchema = yup.object().shape({
  post: yup
    .string()
    .min(1, ({ min }) => `Post must be at least ${min} characters`)
    .required('Post is Required'),
})

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  MainContainer:{
    flex:1,
    backgroundColor: 'white'
  },
  gridStyle:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    height: 100,
    margin: 2,
    backgroundColor: '#00C853'
  },
  gridText:{
    fontSize:24,
    color: 'white'
  },
  //new style stuff goes here
  container2: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#c95314',
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 15
  },
  newTweetContainer: {
    flexDirection: 'row',
    padding: 15,
  },
  inputContainer: {
    marginLeft: 10,
  },
  tweetInput: {
    height: 100,
    maxHeight: 300,
    fontSize: 18,
    textAlignVertical: 'top',
  },
  imageInput: {
    
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
})

export default NewPostScreen
