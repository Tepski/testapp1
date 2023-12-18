import { StyleSheet, Text, View, Animated } from "react-native";
import { useRef, useState, useEffect } from "react";
import Colors from "./Color";

const TabBar = ({ nav }) => {
  const meslRef = useRef(new Animated.Value(0)).current;
  const pipeRef = useRef(new Animated.Value(0)).current;
  const mdspRef = useRef(new Animated.Value(0)).current;
  const selectorRef = useRef(new Animated.Value(46)).current;

  const handleClick = (index, toValue) => {
    nav(index);
    Animated.spring(selectorRef, {
      toValue: toValue,
      tension: 10,
      friction: 5,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Animated.View style={styles.container}>
      <Text onPress={() => handleClick(0, 46, meslRef)}>MESL</Text>
      <Text onPress={() => handleClick(1, 172, pipeRef)}>PIPE</Text>
      <Text onPress={() => handleClick(2, 296, mdspRef)}>MDSP</Text>
      <Animated.View style={[styles.selector, { left: selectorRef }]} />
    </Animated.View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    height: 65,
    width: "90%",
    alignSelf: "center",
    backgroundColor: Colors.background,
    borderWidth: 2,
    borderColor: Colors.accent,
    flexDirection: "row",
    borderRadius: 100,
    elevation: 5,
  },
  text: {
    fontSize: 18,
  },
  selector: {
    width: 30,
    height: 5,
    position: "absolute",
    bottom: 10,
    backgroundColor: Colors.accent,
    borderRadius: 100,
  },
});

// 1st left: 44
// 2nd left: 170
//3rd left: 296
