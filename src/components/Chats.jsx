//import { type } from "@testing-library/user-event/dist/type";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatsContext } from "../context/ChatsContext";
import { db } from "../Firebase";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);

  const { dispatch } = useContext(ChatsContext);

  //for getting data from userChat where user and receiver last message stored
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  //store receiver info into ChatContext so that it can use anywhere in this project
  const handleClick = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chat">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className="userMassage"
            key={chat[0]}
            onClick={() => handleClick(chat[1].userInfo)}
          >
            <img src={chat[1].userInfo.photoURL} alt="" />
            <div className="userMassageInfo">
              <span>{chat[1].userInfo.displayName}</span>
              <p>{chat[1].lastMassage?.text.slice(0, 10)}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
