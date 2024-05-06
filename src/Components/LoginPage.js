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
          <h4 className="title">Hesap Oluştur</h4>
          <input
            type="text"
            placeholder="İsim"
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
            placeholder="Şifre"
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
            Kayıt Ol
          </button>
        </form>
      </div>
      <div className="signInContainer">
        <form>
          <h4 className="title">Giriş Yap</h4>
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
            placeholder="Şifre"
            className="inputs"
            name="password"
            onChange={handleChangeValue}
            value={userData.password}
          ></input>
          <button className="buttons" onClick={signIn}>
            Giriş Yap
          </button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="leftOverlayPanel">
            <h4 className="title">Tekrar Hoşgeldin!</h4>
            <p className="paragraph">
              {" "}
              Bizimle bağlantıya katılmak için lütfen kişisel bilgilerinizle giriş yapın.</p>
            <button
              id="signIn"
              onClick={handleSignInClick}
              className="ghost-button buttons"
            >
              Giriş Yap
            </button>
          </div>
          <div className="rightOverlayPanel">
            <h4 className="title">Selam!</h4>
            <p className="paragraph">
              Birkaç kişisel bilgini girerek bizimle yolculuğa başla.
            </p>
            <button
              id="signUp"
              onClick={handleSignUpClick}
              className="ghost-button buttons"
            >
              Kayıt Ol
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
