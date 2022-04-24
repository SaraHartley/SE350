//Sara Hartley SE475 Final 
//tab base code from my sudo se350 midterm part 1
/* credits:  Code provided by Professor Cavalcanti was used as a template for this lab
and https://www.codementor.io/@jasonriveraqwerty/how-do-i-use-tabview-in-react-native-1iioc93dg4 */
//used this for exmaple code to display image https://www.javatpoint.com/react-native-image 
//used this to convert object to array https://www.javascripttutorial.net/object/convert-an-object-to-an-array-in-javascript/
//used this for table stuff https://reactnativeexample.com/react-native-table-component/
//used this to start on getting image to base64string https://stackoverflow.com/questions/63600727/how-to-show-image-in-react-using-the-data-from-mysql-created-by-xampp
  //and https://reactnative.dev/docs/images and https://stackoverflow.com/questions/62048929/parse-buffer-image-to-base64-on-react-native and 
  //https://stackoverflow.com/questions/62137123/displaying-images-encoded-with-base64-in-react-native?rq=1
/*Description References:
https://en.wikipedia.org/wiki/Autocross
https://en.wikipedia.org/wiki/Rallycross
https://en.wikipedia.org/wiki/Street_racing
https://en.wikipedia.org/wiki/Bell_206
https://en.wikipedia.org/wiki/Bell_OH-58_Kiowa
https://en.wikipedia.org/wiki/Piasecki_X-49
*/
import * as React from 'react';
import { useState, useEffect } from 'react'
import { View, useWindowDimensions, Text, Image,StyleSheet, SafeAreaView,FlatList, TouchableOpacity,Buffer} from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { Table, Row, Rows, TableWrapper, Cell} from 'react-native-table-component';
 
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
  function getOutdoorsData(){
    //search if either username already in DB
    console.log("inside getOutdoorsData");
    console.log("\n");
    var value = true;
    var tempResponse = {};
    fetch('http://192.168.254.79:3000/outdoors')
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
          tempHeadArray = ["outdoorName","Select"];
          console.log(tempHeadArray);
          setTableHead(tempHeadArray);

          //set table data
          var tempVal = tempObj.outdoorName;
          tempArray.push([tempVal, "a"]);
          console.log(tempArray);
          setTableData(tempArray);
          
        }      
      })
  };

  

  function getRacingData(){
    //search if either username already in DB
    console.log("inside getRacingData");
    console.log("\n");
    var value = true;
    var tempResponse = {};
    fetch('http://192.168.254.79:3000/racing')
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
          tempHeadArray = ["racingName","Select"];
          console.log(tempHeadArray);
          setTableHead(tempHeadArray);

          //set table data
          var tempVal = tempObj.racingName;
          tempArray.push([tempVal, "a"]);
          console.log(tempArray);
          setTableData(tempArray);
          
        }       
      })
  };
  function getHelicopterData(){
    //search if either username already in DB
    console.log("inside getHelicopterData");
    console.log("\n");
    var value = true;
    var tempResponse = {};
    fetch('http://192.168.254.79:3000/helicopter')
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
          tempHeadArray = ["helicopterName","Select"];
          console.log(tempHeadArray);
          setTableHead(tempHeadArray);

          //set table data
          var tempVal = tempObj.helicopterName;
          tempArray.push([tempVal, "a"]);
          console.log(tempArray);
          setTableData(tempArray);
          
        }        
      })
  };

  

  function getOutdoorsItemData(item){
    //search if either username already in DB
    console.log("inside getOutdoorsItemData");
    console.log("\n");
    var value = true;
    var tempResponse = {};
    fetch('http://192.168.254.79:3000/outdoors')
      .then(response => response.json())
      //.then(users => console.log())
      .then(users => {
        var count = 0;
        //setTableData([]);
        var tempArray = [];
        var tempHeadArray =[];
        for ( var xObject in users){
          count++;
          var tempObj =users[xObject];
          console.log("\n");
          //console.log(tempObj);

          //set table data
          console.log(item);
          if (item == tempObj.outdoorName){
                     
            //set image
            var tempVal = tempObj.outdoorImage;
            console.log(tempVal);
            setItemImage(tempVal);

            //Attempt at DB pics, no errors but did not display
            /*var base64String = tempObj.outdoorImage.data.toString('base64');
            console.log("base64String:",base64String);
            console.log("type of base64String",typeof base64String);
            //const base64Image = `data:image/jpg;base64,${base64String}`;
            setItemImage(base64String);*/         

            //set desscription
            var tempVal2 = tempObj.outdoorDescription;
            console.log(tempVal2);
            setItemDescription(tempVal2);
            
          }
        }      
      })
  };
  
  
  function getRacingItemData(item){
    //search if either username already in DB
    console.log("inside getRacingItemData");
    console.log("\n");
    var value = true;
    var tempResponse = {};
    fetch('http://192.168.254.79:3000/racing')
      .then(response => response.json())
      //.then(users => console.log())
      .then(users => {
        var count = 0;
        //setTableData([]);
        var tempArray = [];
        var tempHeadArray =[];
        for ( var xObject in users){
          count++;
          var tempObj =users[xObject];
          console.log("\n");
          console.log(tempObj);

          //set table data
          console.log(item);
          if (item == tempObj.racingName){
            var tempVal = tempObj.racingImage;
            console.log(tempVal);
            setItemImage(tempVal);
            var tempVal2 = tempObj.racingDescription;
            console.log(tempVal2);
            setItemDescription(tempVal2);
            
          }
        }      
      })
  };

  function getHelicopterItemData(item){
    //search if either username already in DB
    console.log("inside getHelicopterItemData");
    console.log("\n");
    var value = true;
    var tempResponse = {};
    fetch('http://192.168.254.79:3000/helicopter')
      .then(response => response.json())
      //.then(users => console.log())
      .then(users => {
        var count = 0;
        //setTableData([]);
        var tempArray = [];
        var tempHeadArray =[];
        for ( var xObject in users){
          count++;
          var tempObj =users[xObject];
          console.log("\n");
          console.log(tempObj);

          //set table data
          console.log(item);
          if (item == tempObj.helicopterName){
            var tempVal = tempObj.helicopterImage;
            console.log(tempVal);
            setItemImage(tempVal);
            var tempVal2 = tempObj.helicopterDescription;
            console.log(tempVal2);
            setItemDescription(tempVal2);
            
          }
        }      
      })
  };

  const outdoorsPic='https://th.bing.com/th/id/R.7d35849bd739bd21991d5a082e5f8127?rik=tWQ0COP2OftC7w&pid=ImgRaw&r=0';
  const racingPic='https://th.bing.com/th/id/R.265e2921da9eacb85abf0553ee0abde8?rik=KZe7px5YVGW2Rw&pid=ImgRaw&r=0';
  const helicopterPic='https://th.bing.com/th/id/OIP.RNUqj-WLUVHs2n-qlSFJJAHaE8?pid=ImgDet&rs=1';
  
  
  const [tableHead,setTableHead] = React.useState([]);
  const [tableData,setTableData] = React.useState([[]]);

  const [setting, setSetting] = React.useState("No choice has been made.");
  const [name, setName] = React.useState("No item has been chosen.");
  const [itemImage, setItemImage] = React.useState("https://th.bing.com/th/id/OIP.DZLWFqYqIG4l_yJaqOuJXgHaHa?w=191&h=191&c=7&r=0&o=5&dpr=1.25&pid=1.7");
  
  //From attemp at DB pics, caused errors
  //const [itemImage, setItemImage] = React.useState<string>(BASE64DATA);

  const [itemDescription, setItemDescription] = React.useState("No Description Available");




  async function callSetSetting(inputName){
    console.log("inside callSetSetting");
    console.log(inputName);
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
    }
  }
  async function callSetName(index){
    console.log("inside callSetName");
    console.log(index);   
    var item = "";
    if (setting=="Outdoors"){
      console.log({setting});
      if (index == 0){
        console.log("index is 0");
        setName("Eat Outside");
        item = "Eat Outside";
        getOutdoorsItemData(item);
      }else if (index == 1){
        console.log("index is 1");
        setName("Take Hike");
        item = "Take Hike";
        getOutdoorsItemData(item);

      }else if (index == 2){
        console.log("index is 2");
        setName("Camp in a Tent");
        item = "Camp in a Tent";
        getOutdoorsItemData(item);

      }
    }else if (setting=="Racing"){
      console.log({setting});
      if (index == 0){
        console.log("index is 0");
        setName("Autocross");
        item = "Autocross";
        getRacingItemData(item);
      }else if (index == 1){
        console.log("index is 1");
        setName("Rallycross");
        item = "Rallycross";
        getRacingItemData(item);
      }else if (index == 2){
        console.log("index is 2");
        setName("Street Racing");
        item = "Street Racing";
        getRacingItemData(item);
      }

    }else if (setting=="Helicopter"){
      console.log({setting});
      if (index == 0){
        console.log("index is 0");
        setName("Bell 206");
        item = "Bell 206";
        getHelicopterItemData(item);
      }else if (index == 1){
        console.log("index is 1");
        setName("Bell OH-58 Kiowa");
        item = "Bell OH-58 Kiowa";
        getHelicopterItemData(item);
      }else if (index == 2){
        console.log("index is 2");
        setName("Piasecki X-49");
        item = "Piasecki X-49";
        getHelicopterItemData(item);
      }
    } 
  }
  //TODO in get functions add another
  const Tables=[
    {
      id:1,
      name:'Outdoors',
      picture: outdoorsPic,
      price: 2,
    },
    {
      id:2,
      name:'Racing',
      picture: racingPic,
      price: 4,
    },
    {
      id:3,
      name: 'Helicopter',
      picture: helicopterPic,
      price: 6,
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
    <SafeAreaView style={styles.container2 }>
      <Text>{name}</Text>
      {/* From attempt at db pics, no errors but did not display*/}
      {/*<Image source={{uri: `data:image/jpeg;base64,${itemImage}`}}*/} 
      <Image source={{uri: itemImage}}  
  
       style={{width: 200, height: 200, resizeMode: 'contain'}
       } />
      <Text>{itemDescription}</Text>
    </SafeAreaView>
  );
  const [index, setIndex] = React.useState(0);
  


  const [routes] = React.useState([
  { key: 'first', title: 'Select' },
  { key: 'second', title: 'Display' },
  { key: 'third', title: 'Zoom In' },

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
  container2: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#78B7BB'

  },
  MainContainer:{
    flex:1,
    backgroundColor: '#78B7BB'
  },
  gridStyle:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    height: 80,
    margin: 2,
    backgroundColor: '#5F9EA0'
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

});
