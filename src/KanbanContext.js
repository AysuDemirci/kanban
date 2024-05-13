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
import { v4 as uuidv4 } from "uuid";
// import { getDocs, collection } from "firebase/firestore";

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
  const [isOpen, setIsOpen] = useState(false);
  const [listId, setListId] = useState(uuidv4());
  const [cardId, setCardId] = useState(uuidv4());
  //  const[user,setUser]=useState(null)

  const [list, setList] = useState([
    {
      id: "0",
      cardName: "",
      cards: [],
    },
  ]);

  function handleAddListClick() {
    const newList = {
      id: listId,
      cardName: "",
      cards: [],
    };
    setList([...list, newList]);
    setListId(uuidv4());


  }

  function handleAddCardClick(listIndex) {
    const newList = [...list];
    newList[listIndex].cards.push({
      id: cardId,
      card: "",
    });
    setList(newList);
    setCardId(uuidv4());
  

  }

  async function handleUpdateCardNameData(listIndex){
    const newList = [...list];
    const user = auth.currentUser;
    const collectionRef = db.collection('users').doc(user.uid).collection('lists');
    collectionRef.doc(list[listIndex].id).update({cardName:newList[listIndex].cardName})
    .then(()=>{
      
      console.log("güncellendi")
    }).catch((err)=>console.log("hata:",err))
  }
  async function handleUpdateCardsData(listItem, listIndex) {
    const user = auth.currentUser;
    const collectionRef = db.collection('users').doc(user.uid).collection('lists');
    try {
      await collectionRef.doc(listItem.id).update({ cards: listItem.cards });
      console.log("Kartlar güncellendi");
    } catch (error) {
      console.error("Kart güncelleme hatası:", error);
    }
  }



async function getFirebaseData (){
  const user = auth.currentUser;
  const userListsRef = db
    .collection("users")
    .doc(user.uid)
    .collection("lists");
  const unsubscribe = userListsRef.onSnapshot((snapshot) => {
    const listsData = [];
    snapshot.forEach((doc) => {
      listsData.push({ id: doc.id, ...doc.data() });
    });
    setList(listsData);

  
  });

  return () => unsubscribe(); 
}

function handleCardNameBlur(listItem,listIndex) {
  if(listItem.userId!==undefined){
    handleUpdateCardNameData(listIndex)
  }else if(listItem.cardName === ""){
    return
  }
  else{
    sendDataToFirebase(listItem);
  }
  
}

function handleCardContentBlur(listItem, listIndex, cardIndex) {
  if (listItem.userId !== undefined) {
    handleUpdateCardsData(listItem, listIndex);
  } else {
    sendDataToFirebase(listItem);
  }
}


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

  async function sendDataToFirebase(listItem) {
    const user = auth.currentUser;
    const collectionRef = db
      .collection("users")
      .doc(user.uid)
      .collection("lists");

    collectionRef
      .add({
        userId: user.uid,
        cardName: listItem.cardName,
        cards: listItem.cards,
      })
      .then((docRef) => {
        console.log("List added with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding list: ", error);
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
  function handleCardNameChange(e, listIndex) {
    const { value } = e.target;
    const newList = [...list];
    newList[listIndex].cardName = value || "";
    setList(newList);
    
  }

  function handleCardContentChange(e, listIndex, cardIndex) {
    const { value } = e.target;
    const newList = [...list];
    newList[listIndex].cards[cardIndex].card = value || "";
    setList(newList);
  }



  const value = {
    signUp,
    handleCardNameBlur,
    handleCardContentBlur,
    handleChangeValue,
    userData,
    signIn,
    signInOut,
    isOpen,
    setIsOpen,
    list,
    setList,
    handleAddListClick,
    handleAddCardClick,
    handleCardNameChange,
    handleCardContentChange,
    getFirebaseData,
    sendDataToFirebase,
    handleUpdateCardsData,
    handleUpdateCardNameData,
  };
  return (
    <KanbanContext.Provider value={value}>
      {props.children}
    </KanbanContext.Provider>
  );
}
