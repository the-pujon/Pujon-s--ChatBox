import React, { useState } from "react";
import { useNavigate } from "react-router";
import Button from "../components/button/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import pujon from "../images/logo.png";

const LoginPage = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);

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
            {err && <p>There is an error</p>}
            <p>
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
