import { useContext, useEffect, useState } from "react";
import styles from "./ContactList.module.css";
import Modal from "./Modal";
import { DataContext } from "../context/DataProvider";
import { Navigate, useNavigate } from "react-router-dom";

function ContactList({ data: { id, name, email } }) {
  const { select, setDeleteContact, deleteContactHandler} = useContext(DataContext);
  const [option, setOption] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // حالت مدال
  useEffect(() => {
    if (!select) {
      setIsCheck(false);
    }
  }, [select]);
  const navigate = useNavigate();
  const handleCheckboxChange = () => {
    setIsCheck((isCheck) => !isCheck);
    setDeleteContact((deleteContact) => [...deleteContact, id]);
  };

  const handleDeleteClick = () => {
    setIsModalOpen(true); // باز کردن مدال هنگام کلیک روی حذف
  };

  const handleConfirmDelete = () => {
    deleteContactHandler(id); // ارسال id صحیح به تابع
    setIsModalOpen(false); // بستن مدال
  };
  const editHandler = () =>{
    console.log(id);
    
    navigate("/add-contact", {state: {id}});
  }
  return (
    <div className={styles.container}>
      <p className={styles.name}>{name}</p>
      <p className={styles.email}>{email}</p>

      {/* بخش دکمه‌های ویرایش/حذف */}
      <div
        className={styles.options}
        style={{ display: select ? "none" : "block" }}
        onClick={() => setOption((option) => !option)}
      >
        {option && (
          <>
            <button
              className={styles.deleteButton}
              onClick={handleDeleteClick} // تغییر اینجا
            >
              حذف
            </button>
            <button className={styles.editButton} onClick={editHandler}>ویرایش</button>
          </>
        )}
         <button
            className={styles.more}
            style={{ display: option ? "none" : "block" }}
            onClick={(e) => {e.stopPropagation(); setOption((option) => !option)}}
          >
            ⋮
          </button>
      </div>

      
      <div
        className={styles.options}
        style={{ display: select ? "block" : "none" }}
      >
        <input
          type="checkbox"
          checked={isCheck}
          onChange={handleCheckboxChange}
        />
      </div>

      
      <Modal isOpen={isModalOpen}>
        <p>آیا از حذف مخاطب "{name}" مطمئن هستید؟</p>
        <div className="buttons-container">
          <button 
            className="delete-button" 
            onClick={handleConfirmDelete} 
          >
            حذف
          </button>
          <button className="close-button"
            onClick={() => setIsModalOpen(false)}
          >
            انصراف
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default ContactList;
