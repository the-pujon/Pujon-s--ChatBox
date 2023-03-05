import React, { useState } from "react";

//for navigate
import { useNavigate } from "react-router";
import Button from "../components/button/Button";

//firebase function
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";

//for my logo
import pujon from "../images/logo.png";

//main function
const LoginPage = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  //function for when form submitted
  const handleSubmit = async (e) => {
    e.preventDefault();

    //for taking all input value from input field
    const email = e.target[0].value;
    const password = e.target[1].value;

    //firebase
    try {
      //for login user
      await signInWithEmailAndPassword(auth, email, password);

      //navigate to home
      navigate("/");
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

          <h2 className="title">Log In</h2>
          <form onSubmit={handleSubmit}>
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
            />

            <Button title="LogIn" />
            {err && (
              <p style={{ color: "red", textAlign: "center" }}>
                There is an error
              </p>
            )}
            <p style={{ textAlign: "center" }}>
              Don't have an account?{" "}
              <span onClick={() => navigate("/register")}>register</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
