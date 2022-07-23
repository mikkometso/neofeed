import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import LoadingBar from "./components/LoadingBar/LoadingBar";
import "./styles.css";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=2022-07-01&end_date=2022-07-01&api_key=${process.env.REACT_APP_API_KEY}`
    )
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
      <div className={styles.App}></div>
    </>
  );
}

export default App;
