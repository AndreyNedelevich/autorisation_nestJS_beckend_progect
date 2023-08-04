import styles from "./Input.module.css";
import React from "react";

const Input = React.forwardRef((props, ref) => {
  return <input className={styles.input} {...props}></input>;
});

export  {Input};
