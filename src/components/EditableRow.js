import React from "react";

const EditableRow = ({ editFormData, handleEditFormChange, handleCancelClick,}) => {
  return (
    // similar to the form at the bottom
    // maybe here I could create a component that could be used for both cases: when editing and insert a ew Glossary
    // for the purpose of the exercise, I repeat to demonstrate different ways to do 
    <tr>
      {/* the fields will get the values of the object */}
      <td><input type="text" required="required" placeholder="Enter a name..." name="fullName"  value={editFormData.fullName} onChange={handleEditFormChange} ></input></td>
      <td><input type="text" required="required" placeholder="Enter an address..." name="address" value={editFormData.address} onChange={handleEditFormChange}></input></td>
      <td><input type="text" required="required" placeholder="Enter a phone number..." name="phoneNumber" value={editFormData.phoneNumber} onChange={handleEditFormChange}></input></td>
      <td><input type="email" required="required" placeholder="Enter an email..." name="email" value={editFormData.email} onChange={handleEditFormChange} ></input></td>
      <td>
        { /* Better put Cancel button first to avoid wrong clik as this button is display as the same position as Edit */ }
        <button type="button" onClick={handleCancelClick}>Cancel</button>
        <button type="submit">Save</button>
      </td>
    </tr>
  );
};

export default EditableRow;
