import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import ErrorModal from "./components/ErrorModal/ErrorModal";
import LoadingBar from "./components/LoadingBar/LoadingBar";
import "./styles.css";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resStatus, setResStatus] = useState<number>();
  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=2022-07-01&end_date=2022-07-01&api_key=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => {
        if (!res.ok) {
          setResStatus(res.status);
          throw new Error(`rerror: ${res.status}`);
        }
        return res;
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      <LoadingBar isLoading={isLoading} />
      <div className={styles.App}>
        <ErrorModal resStatus={resStatus} />
      </div>
    </>
  );
}

export default App;
