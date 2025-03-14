import { useEffect, useState } from "react";
import { UserAuthContext } from "../contexts/authContext"
import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../core/firebase";

const UseAddToMyList = ()=>{
  const {user} = UserAuthContext();
  const [myListItem , setMyListItem] = useState([]);

  useEffect(()=>{
    if(!user?.uid) return;

    const userDocRef = doc(db,"user",user.uid);
    const unsubscribe = onSnapshot(userDocRef, (docSnapshot)=> {
      if(docSnapshot.exists()){
        setMyListItem(docSnapshot.data().my_list || []);
      }
    },
    (error)=>{
      console.error("Error fetching my list data:", error);
    }
  )

  return ()=> unsubscribe();
  },[user]);

  // Add a movie to List.
  const addItemToList = async (movie) => {
    if (!user?.uid) return;
    try {
      const userDocRef = doc(db, "user", user.uid);
      await updateDoc(userDocRef, {
        my_list: arrayUnion(movie),
      });
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  // Remove a movie from List.
  const removeItemFromList = async (movie) => {
    if (!user?.uid) return;
    try {
      const userDocRef = doc(db, "user", user.uid);
      await updateDoc(userDocRef, {
       my_list: arrayRemove(movie),
      });
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  return { myListItem, addItemToList, removeItemFromList };
};

export default UseAddToMyList;
