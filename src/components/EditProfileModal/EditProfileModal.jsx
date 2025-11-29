import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import { useEffect } from "react";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/currentUserContext";

const EditProfileModal = ({ isOpen, onEditProfile, closeActiveModal }) => {
  const currentUser = useContext(CurrentUserContext);
  const defaultValues = {
    name: currentUser?.name || "",
    avatar: currentUser?.avatar || "",
  };
  
  const { values, handleChange, setValues } = useForm(defaultValues);

  useEffect(() => {
    if (isOpen) {
      setValues(defaultValues);
    }
  }, [isOpen]);

  const formFilled = (values.name === "" || values.avatar === "" ? false : true)

  function handleSubmit(evt) {
    evt.preventDefault();
    onEditProfile(values);
  }

  return (
    <ModalWithForm
      buttonText="Save changes"
      title="Edit Profile"
      closeActiveModal={closeActiveModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      formFilled={formFilled}
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
      <label htmlFor="avatar-link-input" className="modal__label">
        Avatar
      </label>
      <input
        className="modal__input"
        type="url"
        name="avatar"
        value={values.avatar}
        id="avatar-link-input"
        placeholder="Image URL"
        required
        onChange={handleChange}
      />
      <span id="avatar-link-input-error" className="modal__error"></span>
    </ModalWithForm>
  );
};

export default EditProfileModal;
