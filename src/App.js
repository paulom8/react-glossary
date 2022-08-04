import React, { useState, Fragment } from "react"; // Fragment is to allow more than one child component
import { nanoid } from "nanoid"; // generate an id
import "./App.css";
import ReadOnlyRow from "./components/ReadOnlyRow";  // I created two different component. One to read the values and display
import EditableRow from "./components/EditableRow"; // the other one to edit. That could be inserted directed in the page using HTML
                                                    // but it is better create component to make the maintenance easier
import data from "./mock-data.json"; // here I created a mock up data. In real practice probably that would come from an API that reads the
                                     // database. For this exercise, I am using a pure json file with the data similating the database return


const App = () => {
  const [contacts, setContacts] = useState(data); // intialize the the use State from the data coming from the mock up data
  const [addFormData, setAddFormData] = useState({ // add a new Glossary. Initalize to ne an object with empty values
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  const [editFormData, setEditFormData] = useState({   // similar to add a Glossary
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  const [editContactId, setEditContactId] = useState(null);

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

    const newContact = {
      id: nanoid(), // generate an id
      fullName: addFormData.fullName,
      address: addFormData.address,
      phoneNumber: addFormData.phoneNumber,
      email: addFormData.email,
    };

    const newContacts = [...contacts, newContact]; // spread operator to copy the
    console.log('submit insert [' + newContact.id + ']');
    console.log(newContact);
     // in this case I will send this value to the API to insert the value in the database for example
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      fullName: editFormData.fullName,
      address: editFormData.address,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    console.log('Submit Edit [' + editedContact.id + ']');
    console.log(editedContact);
    setContacts(newContacts);
    // in this case I will send this value to the API to update the value in the database for example
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      fullName: contact.fullName,
      address: contact.address,
      phoneNumber: contact.phoneNumber,
      email: contact.email,
    };

    console.log('Edit [' + contact.id + ']');
    console.log(formValues);
    setEditFormData(formValues);
  };

  const handleCancelClick = () => { 
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId); // find  the element 

    newContacts.splice(index, 1); //remove the element 

    setContacts(newContacts);
  };

  return (
    <div className="app-container">
     {/* Wrap the entire table into the form - edit and display to cause issues 
     on submit update the values */}
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Nameeee</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { /* Map is the easier way to retrieve the data */ }
            { /* Fragment is  to allow more than one child component */ }
            {/*  thew contact.id is to Toogle between the 2 components depending oin the button - Edit or Display values */}
            {contacts.map((contact) => (
              <Fragment>
                {editContactId === contact.id ? (
                  <EditableRow editFormData={editFormData} handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick} />
                ) : (
                  <ReadOnlyRow contact={contact} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick} />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      {/* That is to add a new Glossary */ }
      <h2>Add a Contact</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input type="text" name="fullName" required="required" placeholder="Enter a name..." onChange={handleAddFormChange}  />
        <input type="text" name="address" required="required" placeholder="Enter an addres..." onChange={handleAddFormChange} />
        <input type="text" name="phoneNumber" required="required" placeholder="Enter a phone number..." onChange={handleAddFormChange} />
        <input type="email" name="email" required="required" placeholder="Enter an email..." onChange={handleAddFormChange} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default App;
