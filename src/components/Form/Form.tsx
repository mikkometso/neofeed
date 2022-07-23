import React from "react";
import styles from "./Form.module.css";

interface FormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleInput: (
    event: React.ChangeEvent<HTMLInputElement>,
    dataSettingFunction: (value: React.SetStateAction<string>) => void
  ) => void;
  fromDate: string;
  setFromDate: React.Dispatch<React.SetStateAction<string>>;
  toDate: string;
  setToDate: React.Dispatch<React.SetStateAction<string>>;
}

const Form: React.FC<FormProps> = (props) => {
  const {
    handleSubmit,
    handleInput,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
  } = props;

  return (
    <form action="submit" onSubmit={handleSubmit}>
      <div className={styles.group}>
        <input
          id="fromDateInput"
          type="text"
          // TODO: Find correct date regex. This currencly accepts dates like 31.02.2022
          pattern="(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}"
          value={fromDate}
          onChange={(e) => handleInput(e, setFromDate)}
        />
        <span className={styles.highlight}></span>
        <span className={styles.bar}></span>
        <label className={styles.inputLabel} htmlFor="fromDateInput">
          from date
        </label>
      </div>
      <div className={styles.group}>
        <input
          id="toDateInput"
          type="text"
          // TODO: Find correct date regex.
          pattern="(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}"
          value={toDate}
          onChange={(e) => handleInput(e, setToDate)}
        />
        <span className={styles.highlight}></span>
        <span className={styles.bar}></span>
        <label className={styles.inputLabel} htmlFor="toDateInput">
          to date
        </label>
      </div>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default Form;
