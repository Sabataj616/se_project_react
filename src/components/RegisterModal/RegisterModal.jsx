import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import { useEffect } from "react";

const RegisterModal = ({ isOpen, onRegister, closeActiveModal }) => {
  const defaultValues = {
    name: "",
    email: "",
    password: "",
    avatar: "",
  };

  const { values, handleChange, setValues } = useForm(defaultValues);

  useEffect(() => {
    if (isOpen) {
      setValues(defaultValues);
    }
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(values);
  }

  return (
    <ModalWithForm
      buttonText="Sign Up"
      title="New User"
      closeActiveModal={closeActiveModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="user-name-input" className="modal__label">
        Name
      </label>
      <input
        className="modal__input"
        type="text"
        name="name"
        value={values.name}
        id="user-name-input"
        placeholder="Name"
        minLength="2"
        maxLength="40"
        required
        onChange={handleChange}
      />
      <span id="user-name-input-error" className="modal__error"></span>
      <label htmlFor="user-email-input" className="modal__label">
        Email
      </label>
      <input
        className="modal__input"
        type="email"
        name="email"
        value={values.email}
        id="user-email-input"
        placeholder="Please enter your email address"
        required
        onChange={handleChange}
      />
      <span id="user-email-input-error" className="modal__error"></span>
      <label htmlFor="user-password-input" className="modal__label">
        Password
      </label>
      <input
        className="modal__input"
        type="password"
        name="password"
        value={values.password}
        id="user-password-input"
        placeholder="password"
        required
        onChange={handleChange}
      />
      <span id="user-password-input-error" className="modal__error"></span>
      <label htmlFor="user-avatar-input" className="modal__label">
        Avatar
      </label>
      <input
        className="modal__input"
        type="url"
        name="avatar"
        value={values.avatar}
        id="user-avatar-input"
        placeholder="Avatar URL"
        required
        onChange={handleChange}
      />
      <span id="user-avatar-input-error" className="modal__error"></span>
    </ModalWithForm>
  );
};

export default RegisterModal;
