import { useEffect, useState } from "react";
import { UserAuthContext } from "../contexts/authContext"
import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../core/firebase";

const UseAddToWatchLater = ()=>{
  const {user} = UserAuthContext();
  const [watchLaterItem , setWatchLaterItem] = useState([]);

  useEffect(()=>{
    if(!user?.uid) return;

    const userDocRef = doc(db,"user",user.uid);
    const unsubscribe = onSnapshot(userDocRef, (docSnapshot)=> {
      if(docSnapshot.exists()){
        setWatchLaterItem(docSnapshot.data().watch_later || []);
      }
    },
    (error)=>{
      console.error("Error fetching watch-later data:", error);
    }
  )

  return ()=> unsubscribe();
  },[user]);

  // Add a movie to watch later.
  const addItemToWatchLater = async (movie) => {
    if (!user?.uid) return;
    try {
      const userDocRef = doc(db, "user", user.uid);
      await updateDoc(userDocRef, {
        watch_later: arrayUnion(movie),
      });
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  // Remove a movie from watch later.
  const removeItemFromWatchLater = async (movie) => {
    if (!user?.uid) return;
    try {
      const userDocRef = doc(db, "user", user.uid);
      await updateDoc(userDocRef, {
       watch_later: arrayRemove(movie),
      });
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  return { watchLaterItem, addItemToWatchLater, removeItemFromWatchLater };
};

export default UseAddToWatchLater;
