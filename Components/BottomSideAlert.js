import { StyleSheet, Text, View, Animated } from "react-native";
import React from "react";

const BottomSideAlert = () => {
  const ref = React.useRef(new Animated.Value(0)).current;

  const handleClick = () => {
    showAlert();
    setTimeout(() => {
      hideAlert();
    }, 2000);
  };

  const showAlert = () => {
    Animated.timing(ref, {
      duration: 500,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const hideAlert = () => {
    Animated.timing(ref, {
      duration: 1000,
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(() => {
    handleClick();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: ref }]}>
      <Text style={{ color: "white" }}>BottomSideAlert</Text>
    </Animated.View>
  );
};

export default BottomSideAlert;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 10,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
