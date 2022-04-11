//from tutorial: https://www.youtube.com/watch?v=OQlpcqhEIN8&t=2s

//Installations:
//npm install @react-native-async-storage/async-storage@1.15.0


import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput,SafeAreaView,FlatList,TouchableOpacity,Image,AppState } from 'react-native';
import React,{useRef,useState,useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {

  //auto session stuff
  const appState = useRef(AppState.currentState)
  const [appStateVisible, setAppStateVisible] = useState(appState.current)

  useEffect(() => {
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
         getTest();
       }
    });
    return () => {
    subscription.remove();
    };
    }, []);
  

  //grid view stuff
  const animalPic='http://boomstickcomics.com/wp-content/uploads/2015/07/the_revenant__2015__movie_poster_by_nabilstevieg-d8jq7yv.jpg';
  const funnyPic='http://boomstickcomics.com/wp-content/uploads/2015/07/the_revenant__2015__movie_poster_by_nabilstevieg-d8jq7yv.jpg';
  const newsPic='http://boomstickcomics.com/wp-content/uploads/2015/07/the_revenant__2015__movie_poster_by_nabilstevieg-d8jq7yv.jpg';
  const politicalPic='http://boomstickcomics.com/wp-content/uploads/2015/07/the_revenant__2015__movie_poster_by_nabilstevieg-d8jq7yv.jpg';

  const Topics=[
    {
      id:1,
      topic: 'Animal',
      picture: animalPic,
    },
    {
      id:2,
      topic: 'Funny',
      picture: funnyPic,
    },
    {
      id:3,
      topic: 'News',
      picture: newsPic,
    },
    {
      id:4,
      topic: 'Political',
      picture: politicalPic,
    },
  ]
  
  //Database stuff
  async function postTest(inputAnimalCount,inputFunnyCount,inputNewsCount,inputPoliticalCount){
    inputAnimalCount+=animalCounter;
    inputFunnyCount+=funnyCounter;
    inputNewsCount+=newsCounter;
    inputPoliticalCount+=politicalCounter;
    console.log("Inside postTest");
    await fetch('http://192.168.254.79:3000/newCount', {
      method: 'POST', // Here you're saying that you want to make a POST request. Could be any method, like a GET, for example.
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }, // You can specify your requisition headers here. That line is optional.
      body: JSON.stringify({ // Here's the fun part. Put your data here.
        //"username": this.state.name,
        //username: username,
        Animal: inputAnimalCount,
        Funny: inputFunnyCount,
        News: inputNewsCount,
        Political: inputPoliticalCount

      })
      
    })
    .then(response => response.json()) 
    .then(serverResponse => console.log(serverResponse))
    .catch((error) => console.warn(error))
  }

  function getTest(){
    //search if either username already in DB
    console.log("inside getTEST");
    //alert('inside gettest');
    var value = true;
    var tempResponse = {};
    fetch('http://192.168.254.79:3000/getCount')
      .then(response => response.json())
      //.then(users => console.log())
      .then(users => {
        var count = 0;
        console.log(`length ${users.length}`);
        //alert(`length ${users.length}`);
        var lastElement= users[users.length-1];
        console.log(lastElement);
        //alert(lastElement);
        var animalCount=lastElement.Animal;
        var funnyCount=lastElement.Funny;
        var newsCount=lastElement.News;
        var politicalCount=lastElement.Political;

        console.log(animalCount);
        //alert(animalCount);
        console.log(funnyCount);
        //alert(funnyCount);
        console.log(newsCount);
        //alert(newsCount);
        console.log(politicalCount);
        //alert(politicalCount);

        postTest(animalCount,funnyCount,newsCount,politicalCount);
      })
    //if not insert the infoformatio into the DB

  };

  const [isLoading, setIsLoading] = React.useState(true);
  const [counter, setCounter] = React.useState(0);
  const [animalCounter, setAnimalCounter] = React.useState(0);
  const [funnyCounter, setFunnyCounter] = React.useState(0);
  const [newsCounter, setNewsCounter] = React.useState(0);
  const [politicalCounter, setPoliticalCounter] = React.useState(0);

  /*const [greeting, setGreeting] = React.useState("");
  const [name, setName] = React.useState("");
  const [greetingInfo, setGreetingInfo] = React.useState();*/

  const getData = async () => {
    //Multiget
    const values = await AsyncStorage.multiGet(['@count', '@animalCount','@funnyCount','@newsCount','@politicalCount']);

    values.forEach(value => {
      if (value[0] === '@count') {
        const count = parseInt(value[1]);
        setCounter(isNaN(count) ? 0 : count);
      } else if (value[0] === '@animalCount') {
        setAnimalCounter(JSON.parse(value[1]));
      }else if (value[0] === '@funnyCount') {
        setFunnyCounter(JSON.parse(value[1]));
      }else if (value[0] === '@newsCount') {
        setNewsCounter(JSON.parse(value[1]));
      }else if (value[0] === '@politicalCount') {
        setPoliticalCounter(JSON.parse(value[1]));
      }
    });

    // Alternative is to call getItem for each key but better to use multiGet if getting multiple keys
    /*const countValue = await AsyncStorage.getItem('@count');
    const count = parseInt(countValue);
    setCounter(isNaN(count) ? 0 : count);*/

   
    //
    //const greetingInfo = await AsyncStorage.getItem('@greeting');
    // setCount(JSON.parse(greetingInfo));

    setIsLoading(false);
  };

  React.useEffect(getData);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const incrementCounter = async () => {
    await AsyncStorage.setItem('@count', (counter + 1).toString());
    setCounter(counter + 1);
  }
  const animalIncrementCounter = async () => {
    await AsyncStorage.setItem('@animalCount', (animalCounter + 1).toString());
    setAnimalCounter(animalCounter + 1);
  }
  const funnyIncrementCounter = async () => {
    await AsyncStorage.setItem('@funnyCount', (funnyCounter + 1).toString());
    setFunnyCounter(funnyCounter + 1);
  }
  const newsIncrementCounter = async () => {
    await AsyncStorage.setItem('@newsCount', (newsCounter + 1).toString());
    setNewsCounter(newsCounter + 1);
  }
  const politicalIncrementCounter = async () => {
    await AsyncStorage.setItem('@politicalCount', (politicalCounter + 1).toString());
    setPoliticalCounter(politicalCounter + 1);
  }
  const clearAsyncStorage = async() => {
    await AsyncStorage.setItem('@count', (0).toString());
    setCounter(0);
    await AsyncStorage.setItem('@animalCount', (0).toString());
    setAnimalCounter(0);
    await AsyncStorage.setItem('@funnyCount', (0).toString());
    setFunnyCounter(0);
    await AsyncStorage.setItem('@newsCount', (0).toString());
    setNewsCounter(0);
    await AsyncStorage.setItem('@politicalCount', (0).toString());
    setPoliticalCounter(0);
  } 


  /*const saveGreeting = async () => {
    const greetingToSave = {
      greeting: greeting,
      name: name
    };

    await AsyncStorage.setItem('@greeting', JSON.stringify(greetingToSave));
    setGreetingInfo(greetingToSave);
  }*/
  function chooseIncrement(topic){
    var animalStr ='Animal';
    var funnyStr ='Funny';
    var newsStr ='News';
    var politicalStr ='Political';

    //alert('inside chooseIncrement');
    //alert(topic);
    if (animalStr === topic){
      //alert('it is animal');
      animalIncrementCounter();
    }else if((funnyStr === topic)){
      //alert('it is funny');
      funnyIncrementCounter();
    }else if((newsStr === topic)){
      //alert('it is news');
      newsIncrementCounter();
    }
    else{
      //alert('it is political');
      politicalIncrementCounter();
    }

  }

  const GridView=({topic,picture})=>(
    <View style={styles.gridStyle}>
      <Text style={styles.gridText}>{topic}</Text>
      <Image source={{uri: picture}}  
       style={{width: 50, height: 50}} />
      <Button title="Increment Count" onPress={()=>chooseIncrement(topic)} />
      {/*<Button title="Increment Count 2" onPress={()=>alert(topic)} />*/}

    </View>
  );
  return (

    <SafeAreaView style={styles.container}>
      <View style={{width:"100%", padding: 12,justifyContent:'space-between'}}>
        <FlatList
        data={Topics}
        renderItem={({item})=> <GridView topic={item.topic} picture={item.picture}/>}
        keyExtractor={item => item.id}
        numColumns={2}
        key={item=> item.id}
        />
        <Text>Current state is: {appStateVisible}</Text>
        <Text>Count: {counter}</Text>
        <Text>Animal Count: {animalCounter}</Text>
        <Text>funny Count: {funnyCounter}</Text>
        <Text> news Count: {newsCounter}</Text>
        <Text>political Count: {politicalCounter}</Text>

        <Button title="Increment Count" onPress={incrementCounter} />
        <Button title="Clear Count" onPress={clearAsyncStorage} />
        <Button title="post test" onPress={()=>postTest()} />
        <Button title="get test" onPress={()=>getTest()} />


        {/*<View style={styles.divider} />
        <Text>Saved Greeting:</Text>
        {greetingInfo ? <Text>{greetingInfo.greeting} {greetingInfo.name}</Text> : <Text>None :(</Text>}
        <TextInput style={styles.input} onChangeText={setGreeting} placeholder="Greeting" value={greeting} />
        <TextInput style={styles.input} onChangeText={setName} placeholder="Name" value={name} />
    <Button title="Save Greeting" onPress={saveGreeting} />*/}
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    padding: 8
  },
  input: {
    height: 20,
    margin: 8,
    alignSelf: 'stretch',
    borderBottomColor: '#00aa77',
    borderBottomWidth: 2
  },
  gridStyle:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    height: 150,
    margin: 2,
    backgroundColor: '#00C853'
  },
  gridText:{
    fontSize:24,
    color: 'white'
  },
  MainContainer:{
    flex:1,
    backgroundColor: 'white'
  },
});
