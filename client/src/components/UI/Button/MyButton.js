import styles from "./Button.module.css";
import React from "react";

const MyButton = ({ children, ...props }) => {

  return (
    <button  {...props} className={styles.button}>
      {children}
    </button>
  );
};

export {MyButton};
