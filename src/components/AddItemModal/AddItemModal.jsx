import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import { useForm } from "../../hooks/useForm";

function AddItemModal({ onAddItem, onClose }) {
  const { values, handleChange, resetForm, isValid } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    onAddItem({
      name: values.name,
      imageUrl: values.imageUrl,
      weather: values.weather,
      _id: crypto.randomUUID(),
    });

    resetForm();
    onClose();
  };

  return (
    <ModalWithForm
      name="add-garment"
      title="New garment"
      buttonText="Add garment"
      onClose={onClose}
      onSubmit={onSubmit}
      isValid={isValid}
    >
      <input name="name" value={values.name} onChange={handleChange} required />

      <input
        name="imageUrl"
        value={values.imageUrl}
        onChange={handleChange}
        required
      />

      <label>
        <input
          type="radio"
          name="weather"
          value="hot"
          checked={values.weather === "hot"}
          onChange={handleChange}
        />
        Hot
      </label>

      <label>
        <input
          type="radio"
          name="weather"
          value="warm"
          checked={values.weather === "warm"}
          onChange={handleChange}
        />
        Warm
      </label>

      <label>
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
