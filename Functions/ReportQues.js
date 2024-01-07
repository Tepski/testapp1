import { db } from "../MainContainer/firebase-config";
import { doc, setDoc, getDoc } from "firebase/firestore";

const fetchData = async (sub) => {
  console.log("FETCH REACHED");
  const docRef = doc(db, "Reports", "SUBS");
  const docSnap = await getDoc(docRef);
  return docSnap.data().items;
};

export const reportQues = async (sub, week, element, ID) => {
  const list = await fetchData(sub);
  list.push(`${sub} - ${week} - Element# ${element + 1} - Question# ${ID}`);
  await setDoc(doc(db, "Reports", "SUBS"), {
    items: list,
  });
};
