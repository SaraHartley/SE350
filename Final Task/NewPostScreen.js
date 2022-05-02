///NewPostScreen.js
//template from https://blog.logrocket.com/react-native-form-validations-with-formik-and-yup/ and Youtube Channel "Pradip Debnath"
//https://medium.com/featurepreneur/asyncstorage-in-react-native-with-expo-ff82a3496c9f
//https://medium.com/@luisbajana/saving-objects-using-asyncstorage-2d8696275667
import React, {useRef,useState,useEffect} from 'react'
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
  TouchableOpacity,
  AppState
} from 'react-native'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { Ionicons } from '@expo/vector-icons';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { SafeAreaView } from 'react-native-safe-area-context';
import SignUp from './SignUpScreen'

const NewPostScreen = ({navigation}) => {
  //const stuff
  const [tweet, setTweet] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [users, setUsers] = useState([]);
  const [emailChoice, setEmailChoice] = useState("No Account Chosen");
  const [userTweets, setUserTweets] = useState([]);
  const [dbLikes, setDbLikes] = useState([]);

  
  function onPostTweet(inputTweet){
    console.log(inputTweet);
    setTweet(inputTweet);
    var currentUser = global.MyVar;
    postTweet(currentUser,inputTweet)
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
  function getTweets(){
    console.log("inside getTweets");
    var tempArray = [];
    fetch('http://192.168.254.79:3000/rorrTweets')
      .then(response => response.json())
      //.then(users => console.log(users))
      .then(results => {
        //console.log(results);
        for ( var xObject in results){
          var tempObj =results[xObject];
          console.log(tempObj);
          if(emailChoice == tempObj.tweetEmail){
            tempArray.push(tempObj);

          }       
        }
        console.log(tempArray);
        setUserTweets(tempArray);
      })
  };
  function postTweet(currentUser,inputTweet){
    console.log("inside postTweet");
    console.log(currentUser,inputTweet);
    var initialLikes = 0;
    var tempArray = [];
    Axios.post('http://192.168.254.79:3000/newPost',{
      email: currentUser,
      content: inputTweet,
      likes: initialLikes,
    })
    .then(function (response) {
      //console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  };
    
  function callSetUsers(){
    getUsers();
    console.log(users);
  }
  function callSetEmailChoice(email){
      console.log(email);
      setEmailChoice(email);
      getTweets();
  }
    
  //const navigation = NavigationContainer();

  const goBack = () => {
    navigation.navigate('Welcome');
  };

    
    const lemonadePic='https://media.discordapp.net/attachments/930280305363943506/954570868388954162/se350logo.jpg';

  //Cookie stuff
  const getData = async(keyid)=>{
    console.log("inside getData");
    const product = { 'itemId' : keyid};
    const existingProducts = await AsyncStorage.getItem('products');
    let newProduct = JSON.parse(existingProducts);
    if( !newProduct ){
      newProduct = [];
    }
    newProduct.push( product);
    await AsyncStorage.setItem('products', JSON.stringify(newProduct) )
      .then( ()=>{
      console.log('It was saved successfully');
      } )
      .catch( ()=>{
      console.log('There was an error saving the product');
      } )

    //await AsyncStorage.setItem( "mykey", "myValue");
    console.log(await AsyncStorage.getItem('products'));

  }
  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('products')
    } catch(e) {
      // remove error
    }
    console.log('Done.')
  }

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    //temporary
    console.log("inside useEffect");
    
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has come to the foreground!");
        
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log("AppState", appState.current);
      if (appState.current.match(/inactive|background/))
      {
        console.log("send data here");
        getLikesData();

      }
    });
    return () => {
      subscription.remove();
    };
  }, []);

  async function callPostCookieData(results){
    console.log("inside callPostCookieData");
    console.log(results);
    var tempArray = await AsyncStorage.getItem('products');
    var newTempArray = JSON.parse(tempArray);
    if (newTempArray != null){
      console.log("calling other stuff: ",newTempArray);
      for(var item in newTempArray){
        var tempObj = newTempArray[item];
        var id = tempObj.itemId;
        var numLikes;
        for (var item2 in results){
          tempTweetId = (results[item2]).tweetId;
          console.log(tempTweetId);
          if (id == tempTweetId){
            numLikes = (results[item2]).tweetLikes;
            console.log("numLikes",numLikes);
          }

        }
			  var newNumLikes = numLikes + 1;
        console.log("newNumLikes: ",newNumLikes);
        postLikes(id,newNumLikes);
      }
      removeValue();
    }else{
      console.log("array is null",newTempArray)
    }
  }
  function getLikesData(){
    console.log("inside getLikesData");
    fetch('http://192.168.254.79:3000/tweetLikes')
      .then(response => response.json())
      .then(results => {
        console.log("results in getLikesData: ",results);
        //setDbLikes(results);
        callPostCookieData(results);
      })
  };

  function postLikes(inputId,inputLikes){
    console.log("inside postLikes");
    console.log(inputId,inputLikes);
    Axios.post('http://192.168.254.79:3000/updateLikes',{
      id: inputId,
      likes: inputLikes,
    })
    .then(function (response) {
      //console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  };


//Return stuff
    
    const GridViewUsers=({email})=>(
      <View style={styles.gridStyle}>
        <TouchableOpacity onPress={()=>callSetEmailChoice(email)}>
        <Text style={styles.gridText}>{email}</Text>
        <Image source={{uri: lemonadePic}}  
         style={{width: 50, height: 50}} />  
        </TouchableOpacity>
      </View>
    );
    
    const GridViewPosts=({id, content})=>(
      <View style={styles.gridStyle}>
        <TouchableOpacity onPress={()=>getData(id)}>
        <Text style={styles.gridText}>{content}</Text>
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
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleSubmit}>
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
        <Text>Tweets for {emailChoice}</Text>
        <Text>{}</Text>
        <Button
          onPress={()=>getData(5)}
          title="add item"
          color="#841584"
        />
        <Button
          onPress={()=>removeValue()}
          title="remove item"
          color="#841584"
        />
        <FlatList
        data={userTweets}
        renderItem={({item})=> <GridViewPosts id={item.tweetId} content={item.tweetContent}/>}
        keyExtractor={item => item.tweetId}
        numColumns={1}
        key={item=> item.tweetId}
        />
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
