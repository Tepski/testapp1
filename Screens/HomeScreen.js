import react from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar as SB,
  Platform,
  Switch,
} from "react-native";
import Icons from "react-native-vector-icons/Ionicons";
import Convert from "../MainContainer/Convert";
import Slider from "@react-native-community/slider";

import elements1 from "../pdfs/elements13";
import elements2 from "../pdfs/elements14";
import elements3 from "../pdfs/elements15";
import elements4 from "../pdfs/elements16";

const HomeScreen = ({ navigation }) => {
  const defaultValue = {
    id: null,
    random: false,
    hardMode: false,
    response: true,
    limit: 100,
  };
  const elements = [elements1, elements2, elements3, elements4];
  const [number, setNumber] = react.useState(null);
  const [options, setOptions] = react.useState(defaultValue);
  const [quiz, setQuiz] = react.useState({});
  const [sliderValue, setSliderValue] = react.useState(100);
  const [itemLen, setItemLen] = react.useState(null);
  const [randomQuiz, setRandomQuiz] = react.useState([]);

  const handleSelect = (index, item) => {
    options.random && selectRandom(options.limit);
    setNumber(index);
    setQuiz(item);
    setItemLen(JSON.parse(Convert(item)).length);
    setSliderValue(defaultValue.limit);
    setOptions({ ...options, limit: 100, id: index + 1 });
  };

  const selectRandom = (limit) => {
    const numbersSelected = [];
    const data = JSON.parse(Convert(quiz));
    while (numbersSelected.length < limit) {
      const random = Math.floor(Math.random() * quiz.length);
      if (
        data[random] !== undefined &&
        !numbersSelected.includes(data[random])
      ) {
        numbersSelected.push(data[random]);
      }
    }
    setRandomQuiz(numbersSelected);
  };

  // const checkChoices = () => {
  //   const len = elements1?.length;
  //   for (let i = 0; i < len; i++) {
  //     const item = elements1[i];
  //     if (item?.Choices.length != 4) {
  //       console.log(item.ID, ": ", item.Question);
  //     }
  //   }
  // };

  // checkChoices();

  const handleSetHardMode = (index) => {
    setOptions({
      ...options,
      hardMode: !options.hardMode,
      random: true,
      response: true,
      limit: itemLen,
    });
  };

  const handleSubmit = () => {
    navigation.replace("Main", {
      data: [quiz, options, randomQuiz],
    });
  };

  react.useEffect(() => {
    options.random && selectRandom(options.limit);
  }, [options.random]);

  return (
    <View
      style={{ paddingTop: Platform.OS == "android" ? SB.currentHeight : 0 }}
      className="flex-1 px-4 justify-start items-center py-4 bg-background"
    >
      <Text
        className="text-3xl text-text my-4 font-semibold"
        // onPress={() => navigation.navigate("Admin")}
      >
        MDSP WEEK 10 ELEMENTS
      </Text>

      {elements?.map((item, index) => {
        return (
          <View className="w-full" key={index}>
            <TouchableOpacity
              disabled={number == index && true}
              activeOpacity={0.7}
              // onPress={() => navigation.navigate("Main", { selectedQuiz: item })}
              onPress={() => handleSelect(index, item)}
              className="w-full"
            >
              <View
                style={styles.selection}
                className={index == number && "border-accent/80 border-2 "}
              >
                <View className="flex-row justify-between items-center w-full">
                  <View
                    style={{ flexDirection: "row", alignItems: "flex-start" }}
                  >
                    <View className="justify-center items-center rounded-lg border-2 p-4 mr-2 bg-secondary">
                      <Text className="text-3xl font-bold italic text-text">
                        {index + 1}
                      </Text>
                    </View>
                    <View className="justify-start ml-2">
                      <Text className="text-xl text-text font-semibold">
                        ELEMENTS #{index + 1}
                      </Text>
                      <Text className="italic text-text/70 text-lg">MDSP</Text>
                    </View>
                  </View>
                </View>
                {number == index && (
                  <View
                    style={{ elevation: 5, zIndex: 1 }}
                    className="bg-secondary border-2 border-accent p-4 rounded-lg justify-start items-start w-full mt-4"
                  >
                    <View className="flex-row items-center justify-between w-full mb-2">
                      <Text className="text-xl font-semibold">Hard Mode</Text>
                      {/* <Switch
                        thumbColor={"#c72323"}
                        trackColor={"white"}
                        value={options.hardMode}
                        onChange={() =>
                          setOptions({
                            ...options,
                            hardMode: !options.hardMode,
                          })
                        }
                      /> */}
                      <Icons
                        name={
                          options.hardMode
                            ? "checkmark-circle"
                            : "ellipse-outline"
                        }
                        size={24}
                        color={"#c72323"}
                        onPress={() => handleSetHardMode()}
                      />
                    </View>
                    {!options.hardMode && (
                      <View className="w-full">
                        <View className="flex-row items-center justify-between w-full">
                          <Text className="text-xl font-semibold">
                            Randomize
                          </Text>
                          <Switch
                            thumbColor={"#c72323"}
                            trackColor={"white"}
                            value={options.random}
                            onChange={() =>
                              setOptions({
                                ...options,
                                random: !options.random,
                              })
                            }
                          />
                        </View>
                        <View className="flex-row items-center justify-between w-full">
                          <Text className="text-xl font-semibold">
                            Response
                          </Text>
                          <Switch
                            thumbColor={"#c72323"}
                            trackColor={"white"}
                            value={options.response}
                            onChange={() =>
                              setOptions({
                                ...options,
                                response: !options.response,
                              })
                            }
                          />
                        </View>
                        <View className="w-full">
                          <Text className="text-xl font-semibold ">
                            Set Limit: {options.limit}
                          </Text>
                          <View className="bg-black/10 p-2 rounded-xl mt-2">
                            <Slider
                              step={1}
                              value={sliderValue}
                              minimumValue={1}
                              maximumValue={itemLen}
                              minimumTrackTintColor="#e46767"
                              thumbTintColor="#c72323"
                              onValueChange={(e) =>
                                setOptions({ ...options, limit: e })
                              }
                            />
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>
        );
      })}

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.goBtn}
        onPress={() => handleSubmit()}
      >
        <Icons name="arrow-forward-outline" size={35} color={"#dcf9f9"} />
      </TouchableOpacity>

      <StatusBar hidden={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  selection: {
    elevation: 5,
    paddingVertical: 10,
    backgroundColor: "white",
    paddingVertical: 12,
    marginVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "space-between",
  },
  goBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e46767",
    paddingVertical: 10,
    paddingHorizontal: 80,
    borderRadius: 12,
    elevation: 5,
    marginTop: 10,
  },
});

export default HomeScreen;
