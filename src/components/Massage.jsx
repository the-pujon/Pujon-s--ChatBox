import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatsContext } from "../context/ChatsContext";
import User1 from "../images/User-1.jpg";

const Massage = ({ massage }) => {
  const { currentUser } = useContext(AuthContext);

  const serverDate = new Date(massage.date.seconds * 1000).getTime();

  const { data } = useContext(ChatsContext);

  const Localdate = new Date().getTime();

  console.log(serverDate);
  console.log(Localdate);

  const date = Math.abs(serverDate - Localdate);

  console.log(new Date(date));
  const ref = useRef();

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
