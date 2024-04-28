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
          <ul>
            <li>
              <div className="logo">
                <ul style={{ gap: "0.5rem" }}>
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
              <a href="/">Çalışma Alanları</a>
              <FaAngleDown className="icons" style={{ marginLeft: "-15px" }} />
            </li>

            <li>
              <a href="/">Oluştur</a>
              <FiPlus className="icons" />
            </li>
          </ul>
          <div className="profile">
            <ul>
              <li style={{ color: "#fff" }}>Hoşgeldin, {userData.name}</li>
              <li>
                <div className="square">
                  <IoPersonSharp
                    onClick={toggleOpen}
                    style={{
                      fontSize: "1.5rem",
                      marginLeft: "5px",
                      marginTop: "4px",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  />

                  {open && (
                    <div className="navbar-toggle">
                      <button
                        className="navbar-toggleButton"
                        onClick={signInOut}
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
