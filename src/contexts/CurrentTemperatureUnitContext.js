import { createContext } from "react";

export const CurrentTemperatureUnitContext = createContext({
  currentTemperatureUnit: "f",
  handleToggleSwitchChange: () => {},
});
