import React from "react";
import styles from "./LoadingBar.module.css";

const LoadingBar: React.FC<{ loading: boolean }> = (props) => {
  const { loading } = props;
  return (
    <>
      {loading && (
        <div className={styles.loader_container}>
          <div className={styles.loader_indicator}></div>
        </div>
      )}
    </>
  );
};

export default LoadingBar;
