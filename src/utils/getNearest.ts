import { NearEarthObject } from "../types/api.types";

export const getNearest: (
  nearEarthObjects: NearEarthObject[]
) => NearEarthObject = (nearEarthObjects: NearEarthObject[]) => {
  const collection: NearEarthObject[] = [];

  Object.entries(nearEarthObjects).map((item) =>
    Object.values(item[1]).map((item) => collection.push(item))
  );

  const sorted = Object.values(collection).sort((a, b) =>
    a.close_approach_data[0].miss_distance.kilometers >
    b.close_approach_data[0].miss_distance.kilometers
      ? 1
      : -1
  );

  return sorted[0];
};
