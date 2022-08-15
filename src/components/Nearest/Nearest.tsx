import React from "react";
import { NearEarthObject } from "../../types/api.types";
import styles from "../Form/Form.module.css";

const Nearest: React.FC<{
  loading: boolean;
  nearest: NearEarthObject | undefined;
  fromDate: string;
  toDate: string;
}> = (props) => {
  const { loading, nearest } = props;
  return (
    <>
      {!loading && nearest && (
        <div className={styles.section}>
          <h2>Nearest asteroid</h2>
          <p>Between the given dates was:</p>
          <p>id: {nearest?.id}</p>
          <p>"name": "{nearest?.name}",</p>
          <p>
            "miss_distance.kilometers": "
            {nearest?.close_approach_data[0].miss_distance.kilometers}"
          </p>
        </div>
      )}
    </>
  );
};
export default Nearest;
