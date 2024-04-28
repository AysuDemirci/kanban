import React from "react";
import Navbar from "./Navigation/Navbar";
import Sidebar from "./Navigation/Sidebar";




export default function Content() {
  return (
    <div>
      <Navbar />

      <div className="main-container">
        <div>
          <Sidebar />
        </div>
        <div className="main-content">
            
        </div>
      </div>
    </div>
  );
}
