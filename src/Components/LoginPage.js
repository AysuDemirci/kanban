import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useKanbanContext } from "../KanbanContext";

export default function LoginPage() {
  const [isSignUpActive, setIsSignUpActive] = useState(true);
  // const history = useNavigate();
  const handleSignUpClick = () => {
    setIsSignUpActive(true);
  };

  const handleSignInClick = () => {
    setIsSignUpActive(false);
  };

  const containerClasses = `container ${
    isSignUpActive ? "right-panel-active" : ""
  }`;

  const { signUp, handleChangeValue, userData, signIn } = useKanbanContext();

  return (
    <div className={containerClasses} id="main">
      <div className="signUpContainer">
        <form>
          <h4 className="title">Create Account</h4>
          <input
            type="text"
            placeholder="Name"
            className="inputs"
            name="name"
            value={userData.name}
            onChange={handleChangeValue}
            required
          ></input>
          <input
            type="email"
            placeholder="Email"
            className="inputs"
            name="email"
            value={userData.email}
            onChange={handleChangeValue}
            required
          ></input>
          <input
            type="password"
            placeholder="Password"
            className="inputs"
            name="password"
            value={userData.password}
            onChange={handleChangeValue}
            required
          ></input>
          <button
            className="buttons"
            onClick={signUp}
            disabled={
              userData.name === "" &&
              userData.email === "" &&
              userData.password === ""
            }
          >
            Sign Up
          </button>
        </form>
      </div>
      <div className="signInContainer">
        <form>
          <h4 className="title">Sign In</h4>
          <input
            type="email"
            placeholder="Email"
            className="inputs"
            name="email"
            onChange={handleChangeValue}
            value={userData.email}
          ></input>
          <input
            type="password"
            placeholder="Password"
            className="inputs"
            name="password"
            onChange={handleChangeValue}
            value={userData.password}
          ></input>
          <button className="buttons" onClick={signIn}>
            Sign In
          </button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="leftOverlayPanel">
            <h4 className="title">Welcome Back!</h4>
            <p className="paragraph">
              {" "}
              To keep connected with us please login with your personal info
            </p>
            <button
              id="signIn"
              onClick={handleSignInClick}
              className="ghost-button buttons"
            >
              Sign In
            </button>
          </div>
          <div className="rightOverlayPanel">
            <h4 className="title">Hello, Friend!</h4>
            <p className="paragraph">
              Enter Your personal details and start journey with us
            </p>
            <button
              id="signUp"
              onClick={handleSignUpClick}
              className="ghost-button buttons"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
