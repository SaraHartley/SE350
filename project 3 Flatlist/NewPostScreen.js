//Users\krith\Spring2022\350\project3\p1

///WelcomeScreen.js
//template from https://blog.logrocket.com/react-native-form-validations-with-formik-and-yup/ and Youtube Channel "Pradip Debnath"
import React, {useState} from 'react'

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
//import { SafeAreaView } from 'react-native-safe-area-context';
import SignUp from './SignUpScreen'

const NewPostScreen = ({navigation}) => {
  //const stuff
  const [tweet, setTweet] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [users, setUsers] = useState([]);
  
  const onPostTweet = () => {
    console.log(tweet);
    console.log(imageUrl);
  }
  function getUsers(){
    //search if either username already in DB
    console.log("inside getUsers");
    console.log("\n");
    var value = true;
    var tempResponse = {};
    fetch('http://192.168.50.93:3000/rorrUsers2')
      .then(response => response.json())
      //.then(users => console.log())
      .then(users => {
        var count = 0;
        //setTableData([]);
        const tempArray = [];
        var tempHeadArray =[];
        for (var xObject in users){
          count++;
          var tempObj =users[xObject];
          console.log("\n");
          console.log(tempObj);

          tempArray.push({id: count, rorrEmail: tempObj.rorrEmail});
          console.log(typeof tempObj.rorrEmail); //string
          console.log(typeof tempArray); //object
          console.log(typeof tempObj); //object
          //console.log(tempArray); 
          //console.log(Music);
          //console.log(users);         
          //setUsers(tempArray);
          //set table data
          // if (item == tempObj.racingName){
          //   var tempVal = tempObj.racingImage;
          //   console.log(tempVal);
          //   setItemImage(tempVal);
          //   var tempVal2 = tempObj.racingDescription;
          //   console.log(tempVal2);
          //   setItemDescription(tempVal2); 
            
          //}
        }      
      })
  };
  function callSetUsers(){
    alert('hello');
    getUsers();
    }
    
  //const navigation = NavigationContainer();

  const goBack = () => {
    navigation.navigate('Welcome');
  };

    const myPic='http://is5.mzstatic.com/image/thumb/Music/v4/c3/98/92/c3989235-6a19-61b1-7ebb-753d800b07ee/source/100000x100000-999.jpg';
    const lemonadePic='https://pyxis.nymag.com/v1/imgs/245/4b9/b4496eda47e6c7c641cc7fa774498cab82-25-beyonce-lemonade-cover.rsquare.w700.jpg';
    const badPic='https://images-na.ssl-images-amazon.com/images/I/714pe6yLuKS._SL1200_.jpg';
    const galwayPic='https://musicnotesworld.com/wp-content/uploads/2017/04/ed-sheeran-galway-girl.png';
  
    
    const Music=[{ id:5,
        name:'My Everything',
        picture: myPic,
        price: 10,
      },
      {
        id:6,
        name:'Lemonade',
        picture: lemonadePic,
        price: 12,
      },
      {
        id:7,
        name: 'Bad Habits',
        picture: badPic,
        price: 14,
      },
      {
        id:8,
        name: 'Galway Girl',
        picture: galwayPic,
        price: 16,
      },
    ]
    const GridView=({email})=>(
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
        <TouchableOpacity style={styles.button} onPress={onPostTweet}>
          <Text style={styles.buttonText}>Rorr</Text>
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
        <View style={styles.inputContainer}>
        <TextInput
          value={tweet}
          onChangeText={setTweet}
          numberOfLines={3}
          multiline={true}
          style={styles.tweetInput}
          placeholder={"What's on your mind?"}
        />
        <TextInput
          value={imageUrl}
          onChangeText={setImageUrl}
          style={styles.imageInput}
          placeholder={'image url optional'}
        />
        </View>
      </View>
    </SafeAreaView>
    );
    
    
    const SecondRoute = () => (
      <SafeAreaView style={styles.MainContainer}>
        <Text>{users}</Text>
        <TouchableOpacity>
        <Button  color="#ffa500"
                  title="Refresh Screen"
                  onPress={()=> callSetUsers()} 
       />
       </TouchableOpacity>
      <FlatList
      data={users}
      renderItem={({item})=> <GridView email={item.rorrEmail}/>}
      keyExtractor={item => item.id}
      numColumns={1}
      key={item=> item.id}
      />
      </SafeAreaView>
    );

    const ThirdRoute = () => (
        <SafeAreaView style={styles.MainContainer}>
        <FlatList
        data={Music}
        renderItem={({item})=> <GridView name={item.name} picture={item.picture} price={item.price}/>}
        keyExtractor={item => item.id}
        numColumns={2}
        key={item=> item.id}
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
    height: 80,
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
})

export default NewPostScreen
