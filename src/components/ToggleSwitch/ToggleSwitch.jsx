import "./ToggleSwitch.css";

function ToggleSwitch({ currentTemperatureUnit, handleToggleSwitchChange }) {
  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={currentTemperatureUnit === "C"}
        onChange={handleToggleSwitchChange}
      />
      <span className="slider"></span>

      <span className="switch__text switch__text_f">F</span>
      <span className="switch__text switch__text_c">C</span>
    </label>
  );
}

export default ToggleSwitch;
