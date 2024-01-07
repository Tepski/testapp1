import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useMemo } from "react";
import Icons from "react-native-vector-icons/Ionicons";
import Slider from "@react-native-community/slider";
import Colors from "../MainContainer/Color";

const DevDim = Dimensions.get("screen");

const MainScrollComponent = ({
  data,
  handleClick,
  subs,
  selected,
  navigateToMain,
  sliderVal,
  setSliderVal,
  listref,
}) => {
  const sliderComponent = useMemo(
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

  return (
    <FlatList
      horizontal
      keyExtractor={(item, index) => index.toString()}
      //   scrollEnabled={false}
      snapToAlignment="center"
      snapToInterval={DevDim.width}
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      ref={listref}
      data={data && data}
      renderItem={({ item, index }) => {
        return (
          <View style={styles.flatlist} className="justify-start items-center">
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
  );
};

export default MainScrollComponent;

const styles = StyleSheet.create({
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
