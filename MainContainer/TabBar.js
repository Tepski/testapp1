import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "./Color";

const TabBar = ({ nav }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text} onPress={() => nav(1)}>
        MESL
      </Text>
      <Text style={styles.text}>PIPE</Text>
      <Text style={styles.text}>MDSP</Text>
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    height: 65,
    width: "100%",
    backgroundColor: Colors.background,
    borderTopColor: Colors.primary,
    borderWidth: 2,
    flexDirection: "row",
  },
  text: {
    fontSize: 30,
  },
});
