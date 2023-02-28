import { type } from "@testing-library/user-event/dist/type";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatsContext } from "../context/ChatsContext";
import { db } from "../Firebase";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);

  const { dispatch } = useContext(ChatsContext);

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

  const handleClick = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  Object.entries(chats)
    ?.sort((a, b) => b[1].date - a[1].date)
    .map((chat) => console.log(chat[1].lastMassage?.text.slice(0, 5)));

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
