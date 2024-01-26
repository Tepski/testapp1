import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, Text, View, Animated, Dimensions } from "react-native";
import Colors from "./Color";

const DevDim = Dimensions.get("window");

const TabBar = ({ nav }) => {
  const textRefs = [useRef(), useRef(), useRef()];
  const selectorRef = useRef(new Animated.Value(0)).current;

  const [selected, setSelected] = useState(0);
  const [rendered, setRendered] = useState(false);

  const handleMeasure = (index) => {
    textRefs[index].current.measure((x, y, width, height, pageX) => {
      console.log(pageX);
      Animated.spring(selectorRef, {
        toValue: pageX,
        tension: 10,
        friction: 5,
        useNativeDriver: false,
      }).start();
    });
  };

  // useEffect(() => {
  //   textRefs[0].current.measure((x, y, width, height, pageX) => {
  //     const initialSelectorPosition = pageX ? pageX : 31;
  //     Animated.spring(selectorRef, {
  //       toValue: initialSelectorPosition,
  //       tension: 10,
  //       friction: 5,
  //       useNativeDriver: false,
  //     }).start();
  //   });
  // }, []);

  const handleClick = (index) => {
    setSelected(index);
    nav(index);
    handleMeasure(index);
  };

  return (
    <View style={styles.container}>
      <Text
        ref={textRefs[0]}
        style={[
          styles.text,
          {
            color: selected === 0 ? Colors.accent : "rgba(255, 255, 255, 0.7)",
          },
        ]}
        onPress={() => handleClick(0)}
      >
        MESL
      </Text>
      <Text
        ref={textRefs[1]}
        style={[
          styles.text,
          {
            color: selected === 1 ? Colors.accent : "rgba(255, 255, 255, 0.7)",
          },
        ]}
        onPress={() => handleClick(1)}
      >
        PIPE
      </Text>
      <Text
        ref={textRefs[2]}
        style={[
          styles.text,
          {
            color: selected === 2 ? Colors.accent : "rgba(255, 255, 255, 0.7)",
          },
        ]}
        onPress={() => handleClick(2)}
      >
        MDSP
      </Text>
      <Animated.View style={[styles.selector, { left: selectorRef }]} />
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
    height: "8%",
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
