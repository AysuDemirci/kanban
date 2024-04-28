import React, { useContext, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import firebaseConfig from "./firebaseConfig";
import "firebase/compat/auth";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import Swal from "sweetalert2";

const KanbanContext = React.createContext();

export function useKanbanContext() {
  return useContext(KanbanContext);
}

export function KanbanProvider(props) {
  const history = useNavigate();
  firebase.initializeApp(firebaseConfig);
  const auth = getAuth();
  const db = firebase.firestore();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function signUp(e) {
    e.preventDefault();
    const { name, email, password } = userData;
    await createUserWithEmailAndPassword(auth, email, password, name)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: userData.name,
        });
        db.collection("users").doc(user.uid).set({
          name: name,
          email: email,
          password: password,
        });
        sessionStorage.setItem("authToken", userCredential.user.accessToken);
        history("/main");
      })
      .catch((error) => {
        console.error("Hata:", error);

        if (error.code === "auth/invalid-credential") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Email veya şifren geçersiz",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Giriş yaparken sorun oluştu. Lütfen tekrar deneyiniz.",
          });
        }
      });
  }

  async function signIn(e) {
    e.preventDefault();
    const { email, password } = userData;
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUserData({
          name: user.displayName,
          email: user.email,
          password: "",
        });
        sessionStorage.setItem("authToken", userCredential.user.accessToken);
        history("/main");
      })
      .catch((error) => {
        console.error("Hata:", error);
        if (error.code === "auth/invalid-credential") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Email veya şifren geçersiz",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Giriş yaparken sorun oluştu. Lütfen tekrar deneyiniz.",
          });
        }
      });
  }

  async function signInOut() {
    await signOut(auth)
      .then(() => {
        sessionStorage.removeItem("authToken");
        history("/");
      })
      .catch((error) => {
        console.error("Hata:", error);
      });
  }

  function handleChangeValue(e) {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const value = {
    signUp,
    handleChangeValue,
    userData,
    signIn,
    signInOut,
  };
  return (
    <KanbanContext.Provider value={value}>
      {props.children}
    </KanbanContext.Provider>
  );
}
