import React, { Component } from 'react'
import { Button, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native'
import axios from 'axios'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { testAction } from '../action/testAction';
import Dropdown from 'react-native-dropdown-picker'
import { ScrollView } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';





class DisplayData extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      text: '',
      finalData: [],
      role: '',
      finaldata1:[],
      text2:''
    }
    this.arrayholder = [];
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      console.log('Screen.js focused')
      this.display()
     
      });
}


  display(){
    var config = {
      method: 'get',
      url: 'http://192.168.122.1:4200/display',
      headers: {}
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        this.setState({
          data: response.data
        })



        this.props.testAction(response.data);

        this.setState({
          finalData: this.props.alldata.alldata
        })


        console.log("data comming from redux ", this.props.alldata);

      })
      .catch(function (error) {
        console.log(error);
      });
  }


  edit(item, index) {
    console.log(item);
    console.log("first screen index ", index);
    this.props.navigation.navigate("DataEdit", {
      item: item,
      indexval: index
    })

  }


  removeData(item, index) {
    console.log("Remove data item is", index)


    var { alldata } = this.props.alldata;

    console.log("All data value is", alldata)



    var data = '';

    var config = {
      method: 'delete',
      url: `http://192.168.122.1:4200/delete/${item._id}`,
      headers: {},
      data: data
    };

    axios(config)
      .then((response) => {
        console.log("Delete json data is", JSON.stringify(response.data));

        var filtered = alldata.filter( (value, ind, arr) => {
          console.log("Value of index is",index)
          return ind != index;
        });
        console.log("Fitel console value is",filtered)
        this.setState({
          finalData:filtered
        })
        
        this.props.testAction(filtered);


      })
      .catch(function (error) {
        console.log(error);
      });

  }

  searchData(text) {
    console.log("Hello")
    var { alldata } = this.props.alldata
    
   
    console.log("Value of data1 is", alldata)
    const newData = this.state.finalData.filter(item => {

      console.log("Search DAta value is", item.FirstName)
      const itemData = item.FirstName.toUpperCase()
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1
    });

    this.setState({
      //alldata: newData,
      text: text
    })
    this.props.testAction(newData);
  }



  renderData(item, index) {
    const test = item
    console.log("Item value is", test)
    return (
      <View>


        <View style={{ borderBottomWidth: 1 }}>


          <View style={{ flexDirection: 'row', width: '100%', justifyContent: "center", alignItems: "center" }}>
            <View style={{ width: '60%' }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 20, marginLeft: 10 }}>FirstName is: {test.FirstName}</Text>
            </View>
            <View style={{ width: "40%", flexDirection: "row", justifyContent: "space-around" }}>
              <View style={{ width: '30%' }}>
                <TouchableOpacity style={{ padding: 3, borderWidth: 1, alignItems: 'center' }}
                  onPress={() => this.edit(item, index)}
                ><Text>EDIT</Text></TouchableOpacity>
              </View>
              <View style={{ width: '50%' }}>
                <TouchableOpacity style={{ padding: 3, borderWidth: 1, alignItems: 'center', backgroundColor: '#0000ff' }}
                  onPress={() => this.removeData(item, index)}
                >
                  <Text style={{ color: 'white' }}>REMOVE</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, marginLeft: 10 }}>LastName is: {test.LastName}</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, marginLeft: 10 }}>Email is: {test.email}</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, marginLeft: 10 }}>Role is: {test.role}</Text>



        </View>
      </View>
    )
  }

  searchable(item){
    this.setState({
      role : item.value
    });

    console.log("Dropdown value ",item.value);

    let filteredData = this.state.finalData.filter((val,ind) => {
      return val.role == item.value
      // console.log("dropdown filter ",val);
    });
    console.log("New Filter Data ",filteredData);
    this.props.testAction(filteredData);
  }

  render() {
    console.log("API data is", this.state.role)
    return (
      <ScrollView>
        <View style={{ flex: 1 }}>
          <View style={{ marginTop: 10 }}>
         
            <TouchableOpacity style={{ marginTop: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 20, borderWidth: 1, padding: 10, backgroundColor: '#0000ff', marginRight: 50, marginLeft: 50 }}
              onPress={() => this.props.navigation.navigate("AddNewUser")}
            >
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: "white" }}>Add New User</Text>
            </TouchableOpacity>
            <TextInput
              placeholder="Search"
              onChangeText={(text) => this.searchData(text)}
              // value={this.state.text}
              style={{ borderWidth: 0.5, marginTop: 20, marginLeft: 20, marginRight: 20, paddingLeft: 20 }}
            />

            <Dropdown
              items={
                [
                  {
                    label: "designer", value: "designer"
                  },
                  {
                    label: "Art-Manger", value: "Art-Manger"
                  },
                  {
                    label: "Artist", value: "Artist"
                  },
                  {
                    label: "All", value: "All"
                  }
                ]
              }
              defaultValue="All"
              containerStyle={{ height: 60 }}
              style={{ backgroundColor: '#fafafa', marginTop: 20, marginLeft: 20, marginRight: 20 }}
              itemStyle={{
                justifyContent: 'flex-start'
              }}
              dropDownStyle={{ backgroundColor: '#fafafa', }}

              onChangeItem={item => this.searchable(item)
                
              }
              searchable={true}
              


            />


            <FlatList
              data={this.props.alldata.alldata}
              renderItem={({ item, index }) => this.renderData(item, index)}
              
            />
          
           
          </View>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  // const {  } = state
  return { alldata: state }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    testAction,
  }, dispatch)
);


export default connect(mapStateToProps, mapDispatchToProps)(DisplayData);