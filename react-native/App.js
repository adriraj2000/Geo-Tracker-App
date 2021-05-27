import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SignupScreen from "./src/screens/SignupScreen";
import SigninScreen from "./src/screens/SigninScreen";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { setNavigator } from "./src/navigatorRef";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import AccountScreen from "./src/screens/AccountScreen";
import { createBottomTabNavigator } from "react-navigation-tabs";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import { Provider as LocationProvider } from "./src/context/LocationContext";
import { Provider as TrackProvider } from "./src/context/TrackContext";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";

const trackListFlow = createStackNavigator({
  TrackListScreen,
  TrackDetailScreen,
});
trackListFlow.navigationOptions = {
  title: "My Tracks",
  tabBarIcon: <FontAwesome name="map-marker" size={24} color="black" />,
};

const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    SigninScreen,
    SignupScreen,
  }),
  mainFlow: createBottomTabNavigator({
    trackListFlow,
    TrackCreateScreen,
    AccountScreen,
  }),
});

const App = createAppContainer(switchNavigator);
export default () => {
  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <App
            ref={(navigator) => {
              setNavigator(navigator);
            }}
          />
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  );
};
