import { createContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { v4 } from "uuid";

export const DataContext = createContext();

function DataProvider({ children }) {
  //api Data
  const [contacts, setContacts] = useState([]);
  const [contactBackup, setContactBackup] = useState([]);

  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
  });
  //navBar select buttom activator
  const [select, setSelect] = useState(false);
  //contact that about to be deleted
  const [deleteContact, setDeleteContact] = useState([]);
  const navigate = useNavigate();
  //modal state
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectid, setSelectId] = useState([]);
  //modal handlers
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);
  //functions to get, delete or add data to api
  const fetchData = () => {
    fetch("http://localhost:3000/contacts")
      .then((res) => res.json())
      .then((json) => {
        setContacts(json);
        setContactBackup(json);
      });
  };
  const deleteContactHandler = (id) => {
    setModalOpen(false);
    if (typeof id === "string") {
      fetch(`http://localhost:3000/contacts/${id}`, { method: "DELETE" });
      const newContacts = contacts.filter((contact) => contact.id !== id);
      setContacts(newContacts);
    } else {
      const deleteContacts = [...id];
      deleteContacts.map((id) =>
        fetch(`http://localhost:3000/contacts/${id}`, { method: "DELETE" })
      );
      const newContatcs = contacts.filter(
        (item) => !deleteContacts.includes(item.id)
      );
      setContacts(newContatcs);
    }
    setDeleteContact([]);
    setSelect(false);
  };
  const addNewContact = (id) => {
    const { name, email } = newContact;
    console.log("function");
    console.log(id);
    
    if (id) {
      fetch(`http://localhost:3000/contacts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: email,
        }),
      })
    } else {
      console.log("post");
      fetch("http://localhost:3000/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: email,
          id: v4(),
        }),
      })
    }
    setNewContact({
      name: "",
      email: "",
    })
    navigate("/")
  };
  const value = {
    contacts,
    setContacts,
    contactBackup,
    setContactBackup,
    newContact,
    setNewContact,
    addNewContact,
    select,
    setSelect,
    deleteContact,
    setDeleteContact,
    isModalOpen,
    setModalOpen,
    selectid,
    setSelectId,
    openModal,
    closeModal,
    fetchData,
    deleteContactHandler,
  };
  return <DataContext value={value}>{children}</DataContext>;
}

export default DataProvider;
