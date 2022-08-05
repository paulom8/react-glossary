import React from "react";

const ReadOnlyRow = ({ glossary, handleEditClick, handleDeleteClick }) => { // pass the glossary as prop
  return (
    <tr key={glossary.id}>
      <td>{glossary.term} </td>
      <td>{glossary.definition}</td>
      <td>
        <button type="button" onClick={(event) => handleEditClick(event, glossary)}>Editt</button>
        <button type="button" onClick={() => handleDeleteClick(glossary.id)}>Delete</button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
