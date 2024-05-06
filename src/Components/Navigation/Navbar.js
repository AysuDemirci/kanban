import React, { useState } from "react";
import { LuMenuSquare } from "react-icons/lu";
import { FaAngleDown } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { IoPersonSharp } from "react-icons/io5";
import { useKanbanContext } from "../../KanbanContext";

export default function Navbar() {
  const { userData, signInOut } = useKanbanContext();
  const [open, setOpen] = useState(false);
  function toggleOpen() {
    setOpen(!open);
  }
  return (
    <div>
      <div className="header">
        <div className="nav">
          <ul className="ul">
            <li>
              <div className="logo">
                <ul style={{ gap: "0.5rem" }} className="ul">
                  <li>
                    <LuMenuSquare
                      style={{ fontSize: "1.5rem", marginTop: "5px" }}
                    />
                  </li>
                  <li>
                    <h2>Logo</h2>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <a href="/main">Çalışma Alanları</a>
              <FaAngleDown className="icons" style={{ marginLeft: "-15px" }} />
            </li>

            <li>
              <a href="/main">Oluştur</a>
              <FiPlus className="icons" />
            </li>
          </ul>
          <div className="profile">
            <span style={{ color: "#fff" }}>Hoşgeldin, {userData.name}</span>

            <div className="square">
              <IoPersonSharp
                onClick={toggleOpen}
                style={{
                  fontSize: "1.3rem",
                  marginLeft: "7px",
                  marginTop: "6px",
                  color: "#fff",
                  cursor: "pointer",
                }}
              />

              {open && (
                <div className="navbar-toggle">
                  <ul className="toggle-ul">
                    <li>Hesabım</li>
                    <li>{userData.name}</li>
                    <li>{userData.email}</li>
                  </ul>
                  <hr className="hr"/>
                  <button className="navbar-toggleButton" onClick={signInOut}>
                    Çıkış Yap
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
