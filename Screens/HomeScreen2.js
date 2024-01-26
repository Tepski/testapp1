import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  StatusBar as SB,
  Image,
  LogBox,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { db } from "../MainContainer/firebase-config";
import { getDocs, collection } from "firebase/firestore";
import { ScrollView } from "react-native-gesture-handler";
import Convert from "../MainContainer/Convert";
import Colors from "../MainContainer/Color";
import Icons from "react-native-vector-icons/Ionicons";
import TabBar from "../MainContainer/TabBar";
import ModalScreen from "../Screens/ModalScreen";
import imageSelector from "../MainContainer/BGselector";
import Slider from "@react-native-community/slider";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DevDim = Dimensions.get("window");

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state.",
]);

const subs = ["MESL", "PIPE", "MDSP"];

const HomeScreen2 = ({ navigation }) => {
  const [data, setData] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [selected, setSelected] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [sliderVal, setSliderVal] = React.useState();
  const [setting, setSettings] = React.useState({
    random: false,
    response: true,
    hardMode: false,
  });

  const [a, b, c, d] = [1, 2, 3, 4];

  const setDataToStorage = async (item) => {
    const dataToBeStored = JSON.stringify(item);
    await AsyncStorage.setItem("Data", dataToBeStored);
  };

  const setSettingsToBeStored = async () => {
    const setSettingsToBeStored = JSON.stringify(setting);
    await AsyncStorage.setItem("Settings", setSettingsToBeStored);
  };

  const getDataStored = async () => {
    const dataStored = await AsyncStorage.getItem("Data");
    if (dataStored) {
      setData(JSON.parse(dataStored));
      setLoading(false);
    } else {
      getDocuments();
    }
  };

  const refreshPage = () => {
    getDocuments();
    console.log("aoisjd");
  };

  const getSettingsStored = async () => {
    let settingsStored = await AsyncStorage.getItem("Settings");
    if (settingsStored != null) {
      settingsStored = JSON.parse(settingsStored);
      setSettings(settingsStored);
    } else {
      return;
    }
  };

  const listref = React.useRef();

  const getDocuments = async () => {
    const subslist = [];
    for (i in subs) {
      const idlist = [];
      const itemSnapshot = await getDocs(collection(db, subs[i]));
      itemSnapshot.forEach((item) => {
        const obj = { week: item.id, data: item.data().elements };
        idlist.push(obj);
      });
      subslist.push(idlist);
    }
    setData(subslist);
    setDataToStorage(subslist);
    setLoading(false);
  };

  const checkChoices = () => {
    const elements = 0;
    // subs
    for (i in data) {
      // week
      for (j in data[i]) {
        const datum = data[i][j];
        // j == 0 && console.log(datum.data[0]);
        for (k in datum.data) {
          const item = datum.data;
          const ements = Convert(item[k]);
          for (l in ements) {
            if (ements[l].Choices.length != 4) {
              console.log(
                `${subs[i]} - ${datum.week} - ELEMENT# ${k} - ${ements[l].ID}`
              );
            }
          }
        }
      }
    }
  };

  const sliderComponent = React.useMemo(
    () => (
      <Slider
        value={selected.limit}
        step={1}
        minimumValue={1}
        maximumValue={selected.limit}
        thumbTintColor={Colors.accent}
        onValueChange={(e) => setSliderVal(e)}
      />
    ),
    [selected.limit]
  );

  const shuffleArray = (array) => {
    const shuffledArray = [...array];

    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }

    return shuffledArray;
  };

  const navigateToMain = (item, sub, week, element) => {
    const normalData = Convert(item).slice(0, sliderVal);
    const randomData = shuffleArray(normalData);
    navigation.navigate("Main", {
      data: setting.random ? randomData : normalData,
      imageSource: imageSelector(),
      week,
      element,
      sub: sub,
      response: setting.response,
    });
  };

  // const handleClick = (elements, index, week, ind) => {
  //   const limit = Convert(elements).length;

  //   setSliderVal(limit);

  //   setSelected({
  //     id: index + week.week + ind,
  //     limit: limit,
  //   });
  // };

  const handleClick = React.useCallback((elements, index, week, ind) => {
    const limit = Convert(elements).length;
    setSliderVal(limit);

    setSelected({
      id: index + week.week + ind,
      limit: limit,
    });
  }, []);

  const nav = (index) => {
    listref.current.scrollToIndex({ index: index });
  };

  React.useEffect(() => {
    getDataStored();
    getSettingsStored();
  }, []);

  React.useEffect(() => {
    showModal == false && setSettingsToBeStored();
  }, [showModal]);

  return (
    <View style={styles.container}>
      <View className="absolute">
        <Image
          source={require("../MainContainer/Backgrounds/12.png")}
          style={{
            resizeMode: "stretch",
            height: DevDim.height + 50,
            width: DevDim.width,
          }}
        />
      </View>
      {!loading && (
        <View style={styles.text}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowModal(!showModal)}
          >
            <Icons name="settings-outline" size={30} color={Colors.secondary} />
          </TouchableOpacity>
          <Text
            className="text-secondary font-semibold italic text-xl"
            onPress={refreshPage}
          >
            ELEMENTS
          </Text>
        </View>
      )}
      {!loading ? (
        <FlatList
          horizontal
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
          snapToAlignment="center"
          snapToInterval={DevDim.width}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          ref={listref}
          data={data && data}
          renderItem={({ item, index }) => {
            return (
              <View
                style={styles.flatlist}
                className="justify-start items-center"
              >
                <ScrollView
                  style={{ width: DevDim.width }}
                  contentContainerStyle={{ paddingBottom: 115 }}
                  showsVerticalScrollIndicator={false}
                  scrollEventThrottle={0}
                >
                  {item.map((week) => {
                    return (
                      <View
                        key={week.week}
                        // className="px-4 py-2 bg-secondary m-3 rounded-2xl"
                        style={styles.weekContainer}
                      >
                        <Text className="text-white/70 my-2 text-2xl font-bold">
                          {week.week}
                        </Text>
                        <View className="px-3">
                          {week.data.map((elements, ind) => {
                            return (
                              <TouchableOpacity
                                onPress={() =>
                                  // navigateToMain(elements, subs[index])
                                  handleClick(elements, index, week, ind)
                                }
                                activeOpacity={0.7}
                                className="bg-background/70 my-2 w-full self-center px-2  rounded-xl"
                                key={ind * 20}
                              >
                                <View className="justify-between items-center flex-row">
                                  <Text className="text-lg py-2 px-2 font-semibold text-white/70 italic">
                                    Elements {ind + 1}
                                  </Text>
                                  <Icons
                                    name="caret-down-outline"
                                    size={30}
                                    color={"rgba(255, 255, 255,  0.7)"}
                                  />
                                </View>
                                {index + week.week + ind == selected.id && (
                                  <View>
                                    <View className="settings bg-red-900/20 my-2 rounded-lg py-2">
                                      <Text className="text-white/70 px-4">
                                        NUMBER OF ITEMS: {sliderVal}
                                      </Text>
                                      {sliderComponent}
                                    </View>
                                    <View className="self-end px-3 my-4 items-center justify-center">
                                      <TouchableOpacity
                                        activeOpacity={0.7}
                                        onPress={() =>
                                          navigateToMain(
                                            elements,
                                            subs[index],
                                            week.week,
                                            ind
                                          )
                                        }
                                      >
                                        <Text className="px-3 py-1 text-white/70">
                                          NEXT
                                        </Text>
                                      </TouchableOpacity>
                                    </View>
                                  </View>
                                )}
                              </TouchableOpacity>
                            );
                          })}
                        </View>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            );
          }}
        />
      ) : (
        <View className="justify-center items-center h-full">
          <ActivityIndicator size={"large"} />
        </View>
      )}
      <ModalScreen
        showModal={showModal}
        setShowModal={setShowModal}
        setting={setting}
        setSettings={setSettings}
      />
      {!loading && <TabBar nav={nav} />}
      <StatusBar hidden={true} />
    </View>
  );
};

export default HomeScreen2;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    marginBottom: 0,
  },
  text: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row-reverse",
    borderBottomColor: Colors.secondary,
    borderBottomWidth: 2,
  },
  scrollView: {
    paddingLeft: 20,
    width: "100%",
    paddingBottom: 40,
  },
  flatlist: {
    height: DevDim.height,
    width: DevDim.width,
    alignContent: "center",
  },
  weekContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingVertical: 7,
    paddingHorizontal: 16,
    margin: 12,
  },
});
