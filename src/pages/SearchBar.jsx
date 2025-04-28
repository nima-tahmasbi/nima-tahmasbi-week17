import { useContext, useEffect, useState } from "react";

import styles from "./SearchBar.module.css";
import Modal from "./Modal";
import { BsPlus } from "react-icons/bs";
import { TiArrowBack, TiTick } from "react-icons/ti";
import { FaUserMinus } from "react-icons/fa";
import { DataContext } from "../context/DataProvider";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const {
    contacts,
    setContacts,
    contactBackup,
    select,
    setSelect,
    setDeleteContact,
    deleteContactHandler,
    deleteContact,
  } = useContext(DataContext);
  const [searchValue, setSearchValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // حالت مدال
  useEffect(() => {
    if (searchValue.length > 0) {
      const searchedContact = contactBackup.filter((contact) => {
        const searchLower = searchValue.toLowerCase();
        return (
          contact.name.toLowerCase().includes(searchLower) ||
          contact.email.toLowerCase().includes(searchLower)
        );
      });
      setContacts(searchedContact);
    } else {
      setContacts(contactBackup);
    }
  }, [searchValue]);

  const navigate = useNavigate();
  const searchChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const selectHandler = () => {
    setSelect((select) => !select);
    setDeleteContact([]);
  };

  const handleDeleteClick = () => {
    if (deleteContact.length < 1) {
      return null;
    }
    setIsModalOpen(true); // باز کردن مدال هنگام کلیک روی حذف
  };

  const handleConfirmDelete = () => {
    deleteContactHandler(deleteContact); // ارسال id صحیح به تابع
    setIsModalOpen(false); // بستن مدال
  };

  return (
    <div className={styles.container}>
      <Modal isOpen={isModalOpen}>
        <p>آیا از حذف مخاطبان مطمئن هستید؟</p>
        <div className="buttons-container">
          <button
            className="delete-button"
            onClick={handleConfirmDelete} // تغییر اینجا
          >
            حذف
          </button>
          <button onClick={() => setIsModalOpen(false)}>انصراف</button>
        </div>
      </Modal>
      <label htmlFor="search"> جست و جو مخاطب: </label>
      <input
        type="text"
        id="search"
        value={searchValue}
        onChange={searchChangeHandler}
      />

      {select ? (
        <>
          <button
            className={styles.searchBarButtons}
            onClick={handleDeleteClick}
          >
            <FaUserMinus fontSize="1rem" />
          </button>
          <button className={styles.searchBarButtons} onClick={selectHandler}>
            <TiArrowBack fontSize="1rem" />
          </button>
        </>
      ) : (
        <button className={styles.searchBarButtons} onClick={selectHandler}>
          <TiTick fontSize="1rem" />
        </button>
      )}
      <div className={styles.buttonContainer}>
        <button
          className={styles.searchBarButtons}
          onClick={() => navigate("/add-contact")}
        >
          <BsPlus fontSize="1.5rem" />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
