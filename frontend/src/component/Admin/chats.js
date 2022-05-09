import React, { useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineSend } from "react-icons/ai";

import "./chats.css";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyCJF5FFmoayKdnVgR9N3-suUlnX5DY3Fx4",
  authDomain: "mealtime254.firebaseapp.com",
  projectId: "mealtime254",
  storageBucket: "mealtime254.appspot.com",
  messagingSenderId: "418569155767",
  appId: "1:418569155767:web:4536147d86096694050932",
  measurementId: "G-H4JZBTT9QX",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function Live() {
  const [user] = useAuthState(auth);

  return (
    <div className="Chats">
      <header>
        <SignOut />
      </header>

      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>
        <FcGoogle className="googleicon" />
        Sign with Google
      </button>
      <p className="signp">
        Do not violate the community guidelines or you will be banned for life!
      </p>
    </>
  );
}

function SignOut() {
  return (
    auth.currentUser && (
      <button className="button" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    )
  );
}

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main className="chatmain">
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage} className="submits">
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          className="inputs"
          placeholder="Chat with the user here"
        />

        <button type="submits" disabled={!formValue} className="button">
          <AiOutlineSend className="ai" />
        </button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img
          className="avater"
          src={
            photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"
          }
          alt="user_profile"
        />
        <p className="text">{text}</p>
      </div>
    </>
  );
}

export default Live;
