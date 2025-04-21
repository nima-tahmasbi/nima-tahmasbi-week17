import { useContext, useEffect } from "react";

import ContactsPage from "./ContactsPage";
import SearchBar from "./SearchBar";
import { MyContext } from "../context/Provider";
function Home() {
  const {
    contactData,
    setContactData,
    contacts,
    setContacts,
    select,
    setSelect,
    deleteContact,
    setDeleteContact,
    deleteContactHandler,
  } = useContext(MyContext);

  useEffect(() => {
    fetch("http://localhost:3000/contacts")
      .then((res) => res.json())
      .then((json) => {setContactData(json)
        setContacts(json)
      });
  }, []);

  return (
    <div>
      <SearchBar />
      <ContactsPage />
    </div>
  );
}

export default Home;
