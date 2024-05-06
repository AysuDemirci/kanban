import React, { useEffect } from "react";
import Navbar from "./Navigation/Navbar";
import Sidebar from "./Navigation/Sidebar";
import { useKanbanContext } from "../KanbanContext";
import { FaPlus } from "react-icons/fa";

export default function Content() {
  const {
    isOpen,
    list,
    handleAddListClick,
    handleAddCardClick,
    handleCardNameChange,
    handleCardContentChange,
    sendDataToFirebase,
    getFirebaseData,
    handleUpdateData
    
  } = useKanbanContext();

useEffect(()=>{
getFirebaseData()
},[])

  return (
    <div>
      <Navbar />

      <div className="main-container">
        <div>
          <Sidebar />
        </div>
        <div className={`main-content  ${isOpen ? "open" : ""}`}>
          <div className="card-content">
            <div className="list-addList-container">
              {list.map((listItem, index) => (
              
                <div className="card-group" key={listItem.id}>
                  <input
                    name="cardName"
                    className="card-name-input"
                    value={listItem.cardName}
                    onChange={(e) => handleCardNameChange(e, index)}
                    placeholder="Liste İsmi Giriniz"
                  />

                  {listItem.cards.map((card, cardIndex) => (
                    <div key={card.id} className="cards">
                      <textarea
                        className="cardInput card"
                        name="card"
                        rows={Math.ceil(card.card.length / 26)}
                        cols={10}
                        wrap="soft"
                        style={{ resize: "none" }}
                        value={card.card}
                        onChange={(e) =>
                          handleCardContentChange(e, index, cardIndex)
                        }
                      />
                    </div>
                  ))}
                  <button
                    className="add-cart-button"
                    onClick={() => handleAddCardClick(index)}
                  >
                    Kart Ekle <FaPlus className="plus-icon" />
                  </button>
                  {/* {listItem.id === } */}
                  <button onClick={()=>sendDataToFirebase(listItem)} >kaydet</button>
                  <button onClick={()=>handleUpdateData(index)}>güncelle</button>
                </div>
              ))}
              <button className="add-list" onClick={handleAddListClick}>
                <FaPlus className="add-icon" />
                Başka liste ekleyin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
