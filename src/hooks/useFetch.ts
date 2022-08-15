import { useState, useEffect } from "react";
import { NearEarthObject } from "../types/api.types";
import { addDaysToDate } from "../utils/addDaysToDate";
import { formatDateToYmd } from "../utils/formatDateToYmd";

function useFetch(fromDate: string, toDate: string) {
  const [nearEarthObjects, setNearEarthObjects] = useState<NearEarthObject[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [fetchUrl, setFetchUrl] = useState<string>("");

  // fetchUrl is used as a base when there's a need for longer searches
  useEffect(() => {
    setFetchUrl(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${formatDateToYmd(
        fromDate
      )}&end_date=${addDaysToDate(fromDate, 7)}&api_key=${
        process.env.REACT_APP_API_KEY
      }`
    );
  }, [fromDate]);

  const getData = (fromDate: string, toDate: string) => {
    const d1 = formatDateToYmd(fromDate);
    const d2 = formatDateToYmd(toDate);
    const d1PlusWeek = addDaysToDate(fromDate, 7);

    if (loading || fromDate === "" || toDate === "") return;

    // if given toDate is before fromDate "throw error" and return
    if (d2 < d1) {
      setError("Check given fetch dates");
      return;
    }

    // if given toDate is after fromDate but in between a seven days period
    if (d1 <= d2 && d2 <= d1PlusWeek) {
      setLoading(true);
      fetch(
        `https://api.nasa.gov/neo/rest/v1/feed?start_datee=${formatDateToYmd(
          fromDate
        )}&end_date=${d2}&api_key=${process.env.REACT_APP_API_KEY}`
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return res.json().then((res) => {
            throw new Error(res.error);
          });
        })
        .then((data) => {
          const { near_earth_objects } = data;
          setNearEarthObjects(near_earth_objects);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    // if given toDate is after fromDate but exceeds a seven days period in respect of fromdate
    if (d1 < d2 && d2 > d1PlusWeek) {
      setLoading(true);
      fetch(fetchUrl)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error("Something went wrong");
        })
        .then((data) => {
          const { near_earth_objects, links } = data;
          setNearEarthObjects(near_earth_objects);
          if (
            !Object.entries(nearEarthObjects).some((item) => item[0] === d2)
          ) {
            setFetchUrl(links.next);
          }
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    getData(fromDate, toDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchUrl]);

  return { nearEarthObjects, loading, error, getData };
}

export default useFetch;
