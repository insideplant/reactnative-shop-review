import React from "react";
import { NavigationContainer } from "@react-navigation/native";

/* navigator */ 
import { HomeStackNavigator } from "./HomeStackNavigator";

export function AppNavigator(){
  return (
    <NavigationContainer>
      <HomeStackNavigator />
    </NavigationContainer>
  )
}