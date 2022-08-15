import React, { useEffect, useState } from "react";
import { NearEarthObject } from "./types/api.types";
import useFetch from "./hooks/useFetch";
import styles from "./App.module.css";
import "./styles.css";
import LoadingBar from "./components/LoadingBar/LoadingBar";
import ErrorModal from "./components/ErrorModal/ErrorModal";
import Info from "./components/Info/Info";
import Form from "./components/Form/Form";
import Nearest from "./components/Nearest/Nearest";
import { getNearest } from "./utils/getNearest";

function App() {
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [nearest, setNearest] = useState<NearEarthObject>();

  const { nearEarthObjects, loading, error, getData } = useFetch(
    fromDate,
    toDate
  );

  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    dataSettingFunction: (value: React.SetStateAction<string>) => void
  ) => {
    dataSettingFunction(event.target.value.trim());
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getData(fromDate, toDate);
  };

  useEffect(() => {
    nearEarthObjects && setNearest(getNearest(nearEarthObjects));
  }, [nearEarthObjects]);

  return (
    <>
      <LoadingBar loading={loading} />
      <div className={styles.App}>
        <ErrorModal error={error} />
        <Info />
        <Form
          handleSubmit={handleSubmit}
          handleInput={handleInput}
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
        />
        {loading && (
          <div className={styles.section}>
            <p>loading!</p>
          </div>
        )}
        <Nearest
          loading={loading}
          nearest={nearest}
          fromDate={fromDate}
          toDate={toDate}
        />
      </div>
    </>
  );
}

export default App;
