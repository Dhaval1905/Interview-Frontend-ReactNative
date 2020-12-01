import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import axios from 'axios'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {testAction} from '../action/testAction';


var indexdata=0;

 class DataEdit extends Component {
    constructor(props) {
        //const test = this.props.route.params.item
        super(props);
        this.state = {
            FirstName: this.props.route.params.item.FirstName,
            LastName: this.props.route.params.item.LastName,
            email: this.props.route.params.item.email,
            id: this.props.route.params.item._id,
            updateFirstName: '',
            updateLastName: '',
            updateEmail: '',
            data1:[]

        }
        console.log("Id valuew is", this.state.id);
        console.log("index val",this.props.route.params.indexval);
        indexdata = this.props.route.params.indexval;
    }
    editData() {
        var axios = require('axios');
        var data = JSON.stringify({ "FirstName": this.state.FirstName, "LastName": this.state.LastName, "email": this.state.email });

        var config = {
            method: 'put',
            url: `http://192.168.122.1:4200/update/${this.state.id}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                this.setState({
                   // updateFirstName : response.data.FirstName
                });
                var { alldata } = this.props.alldata;
                console.log("first prop redux ",this.props.alldata.alldata[indexdata]);
                //var indexval = this.props.alldata.alldata[indexdata];
                alldata[indexdata].FirstName = this.state.FirstName;
                alldata[indexdata].LastName = this.state.LastName;
                alldata[indexdata].email = this.state.email;

                this.props.testAction(alldata);
                console.log(this.props.alldata.alldata);

            })

            .catch(function (error) {
                console.log(error);
            });

       

        console.log("Updated FirstName is", this.state.updateFirstName)


    }

  


    render() {
        const item = this.props.route.params.item

        console.log("Data Edit value is", item)
        return (
            <View style={{ flex: 1 }}>
                <View style={{ marginTop: 30 }}>
                    <TextInput
                        placeholder="Enter FirstName"
                        onChangeText={(FirstName) => this.setState({ FirstName })}
                        value={this.state.FirstName}
                        style={{ borderWidth: 1, marginTop: 20, marginLeft: 20, marginRight: 20, borderRadius: 20, paddingLeft: 20 }}
                    />
                    <TextInput
                        placeholder="Enter LastName"
                        onChangeText={(LastName) => this.setState({ LastName })}
                        value={this.state.LastName}
                        style={{ borderWidth: 1, marginTop: 20, marginLeft: 20, marginRight: 20, borderRadius: 20, paddingLeft: 20 }}
                    />
                    <TextInput
                        placeholder="Enter Email"
                        onChangeText={(email) => this.setState({ email })}
                        value={this.state.email}
                        style={{ borderWidth: 1, marginTop: 20, marginLeft: 20, marginRight: 20, borderRadius: 20, paddingLeft: 20 }}
                    />
                </View>
                <TouchableOpacity style={{ marginTop: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 20, borderWidth: 1, padding: 10, backgroundColor: '#0000ff', marginRight: 50, marginLeft: 50 }}
                    onPress={() => this.editData()}
                >
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: "white" }}>Submit Changes</Text>
                </TouchableOpacity>

               
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("State value is",state)
    // const {  } = state
    return { 
        alldata: state ,
       
    }
   

  };
  
  const mapDispatchToProps = dispatch => (
    bindActionCreators({
      testAction,
    }, dispatch)
  );
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(DataEdit);