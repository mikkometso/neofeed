import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import ErrorModal from "./components/ErrorModal/ErrorModal";
import Form from "./components/Form/Form";
import LoadingBar from "./components/LoadingBar/LoadingBar";
import "./styles.css";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resStatus, setResStatus] = useState<number>();
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

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

  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    dataSettingFunction: (value: React.SetStateAction<string>) => void
  ) => {
    dataSettingFunction(event.target.value.trim());
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <LoadingBar isLoading={isLoading} />
      <div className={styles.App}>
        <ErrorModal resStatus={resStatus} />
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
        <Form
          handleSubmit={handleSubmit}
          handleInput={handleInput}
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
        />
        {isLoading && (
          <div className={styles.section}>
            <p>loading!</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
