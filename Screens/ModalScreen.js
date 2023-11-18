import { useState } from "react";
import { View, Text, Modal } from "react-native";
import Convert from "../MainContainer/Convert";

const ModalScreen = ({ showModal, setShowModal }) => {
  return (
    <Modal visible={showModal}>
      <View>
        <View>
          <Text onPress={() => setShowModal(!showModal)}>MODAL SCREEN</Text>
        </View>
      </View>
    </Modal>
  );
};

export default ModalScreen;
