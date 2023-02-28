import React, { useEffect, useState } from "react";
import Button from "../../components/button/Button";
import pujon from "../../images/logo.png";

import addAvatar from "../../images/addAvatar.png";
import { auth, storage, db } from "../../Firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router";

const RegisterPage = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);
      console.log(file);

      const storageRef = ref(storage, displayName);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});

            navigate("/login");
          } catch (err) {
            console.log(err);
            setErr(true);
          }
        });
      });
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div>
      <div className="formContainer">
        <div className="formWrapper">
          <h2 className="logo">
            <img src={pujon} alt="" />
          </h2>

          <h2 className="title">Register</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="text"
              //id="text"
              placeholder="write your name"
            />
            <input
              type="email"
              name="email"
              //id="email"
              placeholder="write your email"
            />
            <input
              type="password"
              name="password"
              //id="password"
              autoComplete="true"
              placeholder="write your password"
            />{" "}
            <div>
              <label htmlFor="file">
                <img src={addAvatar} alt="" /> <span>Add an avatar</span>
              </label>
              <input
                type="file"
                name="file"
                id="file"
                style={{ display: "none" }}
              />
            </div>
            {/*<button type="submit">Register</button>*/}
            <Button title="Register" />
            {err && <p>There is an error</p>}
            <p>
              Already have na account?{" "}
              <span onClick={() => navigate("/login")}>login</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
