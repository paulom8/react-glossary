import React, { useState, Fragment } from "react"; // Fragment is to allow more than one child component
import { nanoid } from "nanoid"; // generate an id
import "./styles/App.scss";
import ReadOnlyRow from "./components/ReadOnlyRow";  // I created two different component. One to read the values and display
import EditableRow from "./components/EditableRow"; // the other one to edit. That could be inserted directed in the page using HTML
                                                    // but it is better create component to make the maintenance easier
import data from "./mock-data.json"; // here I created a mock up data. In real practice probably that would come from an API that reads the
                                     // database. For this exercise, I am using a pure json file with the data similating the database return


const App = () => {
  const [glossaries, setGlossaries] = useState(data); // intialize the the use State from the data coming from the mock up data
  console.log('start');
  //order by Term field
  //glossaries.sort((a,b)=> (a.term > b.term) ? 1 : -1) ;
  // I found a better way to do it
  glossaries.sort((a,b) => a.term.localeCompare(b.term)) ;
  const [addFormData, setAddFormData] = useState({ // add a new Glossary. Initalize to ne an object with empty values
    term: "",
    definition: "",
  });

  const [editFormData, setEditFormData] = useState({   // similar to add a Glossary
    term: "",
    definition: "",
  });

  const [editGlossaryId, setEditGlossaryId] = useState(null);

  //arrow function to update values to the object every time the user type something - onCHange event
  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData }; //spread operator to cpy the existing form data and assign to the new data
    newFormData[fieldName] = fieldValue; // update the value

    console.log('insert');
    console.log(newFormData);
    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value; // get the value

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    console.log('update field');
    console.log(newFormData);
    setEditFormData(newFormData);
  };

//user submit the form
  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newGlossary = {
      id: nanoid(), // generate an id
      term: addFormData.term,
      definition: addFormData.definition,
    };

    const newGlossaries = [...glossaries, newGlossary]; // spread operator to copy the
    console.log('submit insert [' + newGlossary.id + ']');
    console.log(newGlossary);
     // in this case I will send this value to the API to insert the value in the database for example
    setGlossaries(newGlossaries);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedGlossary = {
      id: editGlossaryId,
      term: editFormData.term,
      definition: editFormData.definition,
    };

    const newGlossaries = [...glossaries];

    const index = glossaries.findIndex((glossary) => glossary.id === editGlossaryId);

    newGlossaries[index] = editedGlossary;

    console.log('Submit Edit [' + editedGlossary.id + ']');
    console.log(editedGlossary);
    setGlossaries(newGlossaries);
    // in this case I will send this value to the API to update the value in the database for example
    setEditGlossaryId(null);
  };

  const handleEditClick = (event, glossary) => {
    event.preventDefault();
    setEditGlossaryId(glossary.id);

    const formValues = {
      term: glossary.term,
      definition: glossary.definition,
    };

    console.log('Edit [' + glossary.id + ']');
    console.log(formValues);
    setEditFormData(formValues);
  };

  const handleCancelClick = () => { 
    setEditGlossaryId(null);
  };

  const handleDeleteClick = (glossaryId) => {
    const newGlossaries = [...glossaries];

    const index = glossaries.findIndex((glossary) => glossary.id === glossaryId); // find  the element 

    newGlossaries.splice(index, 1); //remove the element 

    setGlossaries(newGlossaries);
  };

  return (
    <div className="app-container">
     {/* Wrap the entire table into the form - edit and display to cause issues 
     on submit update the values */}
    <div className="text_header">Glossary Items</div>
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Term</th>
              <th>Definition</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { /* Map is the easier way to retrieve the data */ }
            { /* Fragment is  to allow more than one child component */ }
            {/*  the glossary.id is to Toogle between the 2 components depending oin the button - Edit or Display values */}
            {glossaries.map((glossary) => (
              <Fragment>
                {editGlossaryId === glossary.id ? (
                  <EditableRow editFormData={editFormData} handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick} />
                ) : (
                  <ReadOnlyRow glossary={glossary} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick} />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      {/* That is to add a new Glossary */ }
      <h2>Add a Glossary</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input type="text" name="term" required="required" placeholder="Enter a term..." onChange={handleAddFormChange}  />
        <input type="text" name="definition" required="required" placeholder="Enter an definition..." onChange={handleAddFormChange} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default App;
