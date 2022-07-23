import React from "react";
import styles from "./ErrorModal.module.css";

const ErrorModal: React.FC<{ resStatus: number | undefined }> = (props) => {
  const { resStatus } = props;
  return (
    <>
      {resStatus && resStatus !== 200 && (
        <div className={styles.errorContainer}>
          <h2>HTTP error: {resStatus}</h2>
          <p>Bee-baa buu-baa :(</p>
          <br />
          <p>Try refreshing your browser</p>
        </div>
      )}
    </>
  );
};

export default ErrorModal;
