import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import "./styles.css";
import ErrorModal from "./components/ErrorModal/ErrorModal";
import Form from "./components/Form/Form";
import LoadingBar from "./components/LoadingBar/LoadingBar";
import { NearEarthObject } from "./types/api.types";
import { formatDateToYmd } from "./utils/formatDateToYmd";
import { addDaysToDate } from "./utils/addDaysToDate";
import { getNearest } from "./utils/getNearest";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resStatus, setResStatus] = useState<number>();
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [fetchUrl, setFetchUrl] = useState<string>(
    `https://api.nasa.gov/neo/rest/v1/feed?start_date=${formatDateToYmd(
      fromDate
    )}&end_date=${addDaysToDate(fromDate, 7)}&api_key=${
      process.env.REACT_APP_API_KEY
    }`
  );
  const [nearEarthObjects, setNearEarthObjects] = useState<NearEarthObject[]>(
    []
  );
  const [nearest, setNearest] = useState<NearEarthObject>();

  const getData = () => {
    if (fromDate.length === 0 || toDate.length === 0) return;
    if (toDate < fromDate) return;

    setIsLoading(true);
    fetch(fetchUrl)
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
        const { near_earth_objects, links } = data;
        setNearEarthObjects({
          ...nearEarthObjects,
          ...near_earth_objects,
        });
        setFetchUrl(links.next);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setFetchUrl(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${formatDateToYmd(
        fromDate
      )}&end_date=${addDaysToDate(fromDate, 7)}&api_key=${
        process.env.REACT_APP_API_KEY
      }`
    );
  }, [fromDate]);

  useEffect(() => {
    if (
      !Object.entries(nearEarthObjects).some(
        (item) => item[0] === formatDateToYmd(toDate)
      )
    ) {
      getData();
    }
    setNearest(getNearest(nearEarthObjects));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nearEarthObjects]);

  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    dataSettingFunction: (value: React.SetStateAction<string>) => void
  ) => {
    dataSettingFunction(event.target.value.trim());
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getData();
    setNearest(getNearest(nearEarthObjects));
  };

  // TODO: remove later
  console.log(nearest);

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
