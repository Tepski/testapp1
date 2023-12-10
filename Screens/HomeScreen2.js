import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
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
  const listref = React.useRef(null);

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

  const nav = (index) => {
    listref.current.scrollToIndex({ index: index });
  };

  React.useEffect(() => {
    getDocuments();
  }, []);
  // return (
  //   <View style={styles.container}>
  //     {data && (
  //       <ScrollView style={styles.scrollView} snapToAlignment="start">
  //         {data.map((item, index) => {
  //           return (
  //             <View key={index}>
  //               <Text className="text-red-800 font-semibold text-3xl">
  //                 {subs[index]}
  //               </Text>
  //               {item.map((data, index) => {
  //                 return (
  //                   <View
  //                     key={data.week}
  //                     className="mx-4 py-2 px-2 my-2 bg-primary rounded-xl"
  //                   >
  //                     <Text className="text-blue-800 font-semibold text-lg self-center">
  //                       {data.week}
  //                     </Text>
  //                     {data.data.map((lmn, index) => {
  //                       return (
  //                         <View
  //                           tw="px-2 my-1 rounded-md bg-secondary"
  //                           key={-index}
  //                         >
  //                           <Text className="text-black/60 p-2  text-xl self-center">
  //                             Elements {index + 1}
  //                           </Text>
  //                         </View>
  //                       );
  //                     })}
  //                   </View>
  //                 );
  //               })}
  //             </View>
  //           );
  //         })}
  //       </ScrollView>
  //     )}
  //   </View>
  // );

  return (
    <View>
      <ScrollView
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
      </ScrollView>
      <TabBar />
      <StatusBar nav={nav} />
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
    fontSize: 30,
    fontWeight: "800",
    color: Colors.primary,
    borderBottomColor: Colors.accent,
    borderBottomWidth: 2,
    width: "100%",
    paddingStart: 20,
    paddingVertical: 10,
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
