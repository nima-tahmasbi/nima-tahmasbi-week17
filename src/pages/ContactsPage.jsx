import { useContext } from "react";
import ContactList from "./ContactList";
import { MyContext } from "../context/Provider";

const containerStyle = {
  marginTop: "20px",
  textAlign: "center",
  minHeight: "50vh"
};
function ContactsPage() {
  const { contacts } = useContext(MyContext);

  return (
    <div style={containerStyle}>
      {contacts.length === 0 ? (
        <h2 style={{margin: "15%"}}>No Contact Yet</h2>
      ) : (
        contacts.map((contact) => (
          <ContactList key={contact.id} data={contact} />
        ))
      )}
    </div>
  );
}

export default ContactsPage;
