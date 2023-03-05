import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatsContext } from "../context/ChatsContext";

const Massage = ({ massage }) => {
  //getting current user from authentication
  const { currentUser } = useContext(AuthContext);

  //getting receiver data from chatContext
  const { data } = useContext(ChatsContext);

  const ref = useRef();

  //for getting update message
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [massage]);

  return (
    <div
      ref={ref}
      className={`massage ${massage.senderId === currentUser.uid && "user"}`}
    >
      <div className="massageInfo">
        <img
          src={
            massage.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />{" "}
      </div>

      <div className="massageContent">
        <p>{massage.text}</p>
        {massage.img && <img src={massage.img} alt="" />}
      </div>
    </div>
  );
};

export default Massage;
