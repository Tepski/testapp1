import react from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icons from "react-native-vector-icons/Ionicons";

const colors = {
  text: "#082b2b",
  background: "#dcf9f9",
  primary: "#e46767",
  secondary: "#f4f4c2",
  accent: "#c72323",
};

const ScoreModal = ({
  showModal,
  closeModal,
  refresh,
  data,
  setShowModal,
  navigation,
  review,
}) => {
  const [reviewAns, setReviewAns] = react.useState(true);

  const retry = () => {
    refresh();
    setShowModal(false);
  };

  const home = () => {
    setShowModal(false);
    navigation.replace("Home");
  };

  return (
    <Modal visible={showModal} transparent={true}>
      <View style={styles.contBG}>
        <View
          style={{
            width: 350,
            paddingVertical: 40,
          }}
          className=" bg-background justify-center items-center rounded-xl"
        >
          {reviewAns ? (
            <View className="justify-center items-center">
              <Text
                style={styles.text}
                className="text-primary"
                onPress={() => console.log(review[1].data.Choices[0])}
              >
                {data.correct > Math.floor(data.limit / 2)
                  ? "CONGRATS!"
                  : "EEWWW! "}
              </Text>
              <Text style={styles.text2} className="text-primary">
                You Scored
              </Text>

              <View className="bg-text rounded-full h-56 56 w-56 p-10 my-5 justify-center items-center">
                <Text
                  style={styles.score}
                  className={`${data.correct > 99 ? "text-4xl" : "text-5xl"}`}
                >
                  {data.correct}/{data.limit}
                </Text>
              </View>
            </View>
          ) : (
            <ScrollView style={{ maxHeight: 600, paddingHorizontal: 10 }}>
              {review.map((item, index) => {
                return (
                  <View key={item.data.ID} tw="py-2">
                    <Text tw="pb-2 font-semibold">
                      {index + 1}. {item.data.Question}
                    </Text>
                    {item.data.Choices.map((choices, index) => {
                      return (
                        <View key={index}>
                          <Text
                            tw={`px-2 ${
                              item.answer == choices.Label &&
                              `${
                                item.answer == item.data.Answer
                                  ? "text-green-500"
                                  : "text-red-500"
                              } font-semibold`
                            } `}
                          >
                            {choices.Label}: {choices.String}
                          </Text>
                        </View>
                      );
                    })}
                    <Text tw="px-2 pt-2">ANSWER: {item.data.Answer}</Text>
                  </View>
                );
              })}
            </ScrollView>
          )}
          <View className=" w-full flex-row px-12 justify-between">
            <TouchableOpacity onPress={() => retry()}>
              <Icons name="refresh-outline" size={60} color={colors.accent} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => home()}>
              <Icons
                name="arrow-forward-outline"
                size={60}
                color={colors.accent}
              />
            </TouchableOpacity>
          </View>
          <Text
            className="text-sm text-primary"
            onPress={() => setReviewAns(!reviewAns)}
          >
            {reviewAns ? "Review Answers" : "Show Score"}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  contBG: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  text: {
    fontSize: 50,
    fontWeight: "bold",
  },
  text2: {
    fontSize: 30,
    fontWeight: "bold",
  },
  score: {
    fontWeight: "900",
    color: "yellow",
  },
});

export default ScoreModal;
