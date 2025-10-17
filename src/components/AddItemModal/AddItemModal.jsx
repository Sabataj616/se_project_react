import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import { useEffect } from "react";

const AddItemModal = ({ isOpen, onAddItem, closeActiveModal }) => {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weather: "",
  };

  const { values, handleChange, setValues } = useForm(defaultValues);

  useEffect(() => {
    if (isOpen) {
      setValues(defaultValues);
    }
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddItem(values);
  }

  return (
    <ModalWithForm
      buttonText="Add Garment"
      title="New Garment"
      closeActiveModal={closeActiveModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="item-name-input" className="modal__label">
        Name
      </label>
      <input
        className="modal__input"
        type="text"
        name="name"
        value={values.name}
        id="item-name-input"
        placeholder="Name"
        minLength="2"
        maxLength="40"
        required
        onChange={handleChange}
      />
      <span id="item-name-input-error" className="modal__error"></span>
      <label htmlFor="image-link-input" className="modal__label">
        Image
      </label>
      <input
        className="modal__input"
        type="url"
        name="imageUrl"
        value={values.imageUrl}
        id="image-link-input"
        placeholder="Image URL"
        required
        onChange={handleChange}
      />
      <span id="image-link-input-error" className="modal__error"></span>
      <fieldset className="modal__radio-btns">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="Hot" className="modal__label modal__label_type_radio">
          <input
            className="modal__radio-input"
            type="radio"
            id="Hot"
            name="weather"
            required
            value="hot"
            onChange={handleChange}
          />{" "}
          <span>Hot</span>
        </label>
        <label htmlFor="Warm" className="modal__label modal__label_type_radio">
          <input
            className="modal__radio-input"
            type="radio"
            id="Warm"
            name="weather"
            required
            value="warm"
            onChange={handleChange}
          />{" "}
          <span>Warm</span>
        </label>
        <label htmlFor="Cold" className="modal__label modal__label_type_radio">
          <input
            className="modal__radio-input"
            type="radio"
            id="Cold"
            name="weather"
            required
            value="cold"
            onChange={handleChange}
          />{" "}
          <span>Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
