import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./GroceryItem.css";

const GroceryItem = ({ groceryItem, setEdit, setInputItem, deleteItem }) => {
  const edit = () => {
    setEdit({ isEdit: true, editId: groceryItem.id });
    setInputItem(groceryItem.item);
  };

  return (
    <div className="grocery-item">
      <p>{groceryItem.item}</p>
      <div className="icon-container">
        <FaEdit className="icon" onClick={edit} />
      </div>
      <div className="icon-container">
        <FaTrash className="icon" onClick={() => deleteItem(groceryItem.id)} />
      </div>
    </div>
  );
};

export default GroceryItem;
