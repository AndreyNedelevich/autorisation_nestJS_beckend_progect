import React from "react";
import styles from "./loader.module.css";

const Loader = () => {
  return (
    <div className={styles.block}>
      <div className={styles.loader}></div>
    </div>
  );
};
export  {Loader};
