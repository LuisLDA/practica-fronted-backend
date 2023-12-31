import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Menu from "./componentes/home/Menu";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ListComponent from "./componentes/list/List";
import NameRest from "./componentes/rest_api/NameRest";
import OpenAiRest from "./componentes/rest_api/OpenAiRest";

const Tab = createBottomTabNavigator();

const Navigation = () => {
    return (
        <Tab.Navigator initialRouteName="Home">
            <Tab.Screen name="Home" component={Menu} options={{
                tabBarLabel: "Home",
                tabBarIcon: ({ color, size }) => {
                    return <MaterialCommunityIcons name="home" color={color} size={size} />
                },
            }}>
            </Tab.Screen>
            <Tab.Screen name="List" component={ListComponent} options={{
                tabBarLabel: "Listado",
                tabBarIcon: ({ color, size }) => {
                    return <MaterialCommunityIcons name="clipboard-list" color={color} size={size} />
                },
            }}></Tab.Screen>
            <Tab.Screen name="Server" component={NameRest} options={{
                tabBarLabel: "Server Name",
                tabBarIcon: ({ color, size }) => {
                    return <MaterialCommunityIcons name="clipboard-list" color={color} size={size} />
                },
            }}></Tab.Screen>

            <Tab.Screen name="OpenAI" component={OpenAiRest} options={{
                tabBarLabel: "OpenAI",
                tabBarIcon: ({ color, size }) => {
                    return <MaterialCommunityIcons name="clipboard-list" color={color} size={size} />
                },
            }}></Tab.Screen>
        </Tab.Navigator>
    )
}

export default Navigation;