import { createContext, useContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../core/firebase";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  const signUp = async (email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      setUser(res.user);
      console.log(res.user.uid, email);
      await addDoc(collection(db, "user"), {
        uid: res.user.uid,
        email,
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
    <AuthContext.Provider value={{ user, signUp, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}
export const UserAuthContext = () => {
  return useContext(AuthContext);
};
