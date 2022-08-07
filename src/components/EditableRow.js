import React from "react";

const EditableRow = ({ editFormData, handleEditFormChange, handleCancelClick,}) => {
  return (
    // similar to the form at the bottom
    // maybe here I could create a component that could be used for both cases: when editing and insert a ew Glossary
    // for the purpose of the exercise, I repeat to demonstrate different ways to do 
    <tr>
      {/* the fields will get the values of the object */}
      <td><input type="text" required="required" placeholder="Enter a term..." name="term"  value={editFormData.term} onChange={handleEditFormChange} ></input></td>
      <td><input type="text" required="required" size={105} placeholder="Enter an definition..." name="definition" value={editFormData.definition} onChange={handleEditFormChange}></input></td>
      <td>
        { /* Better put Cancel button first to avoid wrong clik as this button is display as the same position as Edit */ }
        <button className="btn" type="button" onClick={handleCancelClick}>Cancel</button>&nbsp;
        <button className="btn" type="submit">Save</button>
      </td>
    </tr>
  );
};

export default EditableRow;
