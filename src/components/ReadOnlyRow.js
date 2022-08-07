import React from "react";

const ReadOnlyRow = ({ glossary, handleEditClick, handleDeleteClick }) => { // pass the glossary as prop
  return (
    <tr>
      <td>{glossary.term} </td>
      <td>{glossary.definition}</td>
      <td>
        <button type="button" className="btn" onClick={(event) => handleEditClick(event, glossary)}>Edit</button>&nbsp;
        <button type="button"  className="btn" onClick={() => handleDeleteClick(glossary.id)}>Delete</button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
