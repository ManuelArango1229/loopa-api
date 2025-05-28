type Frequency =
  | { type: "daily" }
  | { type: "weekly"; day: number[] }
  | { type: "custom"; timesPerweek: number };

export default Frequency;
