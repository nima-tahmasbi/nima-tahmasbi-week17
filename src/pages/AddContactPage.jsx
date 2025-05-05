import { useContext, useState } from "react";
import { DataContext } from "../context/DataProvider";
import { useLocation } from "react-router-dom";
import styles from "./AddContactPage.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

function AddContactPage() {
  // const [error, setError] = useState("");
  const { addNewContact } = useContext(DataContext);
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();
  const location = useLocation();
  const { id } = location.state || {};
  // // الگوی استاندارد برای ایمیل
  // const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  // // الگوی استاندارد برای نام (حداقل 2 کاراکتر، فقط حروف و فاصله)
  // const nameRegex = /^[a-zA-Z\u0600-\u06FF\s]{3,}$/;
  // const inputChangeHandler = (e) => {
  //   const id = e.target.id;
  //   const value = e.target.value;

  //   setNewContact((newContact) => ({ ...newContact, [id]: value }));
  // };
  // const validateInput = () => {
  //   if (!nameRegex.test(newContact.name.trim())) {
  //     setError("نام باید حداقل 3 حرف و فقط شامل حروف باشد");
  //   } else if (!emailRegex.test(newContact.email.trim())) {
  //     setError("لطفا یک ایمیل معتبر وارد کنید");
  //   } else {
  //     addNewContact(id);
  //   }
  // };

  // 1. تعریف schema اعتبارسنجی
const contactSchema = yup.object().shape({
  name: yup
    .string()
    .required('نام الزامی است')
    .min(3, 'حداقل ۳ کاراکتر نیاز است')
    .matches(
      /^[\p{L}\s]{3,}$/u,
      'فقط حروف و فاصله مجاز است'
    ),
  email: yup
    .string()
    .required('ایمیل الزامی است')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      'فرمت ایمیل نامعتبر است'
    )
});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(contactSchema) // 2. ادغام Yup با RHF
  });

  const onSubmit = (data) => {
    addNewContact(id, data);
  };



  return (
    // <div className={styles.container}>
    //   <div className={styles.name}>
    //     <p className={styles.label}>نام و نام خانوادگی: </p>
    //     <input
    //       type="text"
    //       id="name"
    //       value={newContact.name}
    //       onChange={inputChangeHandler}
    //     />
    //   </div>
    //   <div className={styles.email}>
    //     <p className={styles.label}>پست الکترونیک:</p>
    //     <input
    //       type="email"
    //       id="email"
    //       value={newContact.email}
    //       onChange={inputChangeHandler}
    //     />
    //   </div>
    //   <p className={styles.error}>
    //   {error && error}
    //   </p>
    //   <button className={styles.submit} onClick={validateInput}>ایجاد مخاطب جدید</button>
    // </div>
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      {/* 4. فیلد نام */}
      <div className={styles.name}>
        <label className={styles.label}> نام و نام خانوادگی:</label>
        <input
          type="text"
          id="name"
          {...register('name')}
        />
        <p className={styles.error}>
          {errors.name && errors.name.message}
        </p>
      </div>

      {/* 5. فیلد ایمیل */}
      <div className={styles.email}>
        <label className={styles.label}>ایمیل:</label>
        <input
          type="email"
          id="email"
          {...register('email')}
        />
        <p className={styles.error}>
          {errors.email && errors.email.message}
        </p>
      </div>

      <button type="submit" className={styles.submit}>
        ایجاد مخاطب جدید
      </button>
    </form>

  );
}

export default AddContactPage;
