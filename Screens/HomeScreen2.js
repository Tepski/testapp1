import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Animated,
  StatusBar as SB,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { db } from "../MainContainer/firebase-config";
import { getDocs, collection, doc, getDoc } from "firebase/firestore";
import { ScrollView } from "react-native-gesture-handler";
import Convert from "../MainContainer/Convert";
import Colors from "../MainContainer/Color";
import Icons from "react-native-vector-icons/Ionicons";
import TabBar from "../MainContainer/TabBar";

const DevDim = Dimensions.get("screen");

const HomeScreen2 = ({ navigation }) => {
  const [data, setData] = React.useState([]);
  const subs = ["MESL", "PIPE", "MDSP"];
  const TabBarRef = React.useRef(new Animated.Value(0)).current;
  const listref = React.useRef();

  const showTabBar = (value, duration) => {
    Animated.timing(TabBarRef, {
      duration: duration,
      toValue: value,
      useNativeDriver: false,
    }).start();
  };

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
  };

  const checkChoices = () => {
    const item = data[2][1].data[0];
    const converted = Convert(item);
    for (i in converted) {
      const quesLen = converted[i].Choices;
      quesLen.forEach((item) => item.Label == "" && console.log(converted[i]));
    }
  };

  const nav = (index) => {
    listref.current.scrollToIndex({ index: index });
  };

  const navigateToMain = (item) => {
    navigation.navigate("Main", {
      data: Convert(item),
    });
  };

  React.useEffect(() => {
    getDocuments();
  }, []);

  return (
    <View>
      {/* <ScrollView
        style={{ backgroundColor: Colors.background }}
        horizontal
        snapToAlignment="center"
        snapToInterval={DevDim.width}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={listref}
      >
        {data &&
          data.map((item, index) => {
            return (
              <View
                key={index}
                style={styles.flatlist}
                className="justify-start items-center"
              >
                <Text
                  style={styles.text}
                  onPress={() => listref.current.scrollToIndex({ index: 1 })}
                >
                  {subs[index]}
                </Text>
                <ScrollView
                  style={{ width: DevDim.width }}
                  contentContainerStyle={{ paddingBottom: 65 }}
                  showsVerticalScrollIndicator={false}
                >
                  {item.map((week, index) => {
                    return (
                      <View
                        key={week.week}
                        // className="px-4 py-2 bg-secondary m-3 rounded-2xl"
                        style={styles.weekContainer}
                      >
                        <Text className="text-black/60 my-2 text-2xl font-bold">
                          {week.week}
                        </Text>
                        <View className="px-3">
                          {week.data.map((elements, index) => {
                            return (
                              <TouchableOpacity
                                onPress={() => console.log("HAHAHAH SUCCESS")}
                                activeOpacity={0.7}
                                key={index * 20}
                                className="bg-background/75 rounded-xl my-2 w-full self-center px-2 justify-between items-center flex-row"
                                style={{ borderWidth: 2, borderColor: "black" }}
                              >
                                <Text className="text-lg py-2 px-2 text-black/70 italic">
                                  Element {index + 1}
                                </Text>
                                <Icons
                                  name="arrow-forward-outline"
                                  size={30}
                                  color={"rgba(0, 0, 0, 0.7)"}
                                />
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
          })}
      </ScrollView> */}
      <FlatList
        style={{ backgroundColor: Colors.background }}
        horizontal
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
              key={index}
              style={styles.flatlist}
              className="justify-start items-center"
            >
              <View style={styles.text}>
                <Text
                  className="text-3xl font-semibold text-primary"
                  onPress={checkChoices}
                >
                  {subs[index]}
                </Text>
                <Icons
                  name="settings-outline"
                  size={30}
                  color={Colors.primary}
                />
              </View>

              <ScrollView
                style={{ width: DevDim.width }}
                contentContainerStyle={{ paddingBottom: 75 }}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={0}
              >
                {item.map((week, index) => {
                  return (
                    <View
                      key={week.week}
                      // className="px-4 py-2 bg-secondary m-3 rounded-2xl"
                      style={styles.weekContainer}
                    >
                      <Text className="text-black/60 my-2 text-2xl font-bold">
                        {week.week}
                      </Text>
                      <View className="px-3">
                        {week.data.map((elements, index) => {
                          return (
                            <TouchableOpacity
                              onPress={() => navigateToMain(elements)}
                              activeOpacity={0.7}
                              key={index * 20}
                              className="bg-background/75 rounded-xl my-2 w-full self-center px-2 justify-between items-center flex-row"
                              style={{ borderWidth: 2, borderColor: "black" }}
                            >
                              <Text className="text-lg py-2 px-2 font-semibold text-black/70 italic">
                                Element {index + 1}
                              </Text>
                              <Icons
                                name="arrow-forward-outline"
                                size={30}
                                color={"rgba(0, 0, 0, 0.7)"}
                              />
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
      <TabBar nav={nav} />
      <StatusBar />
    </View>
  );
};

export default HomeScreen2;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingTop: SB.currentHeight,
  },
  text: {
    borderBottomColor: Colors.accent,
    borderBottomWidth: 2,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  scrollView: {
    paddingLeft: 20,
    width: "100%",
    paddingBottom: 40,
  },
  flatlist: {
    backgroundColor: Colors.background,
    height: DevDim.height,
    width: DevDim.width,
    alignContent: "center",
    paddingTop: SB.currentHeight,
  },
  weekContainer: {
    backgroundColor: Colors.secondary,
    paddingVertical: 7,
    paddingHorizontal: 16,
    margin: 12,
    elevation: 10,
    borderRadius: 16,
    borderColor: Colors.accent,
    borderWidth: 3,
  },
});

// SAVE FOR LATER
// const [scrollOffset, setScrollOffset] = React.useState(0);

//   const handleScroll = (event) => {
//     const currentOffset = event.nativeEvent.contentOffset.y;

//     if (currentOffset > 0 && currentOffset > scrollOffset) {
//       Animated.timing(TabBarRef, {
//         duration: 2000,
//         toValue: 100,
//         useNativeDriver: false,
//       }).start();
//       setScrollDirection("down");
//     } else if (currentOffset < scrollOffset) {
//       Animated.timing(TabBarRef, {
//         duration: 2000,
//         toValue: 0,
//         useNativeDriver: false,
//       }).start();
//       setScrollDirection("up");
//     }

//     setScrollOffset(currentOffset);
//   };
