import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import { useEffect } from "react";

const RegisterModal = ({
  isOpen,
  onRegister,
  closeActiveModal,
  onToggleModal,
  activeModal,
}) => {
  const defaultValues = {
    name: "",
    avatar: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      onToggleModal={onToggleModal}
      activeModal={activeModal}
    >
      <label htmlFor="register-name-input" className="modal__label">
        Name
      </label>
      <input
        className="modal__input"
        type="text"
        name="name"
        value={values.name}
        id="register-name-input"
        placeholder="Name"
        minLength="2"
        maxLength="40"
        required
        onChange={handleChange}
      />
      <span id="register-name-input-error" className="modal__error"></span>
      <label htmlFor="register-email-input" className="modal__label">
        Email
      </label>
      <input
        className="modal__input"
        type="email"
        name="email"
        value={values.email}
        id="register-email-input"
        placeholder="Please enter your email address"
        required
        onChange={handleChange}
      />
      <span id="register-email-input-error" className="modal__error"></span>
      <label htmlFor="register-password-input" className="modal__label">
        Password
      </label>
      <input
        className="modal__input"
        type="password"
        name="password"
        value={values.password}
        id="register-password-input"
        placeholder="password"
        required
        onChange={handleChange}
      />
      <span id="register-password-input-error" className="modal__error"></span>
      <label htmlFor="user-confirm-password-input" className="modal__label">
        Confirm password
      </label>
      <input
        className="modal__input"
        type="password"
        name="confirmPassword"
        value={values.confirmPassword}
        id="user-confirm-password-input"
        placeholder="Confirm password"
        required
        onChange={handleChange}
      />
      <label htmlFor="register-avatar-input" className="modal__label">
        Avatar
      </label>
      <input
        className="modal__input"
        type="url"
        name="avatar"
        value={values.avatar}
        id="register-avatar-input"
        placeholder="Avatar URL"
        required
        onChange={handleChange}
      />
      <span id="register-avatar-input-error" className="modal__error"></span>
    </ModalWithForm>
  );
};

export default RegisterModal;
