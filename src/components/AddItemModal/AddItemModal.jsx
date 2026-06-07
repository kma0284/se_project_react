import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({
  isOpen,
  onAddItem,
  onCloseModal,
  values,
  handleChange,
  handleSubmit,
  isValid,
  errors,
}) {
  const onSubmit = (e) => {
    e.preventDefault();
    onAddItem(values, onCloseModal); // pass reset/close flow
  };

  return (
    <ModalWithForm
      name="add-garment"
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={onSubmit}
      isValid={isValid}
    >
      <label>
        Name
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Image URL
        <input
          type="url"
          name="imageUrl"
          value={values.imageUrl}
          onChange={handleChange}
          required
        />
      </label>

      <fieldset>
        <legend>Weather type</legend>

        <label>
          <input
            type="radio"
            name="weather"
            value="hot"
            onChange={handleChange}
            checked={values.weather === "hot"}
          />
          Hot
        </label>

        <label>
          <input
            type="radio"
            name="weather"
            value="warm"
            onChange={handleChange}
            checked={values.weather === "warm"}
          />
          Warm
        </label>

        <label>
          <input
            type="radio"
            name="weather"
            value="cold"
            onChange={handleChange}
            checked={values.weather === "cold"}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
