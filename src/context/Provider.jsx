import { createContext, useState } from "react";
import { FaEraser } from "react-icons/fa";


export const MyContext = createContext();
function Provider({ children }) {
  const [contactData, setContactData] = useState([])
  const [contacts, setContacts] = useState([]);
  const [select, setSelect] = useState(false);
  const [deleteContact, setDeleteContact] = useState([]);

  //modal state
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectid, setSelectId] = useState([])
  //modal handler
  const openModal = () =>  {setModalOpen(true)};
  const closeModal = () => setModalOpen(false);

  const deleteContactHandler = (id) => {
    setModalOpen(false)
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

  const value = {
    contactData, setContactData,
    contacts,
    setContacts,
    select,
    setSelect,
    deleteContact,
    setDeleteContact,
    deleteContactHandler,
    isModalOpen,
    setModalOpen,
    openModal,
    
  };

  return <MyContext value={value}>{children}</MyContext>;
}

export default Provider;
