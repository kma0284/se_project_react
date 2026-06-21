import "./ToggleSwitch.css";

import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext,
  );

  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={currentTemperatureUnit === "c"}
        onChange={handleToggleSwitchChange}
      />
      <span className="slider"></span>

      <span className="switch__text switch__text_f">F</span>
      <span className="switch__text switch__text_c">C</span>
    </label>
  );
}

export default ToggleSwitch;
