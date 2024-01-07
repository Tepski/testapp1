import { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Switch,
  TouchableOpacity,
} from "react-native";
import Colors from "../MainContainer/Color";
import Icons from "react-native-vector-icons/Ionicons";

const textColor = "rgba(255, 255, 255, 0.7)";

const ModalScreen = ({ showModal, setShowModal, setting, setSettings }) => {
  return (
    <Modal visible={showModal} transparent>
      <View style={styles.transContainer}>
        <View style={styles.container}>
          <View className="flex-row justify-between px-3 w-full border-b-2 border-white/70">
            <Text
              onPress={() => setShowModal(!showModal)}
              className="text-white/70 text-xl"
            >
              SETTINGS
            </Text>
            <Icons
              onPress={() => setShowModal(!showModal)}
              name="close-outline"
              size={30}
              color={textColor}
            />
          </View>
          <View className="w-full flex-row justify-between">
            <Text className="text-white/70 text-lg my-2">Randomize: </Text>
            <Switch
              thumbColor={Colors.accent}
              trackColor={Colors.secondary}
              value={setting.random}
              onChange={() =>
                setSettings({
                  ...setting,
                  random: !setting.random,
                })
              }
            />
          </View>
          <View className="w-full flex-row justify-between">
            <Text className="text-white/70 text-lg my-2">Enable Response:</Text>
            <Switch
              thumbColor={Colors.accent}
              trackColor={Colors.secondary}
              value={setting.response}
              onChange={() =>
                setSettings({
                  ...setting,
                  response: !setting.response,
                })
              }
            />
          </View>
          <View className="w-full flex-row justify-between">
            <Text className="text-white/70 text-lg my-2">Hard Mode:</Text>
            <Switch disabled thumbColor={Colors.accent} />
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowModal(false)}
            className="border-white/70 border-2 w-full py-1"
          >
            <Text className="text-white/70 self-center text-lg">Okay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: "80%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  slider: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 5,
  },
  transContainer: {
    flex: 1,
    justifyContent: "center",
    marginTop: 30,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  button: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 20,
    width: 20,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "white",
  },
  buttonActive: {
    height: 13,
    width: 13,
    borderRadius: 100,
    backgroundColor: "white",
  },
});

export default ModalScreen;
