export interface NearEarthObject {
  absolute_magnitude_h: number;
  close_approach_data: [
    {
      close_approach_date: string;
      close_approach_date_full: string;
      epoch_date_close_approach: number;
      miss_distance: Record<string, string>;
      orbiting_body: string;
      relative_velocity: Record<string, string>;
    }
  ];
  estimated_diameter: {
    feet: Record<string, number>;
    kilometers: Record<string, number>;
    meters: Record<string, number>;
    miles: Record<string, number>;
  };
  id: string;
  is_potentially_hazardous_asteroid: boolean;
  is_sentry_object: boolean;
  links: { self: string };
  name: string;
  nasa_jpl_url: string;
  neo_reference_id: string;
}
