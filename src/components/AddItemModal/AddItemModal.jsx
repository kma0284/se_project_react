import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import { useForm } from "../../hooks/useForm";
import "./AddItemModal.css";

function AddItemModal({ onAddItem, onClose, isOpen }) {
  const { values, handleChange, resetForm, isValid } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });
  console.log(values);
  console.log("VALID:", isValid);
  const onSubmit = (e) => {
    e.preventDefault();

    onAddItem({
      name: values.name,
      imageUrl: values.imageUrl,
      weather: values.weather,
      _id: crypto.randomUUID(),
    });
    console.log(values.name, values.imageUrl, values.weather);
    resetForm();
    onClose();
  };
  useEffect(() => {
    console.log("VALUES:", values);
    console.log("IS VALID:", isValid);
  }, [values, isValid]);
  return (
    <ModalWithForm
      isOpen={isOpen}
      title="New garment"
      buttonText="Add garment"
      onSubmit={onSubmit}
      isValid={isValid}
      onClose={onClose}
    >
      <div className="modal__input-labels">
        <div className="modal__field">
          <label htmlFor="name" className="modal__label">
            Name
          </label>
          <input
            id="name"
            name="name"
            placeholder="Name"
            value={values.name}
            onChange={handleChange}
            className="modal__input"
          />
        </div>

        <div className="modal__field">
          <label htmlFor="imageUrl" className="modal__label">
            Image
          </label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="url"
            placeholder="Image URL"
            required
            value={values.imageUrl}
            onChange={handleChange}
            className="modal__input"
          />
        </div>
      </div>
      <p className="modal__label">Select the weather type:</p>

      <label
        className={`modal__label_type_radio ${
          values.weather === "hot" ? "modal__radio-label_active" : ""
        }`}
      >
        <input
          type="radio"
          name="weather"
          value="hot"
          checked={values.weather === "hot"}
          onChange={handleChange}
        />
        Hot
      </label>

      <label
        className={`modal__label_type_radio ${
          values.weather === "warm" ? "modal__radio-label_active" : ""
        }`}
      >
        <input
          type="radio"
          name="weather"
          value="warm"
          checked={values.weather === "warm"}
          onChange={handleChange}
        />
        Warm
      </label>

      <label
        className={`modal__label_type_radio ${
          values.weather === "cold" ? "modal__radio-label_active" : ""
        }`}
      >
        <input
          type="radio"
          name="weather"
          value="cold"
          checked={values.weather === "cold"}
          onChange={handleChange}
        />
        Cold
      </label>
    </ModalWithForm>
  );
}
export default AddItemModal;
