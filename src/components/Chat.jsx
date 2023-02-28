import React, { useContext } from "react";
import Camera from "../images/video-camera (1).png";
import AddUser from "../images/add-user.png";
import More from "../images/more (1).png";
import Massages from "./Massages";
import Input from "./Input";
import { ChatsContext } from "../context/ChatsContext";

const Chat = () => {
  const { data } = useContext(ChatsContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user.displayName}</span>
        <div className="chatIcons">
          <img src={Camera} alt="" />
          <img src={AddUser} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Massages />
      <Input />
    </div>
  );
};

export default Chat;
