import React, { Component } from 'react'
import { Button, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native'
import axios from 'axios'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { testAction } from '../action/testAction';
import Dropdown from 'react-native-dropdown-picker'




class AddNewUser extends Component {
    constructor() {
        super()
        this.state = {
            FirstName: '',
            LastName: '',
            email: '',
            role: '',
            data1: [],
            emailtext: ''
        }
    }


   
        


    creatData() {


        var data = JSON.stringify({ "FirstName": this.state.FirstName, "LastName": this.state.LastName, "email": this.state.email, "role": this.state.role });

        var config = {
            method: 'post',
            url: 'http://192.168.122.1:4200/add',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then((response) => {

                console.log(JSON.stringify(response.data));
                console.log("+++++++++++++++++++++++++++++createdata")

                    if(response.data.status == 2 ){
                        alert(response.data.message)
                    }
                

                    console.log("Edition ++++++++++++++++++++++++++++++++++++++",response.data.status)

                    this.setState({
                        data1: response.data
                    })
                    console.log("New Dta avalue is", this.state.data1.role)
                    
                
            })


            .catch((error) => {
                console.log(error);
                alert(error)
            });

            
           
           


        this.setState({
            email: '',
            role: '',
            FirstName: '',
            LastName: '',

        })

        this.goBack()

    }

    goBack() {
       
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
      
              console.log("New data for alldata is",this.props.alldata)



              var { alldata } = this.props.alldata

             

              alldata.FirstName = this.state.FirstName
              alldata.LastName = this.state.LastName
              alldata.email = this.state.email
              alldata.role = this.state.role

              

              this.props.testAction(alldata)
      
             // this.props.testAction(response.data);
      
            //   this.setState({
            //     finalData: this.props.alldata.alldata
            //   })
      
      
              console.log("data comming from redux ", this.props.alldata);
      
            })
            .catch(function (error) {
              console.log(error);
            });
        

            this.props.navigation.push("Displaydata")

    }

    validate = (emailtext) => {

        console.log(emailtext);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(emailtext) === false) {
            // alert("Email is Not Correct");
            this.setState({ email: emailtext })
            console.log("Not Valid")
            return false;
        }
        else {
            this.setState({ email: emailtext })
            //alert("Email is Correct");
        }
    }




    render() {
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
                        onChangeText={(emailtext) => this.validate(emailtext)}
                        value={this.state.email}
                        style={{ borderWidth: 1, marginTop: 20, marginLeft: 20, marginRight: 20, borderRadius: 20, paddingLeft: 20 }}
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
                            justifyContent: 'center'
                        }}
                        dropDownStyle={{ backgroundColor: '#fafafa', }}

                        onChangeItem={

                            item => this.setState({

                                role: item.value
                                


                            })
                            
                        }
                        // searchable={true}


                    />






                    <TouchableOpacity style={{ marginTop: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 20, borderWidth: 1, padding: 10, backgroundColor: '#0000ff', marginRight: 50, marginLeft: 50 }}
                        onPress={() => this.creatData()}
                    >
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: "white" }}>Submit Changes</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("State value is", state)
    // const {  } = state
    return {
        alldata: state,

    }


};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        testAction,
    }, dispatch)
);


export default connect(mapStateToProps, mapDispatchToProps)(AddNewUser);