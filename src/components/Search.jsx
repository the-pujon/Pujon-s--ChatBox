import React, { useContext, useState } from "react";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../Firebase";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const { currentUser } = useContext(AuthContext);

  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );

    try {
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleClick = async () => {
    const combineID =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combineID));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combineID), { massages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combineID + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combineID + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combineID + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combineID + ".date"]: serverTimestamp(),
        });
      }
    } catch {}

    setUser(null);
    setUserName("");
  };

  return (
    <div className="search">
      <div className="FormSearch">
        <input
          type="text"
          name="text"
          id="text"
          placeholder="Fine a user"
          onKeyDown={handleKey}
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />
      </div>
      {error && <span>User Not Found</span>}
      {user && (
        <div className="userMassage" onClick={handleClick}>
          <img src={user.photoURL} alt="" />
          <div className="userMassageInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
