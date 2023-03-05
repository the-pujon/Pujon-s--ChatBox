import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatsContext } from "../context/ChatsContext";
import { db } from "../Firebase";
import Massage from "./Massage";

const Massages = () => {
  const { data } = useContext(ChatsContext);

  const [massages, setMassages] = useState([]);

  //get all data from chat db and send it to message component
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMassages(doc.data().massages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    <div className="massages">
      {massages.map((massage, index) => (
        <Massage massage={massage} key={index} />
      ))}
    </div>
  );
};

export default Massages;
