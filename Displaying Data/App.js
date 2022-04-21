//Sara Hartley SE350 midterm part 1
/* credits:  Code provided by Professor Cavalcanti was used as a template for this lab
and https://www.codementor.io/@jasonriveraqwerty/how-do-i-use-tabview-in-react-native-1iioc93dg4 */
//used this for exmaple code to display image https://www.javatpoint.com/react-native-image 
//used this to convert object to array https://www.javascripttutorial.net/object/convert-an-object-to-an-array-in-javascript/
import * as React from 'react';
import { useState, useEffect } from 'react'
import { View, useWindowDimensions, Text, Image,StyleSheet, SafeAreaView,FlatList, TouchableOpacity} from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { Table, Row, Rows,} from 'react-native-table-component';
 
//installations
/*
Node.js
npm install express
npm install body-parser
npm install mysql

//Tabs
npm install react-native-tab-view

//Table
npm install react-native-table-component
  then change its line in dependicies to:
    "react-native-table-component": "https://github.com/slice312/react-native-table-component.git",
    run npm install

*/
 
export default function TabViewExample() {
  function getWorkoutsData(){
    //search if either username already in DB
    console.log("inside getWorkoutsData");
    console.log("\n");
    var value = true;
    var tempResponse = {};
    fetch('http://192.168.254.79:3000/workouts')
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
          tempHeadArray = Object.keys(tempObj);
          console.log(tempHeadArray);
          setTableHead(tempHeadArray);


          //set table data
          tempArray.push(Object.values(tempObj));
          console.log("\n");
          console.log("inside for loop");
          console.log(tempArray);
          setTableData(tempArray);

        }      
      })
  };
  function getMembershipTrackerData(){
    //search if either username already in DB
    console.log("inside getMembershipTrackerData");
    console.log("\n");
    var value = true;
    var tempResponse = {};
    fetch('http://192.168.254.79:3000/membershipTracker')
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
          tempHeadArray = Object.keys(tempObj);
          console.log(tempHeadArray);
          setTableHead(tempHeadArray);


          //set table data
          tempArray.push(Object.values(tempObj));
          console.log("\n");
          console.log("inside for loop");
          console.log(tempArray);
          setTableData(tempArray);

        }      
      })
  };
  function getWorkoutTrackerData(){
    //search if either username already in DB
    console.log("inside getWorkoutTrackerData");
    console.log("\n");
    var value = true;
    var tempResponse = {};
    fetch('http://192.168.254.79:3000/workoutTracker')
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
          tempHeadArray = Object.keys(tempObj);
          console.log(tempHeadArray);
          setTableHead(tempHeadArray);


          //set table data
          tempArray.push(Object.values(tempObj));
          console.log("\n");
          console.log("inside for loop");
          console.log(tempArray);
          setTableData(tempArray);

        }      
      })
  };
  const workoutsPic='https://fit.life/wp-content/uploads/2020/03/fitlife_home_workout.jpg';
  const membershipTrackerPic='https://414419.smushcdn.com/1049916/wp-content/uploads/2020/11/membership.jpg?lossy=1&strip=1&webp=1';
  const workoutTrackerPic='https://th.bing.com/th/id/OIP.bCIcLLzn66EhJKl5l3wpUAHaI1?pid=ImgDet&rs=1';
  
  const [tableHead,setTableHead] = React.useState([]);
  //var tableHead = ['Head', 'Head2', 'Head3', 'Head4'];
  const [tableData,setTableData] = React.useState([[]]);

  const [setting, setSetting] = React.useState("No choice has been made.");

  async function callSetSetting(name){
    console.log("inside callSetSetting");
    //tableHead =['workout', 'Head2', 'Head3', 'Head4'];
    setSetting(name);
    
    if (name=="Workouts"){
      console.log({setting});
      getWorkoutsData();
    }else if (name=="Membership Tracker"){
      console.log({setting});
      getMembershipTrackerData();

    }else if (name=="Workout Tracker"){
      console.log({setting});
      getWorkoutTrackerData();
    }
  }
  

  const Tables=[
    {
      id:1,
      name:'Workouts',
      picture: workoutsPic,
      price: 2,
    },
    {
      id:2,
      name:'Membership Tracker',
      picture: membershipTrackerPic,
      price: 4,
    },
    {
      id:3,
      name: 'Workout Tracker',
      picture: workoutTrackerPic,
      price: 6,
    },
    
  ]
  
  const GridView=({name,picture,price})=>(
    <View style={styles.gridStyle}>
      {/*<TouchableOpacity onPress={()=>alert(`${name} is $${price}.00`)}>*/}
      <TouchableOpacity onPress={()=>callSetSetting(name)}>
      <Text style={styles.gridText}>{name}</Text>
      <Image source={{uri: picture}}  
       style={{width: 50, height: 50}} />  
      </TouchableOpacity>
    </View>
  );
  const layout = useWindowDimensions();
  const FirstRoute = () => (
    <SafeAreaView style={styles.MainContainer}>
    <FlatList
    data={Tables}
    renderItem={({item})=> <GridView name={item.name} picture={item.picture} price={item.price}/>}
    keyExtractor={item => item.id}
    numColumns={1}
    key={item=> item.id}
    />
    </SafeAreaView>
  );
  const SecondRoute = () => (
    <SafeAreaView style={styles.MainContainer}>
      <Text>{setting}</Text>
      <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
        <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
        {/*<Row data={tableHead} style={styles.head}/>*/}
        <Rows data={tableData} textStyle={styles.text}/>
        {/*<Rows data={tableData}/>*/}
      </Table>
    </SafeAreaView>
  );
  const [index, setIndex] = React.useState(0);
  


  const [routes] = React.useState([
  { key: 'first', title: 'Tables' },
  { key: 'second', title: 'Data' },
  ]);
 
  const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
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
      <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
      />
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
  head: { 
    height: 60, 
    backgroundColor: '#f1f8ff' 
  },
  text: { 
    margin: 6 
  }
});
