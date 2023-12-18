import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../MainContainer/Color";
import {
  updateScreen,
  checkAnswer,
  handleNext,
} from "../Functions/ElementsFuncs";
import { TouchableOpacity } from "react-native-gesture-handler";

const MainScreen2 = ({ navigation, route }) => {
  const data = route.params;
  const [quiz, setQuiz] = React.useState([]);
  const [currentQues, setCurrentQues] = React.useState([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const check = () => {
    setCurrentIndex(currentIndex + 1);
  };

  React.useEffect(() => {
    setQuiz(data.data);
  }, []);

  React.useEffect(() => {
    setCurrentQues(quiz[currentIndex]);
  }, [quiz]);

  React.useEffect(() => {
    setCurrentQues(quiz[currentIndex]);
  }, [currentIndex]);

  return (
    <View style={styles.container} className="bg-background">
      <Text style={styles.text} onPress={() => navigation.navigate("Home")}>
        MainScreen2
      </Text>
      <View style={styles.quesContainer}>
        <Text className="text-xl my-5" onPress={check}>
          {currentQues?.Question}
        </Text>
      </View>
      {currentQues?.Choices?.map((item, index) => {
        return (
          <View style={styles.choices} key={index}>
            <Text className="text-base">{item.Label}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default MainScreen2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 25,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "800",
  },
  quesContainer: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: Colors.accent,
    backgroundColor: Colors.secondary,
    marginBottom: 10,
  },
  choices: {
    width: "80%",
    backgroundColor: Colors.secondary,
    marginVertical: 5,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 20,
  },
});
