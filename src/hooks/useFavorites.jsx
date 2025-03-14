import { useEffect, useState } from "react";
import { UserAuthContext } from "../contexts/authContext"
import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../core/firebase";

const UseFavorites = ()=>{
  const {user} = UserAuthContext();
  const [favorites , setFavorites] = useState([]);

  useEffect(()=>{
    if(!user?.uid) return;

    const userDocRef = doc(db,"user",user.uid);
    const unsubscribe = onSnapshot(userDocRef, (docSnapshot)=> {
      if(docSnapshot.exists()){
        setFavorites(docSnapshot.data().favorites || []);
      }
    },
    (error)=>{
      console.error("Error fetching favorites:", error);
    }
  )

  return ()=> unsubscribe();
  },[user]);

  // Add a movie to favorites.
  const addFavorite = async (movie) => {
    if (!user?.uid) return;
    try {
      const userDocRef = doc(db, "user", user.uid);
      await updateDoc(userDocRef, {
        favorites: arrayUnion(movie),
      });
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  // Remove a movie from favorites.
  const removeFavorite = async (movie) => {
    if (!user?.uid) return;
    try {
      const userDocRef = doc(db, "user", user.uid);
      await updateDoc(userDocRef, {
        favorites: arrayRemove(movie),
      });
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  return { favorites, addFavorite, removeFavorite };
};

export default UseFavorites;
