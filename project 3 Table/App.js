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
  TouchableOpacity,
  Buffer
} from 'react-native'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { Table, Row, Rows, TableWrapper, Cell} from 'react-native-table-component';

import { Ionicons } from '@expo/vector-icons';
//import { SafeAreaView } from 'react-native-safe-area-context';
import SignUp from './SignUpScreen'
import SignInScreen from './SignInScreen'

const NewPostScreen = ({navigation}) => {

  function getUsersData(){
    //search if either username already in DB
    console.log("inside getUSersData");
    console.log("\n");
    var value = true;
    var tempResponse = {};
    fetch('http://192.168.254.79:3000/rorrUsers')
      .then(response => response.json())
      //.then(users => console.log())
      .then(users => {
        var count = 0;
        setTableData([]);
        var tempArray = [];
        var tempHeadArray =[];
        for ( var xObject in users){
          count++;
          var tempObj =users[xObject];
          console.log("\n");
          console.log(tempObj);
          
          //set table head
          setTableHead([]);
          tempHeadArray = ["Email","Select"];
          console.log(tempHeadArray);
          setTableHead(tempHeadArray);

          //set table data
          var tempVal = tempObj.rorrEmail;
          tempArray.push([tempVal, "a"]);
          console.log(tempArray);
          setTableData(tempArray);
          
        }      
      })
  };
  async function callSetSetting(){
    console.log("inside callSetSetting");
    getUsersData();
    /*console.log(inputName);
    //tableHead =['workout', 'Head2', 'Head3', 'Head4'];
    setSetting(inputName);
    
    if (inputName=="Outdoors"){
      console.log({setting});
      getOutdoorsData();
      console.log("return from getData");

    }else if (inputName=="Racing"){
      console.log({setting});
      getRacingData();

    }else if (inputName=="Helicopter"){
      console.log({setting});
      getHelicopterData();
    }*/
  }
  async function callSetName(index){
    console.log("inside callSetName");
    console.log(index);  
    var myVal = (tableData[index]); 
    console.log(myVal);
    var myVal2 = myVal[0];
    console.log(myVal2);
    setUserChoice(myVal2);
    
  }
  //const stuff
  const [tweet, setTweet] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tableHead,setTableHead] = React.useState([]);
  const [tableData,setTableData] = React.useState([[]]);
  const [userChoice, setUserChoice] = React.useState("No choice has been made.");

  const onPostTweet = () => {
    console.log(tweet);
    console.log(imageUrl);
  }

  //const navigation = NavigationContainer();

  const goBack = () => {
    navigation.navigate('Welcome');
  };

  const revenantPic='http://boomstickcomics.com/wp-content/uploads/2015/07/the_revenant__2015__movie_poster_by_nabilstevieg-d8jq7yv.jpg';
  const madPic='https://buzz.tt/media/posters/857/posters_2_1500.jpg';
  const martianPic='http://www.blackfilm.com/read/wp-content/uploads/2015/08/The-Martian-Poster-2.jpg';
  const jurassicPic='https://image.tmdb.org/t/p/original/XiyoA8Kk87UQ4svKRCRWepjIzf.jpg';
  const myPic='http://is5.mzstatic.com/image/thumb/Music/v4/c3/98/92/c3989235-6a19-61b1-7ebb-753d800b07ee/source/100000x100000-999.jpg';
  const lemonadePic='https://pyxis.nymag.com/v1/imgs/245/4b9/b4496eda47e6c7c641cc7fa774498cab82-25-beyonce-lemonade-cover.rsquare.w700.jpg';
  const badPic='https://images-na.ssl-images-amazon.com/images/I/714pe6yLuKS._SL1200_.jpg';
  const galwayPic='https://musicnotesworld.com/wp-content/uploads/2017/04/ed-sheeran-galway-girl.png';
  
  
  const Movies=[
      {
        id:1,
        name:'The Revenant',
        picture: revenantPic,
        price: 2,
      },
      {
        id:2,
        name:'Mad Max Fury Road',
        picture: madPic,
        price: 4,
      },
      {
        id:3,
        name: 'The Martian',
        picture: martianPic,
        price: 6,
      },
      {
        id:4,
        name: 'Jurassic World',
        picture: jurassicPic,
        price: 8,
      },
    ]
    const Music=[
      {
        id:5,
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
    const element = (data, index) => (
      //<TouchableOpacity onPress={() => alert(index)}>
      <TouchableOpacity onPress={()=>callSetName(index)}>
  
        <View style={styles.btn}>
          <Text style={styles.btnText}>button</Text>
  
        </View>
      </TouchableOpacity>
    );
    const GridView=({name,picture,price})=>(
      <View style={styles.gridStyle}>
        <TouchableOpacity onPress={()=>alert(`${name} is $${price}.00`)}>
        <Text style={styles.gridText}>{name}</Text>
        <Image source={{uri: picture}}  
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
    const [index, setIndex] = React.useState(0);
    const SecondRoute = () => (
      <SafeAreaView style={styles.MainContainer}>
        <TouchableOpacity style = {{margin:5}}>
                <Button
                  color="#ffa500"
                  title="Refresh"
                  onPress={() =>  callSetSetting() }
                />
        </TouchableOpacity>
      <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
        <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
        {/*<Rows data={tableData} textStyle={styles.text}/>*/}
        {
            tableData.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                {
                  rowData.map((cellData, cellIndex) => (
                    <Cell key={cellIndex} data={cellIndex === 1 ? element(cellData, index) : cellData} textStyle={styles.text}/>
                  ))
                }
              </TableWrapper>
            ))
          }
      </Table>
    </SafeAreaView>
    );
    const ThirdRoute = () => (
        <SafeAreaView style={styles.MainContainer}>
        <Text>{userChoice}</Text>
        <Text>Value of Global Variable is: {global.MyVar}</Text>
        </SafeAreaView>
      );

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
  head: { 
    height: 60, 
    backgroundColor: '#f1f8ff' 
  },
  text: { 
    margin: 6 
  },
  btn: { 
    width: 58, 
    height: 18, 
    backgroundColor: '#78B7BB',  
    borderRadius: 2 
  },
  btnText: { 
    textAlign: 'center', 
    color: '#fff' 
  },
  row: { flexDirection: 'row', 
  backgroundColor: '#FFF1C1' },
  container2: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#78B7BB'

  },
})

export default NewPostScreen
