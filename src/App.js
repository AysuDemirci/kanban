import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import "./Style.css";
import React from "react";
import Content from "./Components/Content";
import { KanbanProvider } from "./KanbanContext";


export default function App() {

  const token = sessionStorage.getItem("authToken")
  return (
    <div>
      <KanbanProvider>
        <Routes>
          
        <Route path="/main" element={token ? <Content /> : <Navigate to="/" />} />
        <Route path="*" element={<LoginPage />} exact/>
      </Routes>
      </KanbanProvider>
      
    </div>
  );
}
