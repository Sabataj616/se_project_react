import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import { useEffect } from "react";

const LoginModal = ({ isOpen, onLogin, closeActiveModal }) => {
  const defaultValues = {
    email: "",
    password: "",
  };

  const { values, handleChange, setValues } = useForm(defaultValues);

  useEffect(() => {
    if (isOpen) {
      setValues(defaultValues);
    }
  }, [isOpen]);

  const formFilled = (values.email === "" || values.password === "" ? false : true)
  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(values);
  }

  return (
    <ModalWithForm
      buttonText="Log in"
      title="Log in"
      closeActiveModal={closeActiveModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      formFilled={formFilled}
    >
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
    </ModalWithForm>
  );
};

export default LoginModal;
