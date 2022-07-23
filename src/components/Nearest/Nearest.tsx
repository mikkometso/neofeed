import React from "react";
import { NearEarthObject } from "../../types/api.types";
import styles from "../Form/Form.module.css";

const Nearest: React.FC<{
  isLoading: boolean;
  nearest: NearEarthObject | undefined;
  fromDate: string;
  toDate: string;
}> = (props) => {
  const { isLoading, nearest, fromDate, toDate } = props;
  return (
    <>
      {!isLoading && nearest && (
        <div className={styles.section}>
          <p>
            {`Between ${new Date(fromDate).toDateString()} and ${new Date(
              toDate
            ).toDateString()}, the closest asteroid was:`}
          </p>
          <p>{`id: ${nearest?.id}`}</p>
          <p>{`"name": "${nearest?.name}",`}</p>
          <p>{`"miss_distance.kilometers": "
      ${nearest?.close_approach_data[0].miss_distance.kilometers}"`}</p>
        </div>
      )}
    </>
  );
};
export default Nearest;
