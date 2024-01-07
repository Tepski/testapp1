import { StyleSheet, Text, View, Animated } from "react-native";
import { useRef, useState, useEffect } from "react";
import Colors from "./Color";

const subs = ["MESL", "PIPE", "MDSP"];

const TabBar = ({ nav }) => {
  const meslRef = useRef(new Animated.Value(0)).current;
  const pipeRef = useRef(new Animated.Value(0)).current;
  const mdspRef = useRef(new Animated.Value(0)).current;
  const selectorRef = useRef(new Animated.Value(51)).current;

  const [selected, setSelected] = useState(0);

  const handleClick = (index, toValue) => {
    setSelected(index);
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
      <Text
        style={[
          styles.text,
          { color: selected == 0 ? Colors.accent : "rgba(255, 255, 255, 0.7)" },
        ]}
        onPress={() => handleClick(0, 51, meslRef)}
      >
        MESL
      </Text>
      <Text
        style={[
          styles.text,
          { color: selected == 1 ? Colors.accent : "rgba(255, 255, 255, 0.7)" },
        ]}
        onPress={() => handleClick(1, 192, pipeRef)}
      >
        PIPE
      </Text>
      <Text
        style={[
          styles.text,
          { color: selected == 2 ? Colors.accent : "rgba(255, 255, 255, 0.7)" },
        ]}
        onPress={() => handleClick(2, 333, mdspRef)}
      >
        MDSP
      </Text>
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
    bottom: 0,
    height: 65,
    width: "100%",
    alignSelf: "center",
    borderWidth: 2,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    flexDirection: "row",
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
