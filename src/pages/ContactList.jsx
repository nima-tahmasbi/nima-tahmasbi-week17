import { useContext, useEffect, useState } from "react";
import styles from "./ContactList.module.css";
import { MyContext } from "../context/Provider";
import Modal from "./Modal";

function ContactList({ data: { id, name, gmail } }) {
  const { select, deleteContact, setDeleteContact, deleteContactHandler} = useContext(MyContext);
 
  // const [option, setOption] = useState(false);
  // const [isCheck, setIsCheck] = useState(false);

  // useEffect(() => {
  //   if (!select) {
  //     setIsCheck(false);
  //   }
  // }, [select]);
  // const handleCheckboxChange = () => {
  //   setIsCheck((isCheck) => !isCheck);
  //   setDeleteContact((deleteContact) => [...deleteContact, id]);
  //   console.log(deleteContact);
  // };
  // const deleteClickHandler= () =>{
  //   openModal(id);
  // }
  // const confirmDeleteHandle = () =>{
  //   deleteContactHandler(id);
  //   setModalOpen(false);
  // }
  
  // return (
  //   <div className={styles.container}>
      
  //     <p className={styles.name}>{name}</p>
  //     <p className={styles.gmail}>{gmail}</p>
  //     <div
  //       className={styles.options}
  //       style={{ display: select ? "none" : "block" }}
  //     >
  //       {option ? (
  //         <>
  //           <button
  //             className={styles.deleteButton}
  //             onClick={deleteClickHandler}
  //           >
  //             حذف
  //           </button>
  //           <button className={styles.editButton}> ویرایش </button>
  //         </>
  //       ) : (
  //         <button
  //           className={styles.more}
  //           onClick={() => setOption((option) => !option)}
  //         >
  //           ⋮
  //         </button>
  //       )}
  //     </div>
  //     <div
  //       className={styles.options}
  //       style={{ display: select ? "block" : "none" }}
  //     >
  //       <input
  //         type="checkbox"
  //         checked={isCheck}
  //         onChange={handleCheckboxChange}
  //       />
  //     </div>
  //     <Modal isOpen={isModalOpen} >
  //       <p>شما در حال حذف مخاطبانتان هستید!</p>
  //       <p>آیا مطمئن هستید؟</p>
  //       <div className="buttons-container">
  //       <button className="delete-button" onClick={confirmDeleteHandle}>حذف</button>
  //       <button onClick={() => setModalOpen(false)}>انصراف</button>
  //       </div>
  //     </Modal>
  //   </div>
  // );








  const [option, setOption] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // حالت مدال
  useEffect(() => {
    if (!select) {
      setIsCheck(false);
    }
  }, [select]);
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

  return (
    <div className={styles.container}>
      <p className={styles.name}>{name}</p>
      <p className={styles.gmail}>{gmail}</p>

      {/* بخش دکمه‌های ویرایش/حذف */}
      <div
        className={styles.options}
        style={{ display: select ? "none" : "block" }}
      >
        {option && (
          <>
            <button
              className={styles.deleteButton}
              onClick={handleDeleteClick} // تغییر اینجا
            >
              حذف
            </button>
            <button className={styles.editButton}>ویرایش</button>
          </>
        )}
         <button
            className={styles.more}
            style={{ display: option ? "none" : "block" }}
            onClick={() => setOption((option) => !option)}
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
