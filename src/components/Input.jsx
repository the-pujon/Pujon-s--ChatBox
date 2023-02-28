import React, { useContext, useState } from "react";
import Image from "../images/image (1).png";
import Attach from "../images/attachment.png";
import { AuthContext } from "../context/AuthContext";
import { ChatsContext } from "../context/ChatsContext";
import { uuidv4 } from "@firebase/util";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../Firebase";
//import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const { data } = useContext(ChatsContext);

  console.log(data.receiverId);

  const handleClick = async () => {
    if (file) {
      const storageRef = ref(storage, uuidv4());

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateDoc(doc(db, "chats", data.chatId), {
              massages: arrayUnion({
                id: uuidv4(),
                text,
                senderId: currentUser.uid,
                receiverId: data.receiverId,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          } catch (err) {
            console.log(err);
            setErr(true);
          }
        });
      });
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        massages: arrayUnion({
          id: uuidv4(),
          text,
          senderId: currentUser.uid,
          receiverId: data.receiverId,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMassage"]: {
        text,
      },

      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMassage"]: {
        text,
      },

      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setFile(null);
  };

  return (
    <div className="input">
      <textarea
        type="text"
        name="text"
        value={text}
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
      />
      <div className="send">
        <img src={Attach} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          name="file"
          id="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Image} alt="" />
        </label>
        <button onClick={handleClick}>
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
};

export default Input;
