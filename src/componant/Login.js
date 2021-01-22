import { Button } from "@material-ui/core";
import React from "react";
import { auth, provider } from "../firebase";
import "./login.css";

const Login = () => {
  const signin = () => {
    auth
      .signInWithPopup(provider)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => alert(err.message));
  };
  return (
    <div className="login">
      <div className="login__container ">
        <img src={process.env.PUBLIC_URL + "whatsapp.png"} />
        <div className="login__text">
          <h1>Sign in to WhatsApp</h1>
        </div>
        <Button color="primary" onClick={signin}>
          Sign in With Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
