import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../core/firebase";
import {  doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authIsReady, setAuthIsReady] = useState(false);

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth , (currentUser)=>{
      setUser(currentUser);
      setAuthIsReady(true);
    })
    return unsubscribe;
  } , [])

  const signUp = async (email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      setUser(res.user);
      console.log(res.user.uid, email);
      await setDoc(doc(db, "user" , res.user.uid), {
        uid: res.user.uid,
        email:email,
        favorites: [],
        my_list:[],
        watch_later:[],
        createdAt: new Date(),
      });
      toast.success("User created successfully");
    } catch (error) {
      console.log(error.message);
      toast.error(error.code.split("/")[1].split("-").join(" "));
    }
  };

  const logIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.code.split("/")[1].split("-").join(" "));
    }
  };
  const logOut = () => {
    signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, signUp, logIn, logOut , authIsReady }}>
      {children}
    </AuthContext.Provider>
  );
}
export const UserAuthContext = () => {
  return useContext(AuthContext);
};
