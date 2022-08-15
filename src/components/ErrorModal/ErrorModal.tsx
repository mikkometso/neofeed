import React from "react";
import styles from "./ErrorModal.module.css";

const ErrorModal: React.FC<{
  error: string | undefined;
}> = (props) => {
  const { error } = props;

  return (
    <>
      {error && error !== undefined && (
        <div className={styles.errorContainer}>
          <h2>Errrrorr:</h2>
          <p>Bee-baa buu-baa :(</p>
          <br />
          <p>{error}</p>
          <br />
          <p>Continue by refreshing the page</p>
        </div>
      )}
    </>
  );
};

export default ErrorModal;
