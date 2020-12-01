import * as React from 'react'
import {Text,View} from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack'
import DisplayData from '../DisplayData/Displaydata';
import DataEdit from '../Edit/DataEdit';
import AddNewUser from '../AddNewUser/AddNewUser';


const Stack = createStackNavigator()

function navigation(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Displaydata" component={DisplayData}/>
                <Stack.Screen name="DataEdit" component={DataEdit}/>
                <Stack.Screen name = "AddNewUser" component={AddNewUser}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default navigation