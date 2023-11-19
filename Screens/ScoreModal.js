import react from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
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
}) => {
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
          <Text style={styles.text} className="text-primary">
            {data.correct > Math.floor(data.limit / 2)
              ? "CONGRATS!"
              : "EEWWW! "}
          </Text>
          <Text
            onPress={() => closeModal()}
            style={styles.text2}
            className="text-primary"
          >
            You Scored
          </Text>

          <View className="bg-text rounded-full h-56 w-56 p-10 my-5 justify-center items-center">
            <Text
              style={styles.score}
              className={`${data.correct > 99 ? "text-4xl" : "text-5xl"}`}
            >
              {data.correct}/{data.limit}
            </Text>
          </View>
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
