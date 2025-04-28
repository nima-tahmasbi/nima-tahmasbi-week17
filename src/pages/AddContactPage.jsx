import { useContext, useState } from "react";
import { DataContext } from "../context/DataProvider";
import { useLocation } from "react-router-dom";
import styles from "./AddContactPage.module.css";

function AddContactPage() {
  const [error, setError] = useState("");
  const { newContact, setNewContact, addNewContact } = useContext(DataContext);
  const location = useLocation();
  const { id } = location.state || {};
  // الگوی استاندارد برای ایمیل
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  // الگوی استاندارد برای نام (حداقل 2 کاراکتر، فقط حروف و فاصله)
  const nameRegex = /^[a-zA-Z\u0600-\u06FF\s]{3,}$/;
  const inputChangeHandler = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setNewContact((newContact) => ({ ...newContact, [id]: value }));
  };
  const validateInput = () => {
    if (!nameRegex.test(newContact.name.trim())) {
      setError("نام باید حداقل 3 حرف و فقط شامل حروف باشد");
    } else if (!emailRegex.test(newContact.email.trim())) {
      setError("لطفا یک ایمیل معتبر وارد کنید");
    } else {
      addNewContact(id);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.name}>
        <p className={styles.label}>نام و نام خانوادگی: </p>
        <input
          type="text"
          id="name"
          value={newContact.name}
          onChange={inputChangeHandler}
        />
      </div>
      <div className={styles.email}>
        <p className={styles.label}>پست الکترونیک:</p>
        <input
          type="email"
          id="email"
          value={newContact.email}
          onChange={inputChangeHandler}
        />
      </div>
      <p className={styles.error}>
      {error && error}
      </p>
      <button className={styles.submit} onClick={validateInput}>ایجاد مخاطب جدید</button>
    </div>
  );
}

export default AddContactPage;
