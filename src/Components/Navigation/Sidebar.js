import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { AiFillTool } from "react-icons/ai";
import { FaCloud } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaBookmark } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { useKanbanContext } from "../../KanbanContext";

export default function Content() {

  const navItems = [
    { name: "ana sayfa", icon: <FaHome /> },
    { name: "ayarlar", icon: <IoMdSettings /> },
    { name: "yapılandırma", icon: <AiFillTool /> },
    { name: "bulut", icon: <FaCloud /> },
    { name: "mail", icon: <IoMdMail /> },
    { name: "yer imleri", icon: <FaBookmark /> },
  ];
  const { isOpen, setIsOpen } = useKanbanContext();

  return (
    <div>
      <section className="page sidebar-2-page">
        <aside className={`sidebar-2 ${isOpen ? "open" : ""}`}>
          <div className="inner">
            <header>
              <button
                type="button"
                className="sidebar-2-burger"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="material-symbols-outlined">
                  {isOpen ? (
                    <IoClose style={{ fontSize: "1.2rem" }} />
                  ) : (
                    <IoIosMenu style={{ fontSize: "1.2rem" }} />
                  )}
                </span>
              </button>
              <p style={{ marginLeft: "10px", color: "#fff" }}>Menü</p>
            </header>
            <nav>
              {navItems.map((item) => (
                <button key={item.name} type="button">
                  <span className="material-symbols-outlined">{item.icon}</span>
                  <p>{item.name}</p>
                </button>
              ))}
            </nav>
          </div>
        </aside>
      </section>
    </div>
  );
}
