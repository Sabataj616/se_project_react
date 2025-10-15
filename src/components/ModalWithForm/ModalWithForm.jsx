import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  buttonText,
  activeModal,
  closeActiveModal,
  formFilled,
  onSubmit,
}) {
  return (
    <div
      className={`modal ${activeModal === "add-garment" ? "modal_opened" : ""}`}
      id="form-modal"
    >
      <div className="modal__form-container">
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__grey-close-btn"
        ></button>
        <h2 className="modal__title">{title}</h2>
        <form
          onSubmit={onSubmit}
          className="modal__form"
          id="item-form"
          noValidate
        >
          {children}
          <button
            type="submit"
            className={`modal__submit-btn ${
              formFilled ? "" : "modal__submit-btn_disabled"
            }`}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
