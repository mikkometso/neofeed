import React from "react";
import styles from "../../App.module.css";

const Info: React.FC = () => {
  return (
    <div className={styles.section}>
      <h1>The nearest asteroid app</h1>
      <p>
        I'm a silly little app that fetches data about the nearest passing
        asteroid from given dates
      </p>
      <p>Pass some dates in to get the data</p>
      <p>
        You should input date in format dd.mm.yyyy so for example 01.07.2022
      </p>
    </div>
  );
};
export default Info;
