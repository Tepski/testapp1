import * as react from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import element1 from "../pdfs/elements1";
import Convert from "../MainContainer/Convert";
import responses from "../MainContainer/Response";
import Icons from "react-native-vector-icons/Ionicons";
import ScoreModal from "./ScoreModal";

const MainScreen = ({ route, navigation }) => {
  const { data } = route.params;

  const [quiz, setQuiz] = react.useState({});
  const [color, setColor] = react.useState("bg-secondary text-white");
  const [clicked, setClicked] = react.useState(false);
  const [disabled, setDisabled] = react.useState(false);
  const [correct, setCorrect] = react.useState(0);
  const [showNext, setShowNext] = react.useState(false);
  const [response, setResponse] = react.useState({ show: false, message: "" });
  const [current, setCurrent] = react.useState({});
  const [loading, setLoading] = react.useState(true);
  const [finished, setFinished] = react.useState([]);
  const [answer, setAnswer] = react.useState("");
  const [answered, setAnswered] = react.useState(1);
  const [text, setText] = react.useState(element1);
  const [showModal, setShowModal] = react.useState(false);
  const [currentNumber, setCurrentNumber] = react.useState(0);

  const SelectResponse = (correct) => {
    const random = Math.random();
    selected = "";
    if (correct == true) {
      const selected =
        responses.correct[Math.floor(random * responses.correct.length)];
      return selected;
    } else if (correct != true) {
      const selected =
        responses.incorrect[Math.floor(random * responses.incorrect.length)];
      return selected;
    }
  };

  // const checkChoices = () => {
  //   const len = quiz?.length;
  //   for (let i = 0; i < len; i++) {
  //     const item = quiz[i];
  //     if (item?.Choices.length != 4) {
  //       console.log(item.ID, ": ", item.Question);
  //     }
  //   }
  // };

  const handleSubmit = (label, answer) => {
    setClicked(label);
    if (label == answer) {
      setCorrect(correct + 1);
      setColor("bg-primary text-text/70");
      setResponse({ show: true, message: SelectResponse(true) });
    } else {
      setAnswer(answer);
      setColor(`bg-secondary/40 border-6 border-text text-text/70`);
      setResponse({ show: true, message: SelectResponse(false) });
    }
    setDisabled(true);
    setShowNext(true);
  };

  const SelectRandomQuestion = () => {
    let selectedQuestion;
    if (data[1]?.random && quiz != null) {
      const numberSelected = data[2];
      // do {
      //   const random = Math.floor(Math.random() * quiz.length);
      //   selectedQuestion = quiz[random];
      // } while (finished.includes(selectedQuestion?.ID));
      // setCurrent(selectedQuestion);
      // setFinished([...finished, selectedQuestion?.ID]);
      // setLoading(false);
      setCurrent(quiz[numberSelected[currentNumber]]);
    } else {
      setCurrent(quiz[currentNumber]);
      setLoading(false);
    }
    setCurrentNumber(currentNumber + 1);
  };

  const handleNext = () => {
    if (answered != data[1].limit) {
      setFinished([...finished, current.ID]);
      setDisabled(false);
      setClicked(false);
      setResponse({ show: false, message: "" });
      setShowNext(false);
      SelectRandomQuestion();
      setAnswered(answered + 1);
      setAnswer("");
    } else {
      setShowModal(!showModal);
    }
  };

  const refresh = () => {
    setClicked(false);
    setDisabled(false);
    setCorrect(0);
    setShowNext(false);
    setLoading(false);
    setFinished([]);
    setAnswer("");
    setAnswered(1);
    data[1].random ? SelectRandomQuestion() : setCurrent(quiz[0]);
    setCurrentNumber(1);
  };

  const closeModal = () => {
    setShowModal(!showModal);
    navigation.replace("Home");
  };

  // const storeData = async () => {
  //   const object = {
  //     clicked: false,
  //     disabled: false,
  //     correct: correct,
  //     showNext: false,
  //     finished: finished,
  //     current: current,
  //     currentNumber: currentNumber,
  //   };
  //   try {
  //     await AsyncStorage.setItem(
  //       `ELEMENT${data[1].id}`,
  //       JSON.stringify(object)
  //     );
  //   } catch (error) {
  //     console.error("ERROR!!!!", error);
  //   }
  // };

  // const getData = async () => {
  //   try {
  //     const data = await AsyncStorage.getItem(`ELEMENT${data[1].id}`)
  //     if (data != null) {
  //       data = JSON.parse(data)

  //     }
  //   } catch (error) {
  //     console.error("ERROR", error)
  //   }
  // }

  react.useEffect(() => {
    setText(data[0]);
    setQuiz(text);
    SelectRandomQuestion();
  }, []);

  react.useEffect(() => {
    setQuiz(JSON.parse(Convert(text)));
  }, [text]);

  react.useEffect(() => {
    refresh();
  }, [quiz]);

  return (
    <View className="bg-background h-full w-full items-center justify-center pt-10 px-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-between items-center">
          <Text
            className="text-3xl text-primary/70 font-bold"
            onPress={() => console.log(data[2])}
          >
            Elements na malupet #{data[2].id}
          </Text>
          <TouchableOpacity onPress={() => refresh()}>
            <Icons name="refresh-outline" size={40} color={"#e46767"} />
          </TouchableOpacity>
        </View>

        {!loading && (
          <View>
            <View className="p-5 bg-secondary border-primary border-4 rounded-3xl px-8 my-6">
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text className="text-primary text-xl italic font-semibold mb-4">
                  {answered} - {data[1].limit}
                </Text>
                <Text className="text-primary text-xl italic font-semibold mb-4">
                  Correct: {correct} / {data[1].limit}
                </Text>
              </View>
              <Text className="text-2xl text-text/60 font-bold">
                {current?.Question}
              </Text>
            </View>
            <View>
              {response.show && (
                <Text className="text-xl text-accent italic font-normal">
                  {response.message}
                </Text>
              )}
            </View>
            <View>
              {current?.Choices.slice(0, 4).map((item, index) => {
                return (
                  <TouchableOpacity
                    disabled={disabled}
                    activeOpacity={0.8}
                    className="w-96"
                    key={index}
                    onPress={() => handleSubmit(item.Label, current.Answer)}
                  >
                    <Text
                      className={`text-xl font-semibold py-6 w-full px-6 border-2 ${
                        item.Label == clicked
                          ? color
                          : answer == item.Label
                          ? "border-4 border-primary bg-secondary text-primary"
                          : "bg-secondary text-text/70"
                      } my-2 rounded-3xl `}
                    >
                      {item.String}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
        {showNext && (
          <TouchableOpacity
            className="w-full"
            activeOpacity={0.7}
            onPress={() => handleNext()}
          >
            <View className="items-center w-full">
              <Text className="text-3xl text-secondary font-bold bg-accent mb-8 py-4 px-24 rounded-3xl">
                Next
              </Text>
            </View>
          </TouchableOpacity>
        )}
        {!current?.Choices && (
          <TouchableOpacity
            className="w-full"
            activeOpacity={0.7}
            onPress={() => handleNext()}
          >
            <View className="items-center w-full">
              <Text className="text-3xl text-secondary font-bold bg-accent mb-8 py-4 px-24 rounded-3xl">
                Next
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>
      <StatusBar hidden={true} />
      <ScoreModal
        showModal={showModal}
        setShowModal={setShowModal}
        closeModal={closeModal}
        refresh={refresh}
        navigation={navigation}
        data={{ correct: correct, limit: data[1].limit }}
      />
    </View>
  );
};

export default MainScreen;
