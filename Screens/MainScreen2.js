import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  ScrollView,
} from "react-native";
import React from "react";
import Colors from "../MainContainer/Color";
import Response from "../MainContainer/Response";
import ScoreModal from "./ScoreModal";
import Icons from "react-native-vector-icons/Entypo";
import { reportQues } from "../Functions/ReportQues";

const devDim = Dimensions.get("window");

const MainScreen2 = ({ navigation, route }) => {
  const data = route.params;
  const [quiz, setQuiz] = React.useState([]);
  const [currentQues, setCurrentQues] = React.useState([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [answered, setAnswered] = React.useState({
    state: false,
    answer: "",
    disabled: false,
  });
  const [response, setResponse] = React.useState("");
  const [correct, setCorrect] = React.useState(0);
  const [review, setReview] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);

  const reset = () => {
    setAnswered({
      state: false,
      answer: "",
      disabled: false,
    });
    setResponse("");
    setCorrect(0);
    setCurrentIndex(0);
    setReview([]);
  };

  const handleClick = (quesAns, userAns, ques) => {
    setAnswered({ state: true, answer: userAns, disabled: true });
    setReview([
      ...review,
      {
        data: currentQues,
        answer: userAns,
      },
    ]);
    if (userAns == quesAns) {
      setCorrect(correct + 1);
      data.response &&
        setResponse(
          Response.correct[Math.floor(Math.random() * Response.correct.length)]
        );
    } else {
      data.response &&
        setResponse(
          Response.incorrect[
            Math.floor(Math.random() * Response.incorrect.length)
          ]
        );
    }
    scrollRef.current.scrollToEnd({ animated: true });
  };

  const checkChoices = () => {
    for (i in quiz) {
      quiz[i].Answer !== "C" && console.log(quiz[i].ID);
    }
    console.log("3 GUARD");
  };

  const handleNext = () => {
    if (currentIndex == quiz.length - 1) {
      setShowModal(!showModal);
    }
    setCurrentIndex(currentIndex + 1);
    setAnswered({ state: false, answer: "", disabled: false });
    setResponse("");
  };

  React.useEffect(() => {
    setQuiz(data.data);
  }, []);

  React.useEffect(() => {
    setCurrentQues(quiz[currentIndex]);
  }, [quiz]);

  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    setCurrentQues(quiz[currentIndex]);
  }, [currentIndex]);

  return (
    <View style={styles.container} className="bg-background">
      <View className="absolute">{data.imageSource}</View>
      <Text className="absolute bottom-0 right-6 text-white/70">@tepski</Text>
      <View style={styles.header}>
        <Text
          className="px-5 py-2 text-base  text-white/70"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onPress={() => setCurrentIndex(56)}
          // onPress={checkChoices}
        >
          {data.sub} ELEMENTS
        </Text>
        <View>
          <Text onPress={reset} className="text-white/70">
            RESET
          </Text>
        </View>
      </View>
      <ScrollView
        ref={scrollRef}
        className="w-full h-full"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <View style={styles.quesContainer}>
          <View className="flex-row w-full justify-between">
            <Text className="text-white/70">
              {currentIndex + 1} / {quiz.length}
            </Text>
            <Text className="text-white/70">
              correct: {correct} / {quiz.length}
            </Text>
          </View>
          <Text className="text-xl my-5 text-white/70">
            {currentQues?.Question}
          </Text>
          {response && (
            <Text
              style={[styles.text]}
              className="text-white/70  py-2 rounded-xl"
              onPress={() => navigation.navigate("Home")}
            >
              {response}
            </Text>
          )}
        </View>
        {currentQues?.Choices?.map((item, index) => {
          return (
            <View style={styles.choices} key={index}>
              <TouchableOpacity
                className="w-full"
                disabled={answered.disabled}
                activeOpacity={0.6}
                onPress={() =>
                  handleClick(
                    currentQues.Answer,
                    item.Text,
                    currentQues.Question
                  )
                }
              >
                <Text
                  style={styles.choiceText}
                  className="text-base text-white/70"
                >
                  {item.Label}
                </Text>
              </TouchableOpacity>
              <View
                style={[
                  styles.label,
                  {
                    borderColor: answered.state
                      ? item.Text == currentQues.Answer
                        ? "lime"
                        : item.Text == answered.answer &&
                          item.Text != currentQues.Answer &&
                          "red"
                      : "rgba(255, 255, 255, 0.7)",
                  },
                ]}
              >
                <Text className="italic font-bold text-text/60 text-xl">
                  {item.Text}
                </Text>
              </View>
            </View>
          );
        })}
        {answered.state && (
          <TouchableOpacity activeOpacity={0.7} onPress={handleNext}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                backgroundColor: "rgba(0, 0, 0, 0.65)",
                borderColor: "rgba(255, 255, 255, 0.7)",
                borderWidth: 2,
              }}
            >
              <Text className="py-2 px-6 rounded-lg text-2xl text-white/70">
                NEXT
              </Text>
              <Icons
                name="chevron-small-right"
                size={40}
                color={"rgba(255, 255, 255, 0.7)"}
              />
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>
      {/* <View className="bg-sla0">
        <Text
          onPress={() => setCurrentIndex(numberSelect - 1)}
          className="text-white"
        >
          SELECTED NUMBER: {numberSelect}
        </Text>
        <TextInput onChangeText={(e) => setNumberSelect(e)} />
      </View> */}
      <TouchableOpacity
        className="absolute left-6 bottom-0 items-center"
        onPress={() =>
          reportQues(data.sub, data.week, data.element, currentQues.ID)
        }
      >
        <Text style={{ fontSize: 8 }} className=" text-white/70">
          REPORT QUESTION
        </Text>
        <Icons name="bug" size={20} color={"rgba(127, 29, 29, 0.9)"} />
        <Text style={{ fontSize: 8 }} className=" text-white/70">
          AS BROKEN
        </Text>
      </TouchableOpacity>
      <ScoreModal
        showModal={showModal}
        setShowModal={setShowModal}
        data={{ correct: correct, items: quiz.length }}
        review={review}
        navigation={navigation}
        refresh={reset}
      />
      <StatusBar barStyle={"light-content"} />
    </View>
  );
};

export default MainScreen2;

const styles = StyleSheet.create({
  container: {
    height: devDim.height,
    width: devDim.width,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 16,
    alignSelf: "flex-start",
    fontStyle: "italic",
    fontWeight: "300",
  },
  quesContainer: {
    padding: 15,
    // borderRadius: 10,
    // borderWidth: 3,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    marginBottom: 10,
    width: "100%",
  },
  label: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: 55,
    height: 55,
    backgroundColor: Colors.background,
    borderRadius: 100,
    left: -27,
    borderWidth: 4,
    //27
  },
  choices: {
    alignSelf: "flex-end",
    width: "93%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    elevation: 20,
    shadowColor: "white",
    marginHorizontal: -6,
  },
  choiceText: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    marginVertical: 5,
    paddingVertical: 10,
    // borderRadius: 100,
    paddingHorizontal: 50,
    fontSize: 18,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 20,
  },
});
