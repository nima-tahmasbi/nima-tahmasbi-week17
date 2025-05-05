import { useContext } from "react";
import ContactList from "../components/ContactList";
import { DataContext } from "../context/DataProvider";

const containerStyle = {
  marginTop: "20px",
  textAlign: "center",
  maxHeight: "550px",
  overflowY: "scroll",
};
function ContactsPage() {
  const { contacts } = useContext(DataContext);

  return (
    <div style={containerStyle}>
      {contacts.length === 0 ? (
        <h2 style={{ marginTop: "200px" }}>No Contact Yet</h2>
      ) : (
        contacts.map((contact) => (
          <ContactList key={contact.id} data={contact} />
        ))
      )}
    </div>
  );
}

export default ContactsPage;
