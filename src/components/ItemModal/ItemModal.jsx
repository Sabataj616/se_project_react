import CurrentUserContext from "../../contexts/currentUserContext";
import { useContext } from "react";
import "./ItemModal.css";

function ItemModal({ isOpen, card, closeActiveModal, deleteItemHandler }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser?.data?._id;

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__container modal__container_preview">
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close-btn"
        ></button>

        <img src={card.imageUrl} alt="card image" className="modal__image" />
        <div className="modal__footer">
          {currentUser && isOwn && (
            <button className="delete__button" onClick={deleteItemHandler}>
              Delete item
            </button>
          )}
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
