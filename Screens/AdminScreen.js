import react from "react";
import { useState, useRef } from "react";
import { View, Text, Button, TouchableOpacity, ScrollView } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../MainContainer/firebase";
import ModalScreen from "./ModalScreen";
import Convert from "../MainContainer/Convert";
import Icons from "react-native-vector-icons/Ionicons";

const AdminScreen = ({ navigation }) => {
  const [text, setText] = useState("");
  const [quizes, setQuizes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [FS, setFS] = useState(false);
  const [errors, setErrors] = useState([]);
  const [value, setValue] = useState(null);
  const [dataset, setDataset] = useState({
    subject: null,
    week: null,
  });

  const input = useRef();

  const addDocument = async (item, coll) => {
    try {
      const docRef = await addDoc(collection(db, coll), {
        text: item,
      });
      console.log(docRef.id);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const getDocument = async () => {
    const querySnapshot = await getDocs(collection(db, "Elements"));
    querySnapshot.forEach((doc) => {
      // setQuizes([...quizes, doc.data()]);
      console.log(doc.data());
    });
  };

  const toJSON = () => {
    const data = JSON.parse(Convert(text));
    return data;
  };

  const checkChoices = () => {
    const quiz = toJSON();
    const error = [];
    const len = quiz?.length;
    for (let i = 0; i < len; i++) {
      const item = quiz[i];
      if (item?.Choices.length != 4) {
        error.push(" " + item.ID);
      }
    }
    setErrors(error);
    console.log(error);
  };

  const clearText = () => {
    input.current.clear();
    setText("");
    setErrors([]);
  };

  return (
    <View className="w-full h-full justify-start items-center pt-8 bg-background px-2">
      <View className="flex-row justify-between items-center w-full px-4">
        <Text
          onPress={() => navigation.navigate("Home")}
          className="text-3xl text-black/50"
        >
          HOME
        </Text>
      </View>
      <View className="w-full pt-6">
        <View
          className={`bg-secondary pl-4 py-4 mb-4 relative rounded-xl`}
          style={{ elevation: 10, height: FS ? "95%" : 240 }}
        >
          <TouchableOpacity
            onPress={() => setFS(!FS)}
            className="absolute flex-col right-4 top-2"
            style={{ zIndex: 1 }}
          >
            <Icons
              name="expand-outline"
              size={28}
              color={"rgba(0, 0, 0, 0.5)"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => clearText()}
            className="absolute flex-col right-4 top-12"
            style={{ zIndex: 1 }}
          >
            <Icons
              name="trash-outline"
              size={28}
              color={"rgba(0, 0, 0, 0.5)"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => checkChoices()}
            activeOpacity={0.7}
            style={{
              zIndex: 1,
              // borderColor: "rgba(0, 0, 0, 0.5)",
              borderWidth: 1,
            }}
            className="absolute bottom-2 right-4 bg-secondary items-center border-2 border-primary py-2 px-4 rounded-full"
          >
            <Text className="text-primary">Check</Text>
          </TouchableOpacity>
          <TextInput
            ref={input}
            style={{ zIndex: 0 }}
            placeholder="INPUT TEXT HERE"
            multiline={true}
            numberOfLines={10}
            textAlignVertical="top"
            onChangeText={(e) => setText(e)}
            className=" text-black/70 pr-10"
          />
        </View>
      </View>
      {errors.length > 0 && (
        <ScrollView className="w-full p-4 max-h-80" style={{ elevation: 10 }}>
          <Text className="text-black/50 text-xl">
            Errors: {errors.toString()}
          </Text>
        </ScrollView>
      )}

      <View className="absolute bottom-4 w-full px-4">
        <TouchableOpacity
          className="bg-primary py-4 items-center rounded-2xl"
          onPress={() => setShowModal(!showModal)}
        >
          <Text className="text-2xl text-background">FINALIZE</Text>
        </TouchableOpacity>
      </View>
      <ModalScreen showModal={showModal} setShoModal={setShowModal} />
    </View>
  );
};

export default AdminScreen;
