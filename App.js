import "react-native-gesture-handler";
import * as react from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import MainScreen from "./Screens/MainScreen";
import HomeScreen from "./Screens/HomeScreen";
import AdminScreen from "./Screens/AdminScreen";
import HomeScreen2 from "./Screens/HomeScreen2";
import MainScreen2 from "./Screens/MainScreen2";

const TestScreen = () => {
  return (
    <View>
      <Text>TEST SCREEN</Text>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer styles={styles.container}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Main"
          component={MainScreen2}
          options={{
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen2}
          options={{ animation: "slide_from_left" }}
        />
        <Stack.Screen name="Admin" component={AdminScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 25,
  },
  content: {
    paddingTop: 10,
  },
});

export default App;
