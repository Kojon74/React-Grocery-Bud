import React, { useState, useEffect } from "react";
import GroceryItem from "./GroceryItem";
import { v4 as uuidv4 } from "uuid";
import "./CenterComponent.css";

const CenterComponent = () => {
  const [groceryList, setGroceryList] = useState([]);
  const [edit, setEdit] = useState({ isEdit: false, editId: null });
  const [inputItem, setInputItem] = useState("");
  const [alarm, setAlarm] = useState({ isAlarm: false, alarmMessage: "" });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlarm({ isAlarm: false, alarmMessage: "" });
    }, 2000);
    return () => clearTimeout(timeout);
  }, [alarm]);

  const addUpdate = (e) => {
    e.preventDefault();
    if (!edit.isEdit && inputItem !== "") {
      setGroceryList([...groceryList, { id: uuidv4(), item: inputItem }]);
      setInputItem("");
      setAlarm({ isAlarm: true, alarmMessage: "Added Item" });
    } else if (edit.isEdit && inputItem !== "") {
      groceryList.find((x) => x.id === edit.editId).item = inputItem;
      setInputItem("");
      setEdit({ isEdit: false, editId: null });
      setAlarm({ isAlarm: true, alarmMessage: "Updated Item" });
    } else {
      setAlarm({ isAlarm: true, alarmMessage: "Empty Item" });
    }
  };

  const deleteItem = (id) => {
    let groceryListCopy = groceryList.slice();
    console.log(groceryList);
    let index = groceryListCopy
      .map((x) => {
        return x.id;
      })
      .indexOf(id);
    groceryListCopy.splice(index, 1);
    setGroceryList(groceryListCopy);
    setAlarm({ isAlarm: true, alarmMessage: "Deleted Item" });
  };

  const clear = () => {
    setGroceryList([]);
    setAlarm({ isAlarm: true, alarmMessage: "Cleared Items" });
  };

  return (
    <div className="center-comp">
      <h1>Grocery Bud</h1>
      <form onSubmit={addUpdate}>
        <input
          type="text"
          id="item"
          name="item"
          value={inputItem}
          onChange={(e) => setInputItem(e.target.value)}
        />
        <button>{!edit.isEdit ? "Add" : "Update"}</button>
      </form>
      <h2 className="alarm">{alarm.isAlarm && alarm.alarmMessage}</h2>
      <div className="list-container">
        {groceryList.map((groceryItem) => {
          return (
            <GroceryItem
              key={groceryItem.id}
              groceryItem={groceryItem}
              setEdit={setEdit}
              setInputItem={setInputItem}
              deleteItem={deleteItem}
            />
          );
        })}
      </div>
      {groceryList.length > 0 && (
        <button className="clear" onClick={clear}>
          Clear Items
        </button>
      )}
    </div>
  );
};

export default CenterComponent;
