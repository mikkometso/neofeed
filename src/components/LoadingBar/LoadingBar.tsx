import React from "react";
import styles from "./LoadingBar.module.css";

const LoadingBar: React.FC<{ isLoading: boolean }> = (props) => {
  const { isLoading } = props;
  return (
    <>
      {isLoading && (
        <div className={styles.loader_container}>
          <div className={styles.loader_indicator}></div>
        </div>
      )}
    </>
  );
};

export default LoadingBar;
