import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/currentUserContext";

export default function ItemCard({
  item,
  onCardClick,
  onCardLike,
  isLoggedIn,
}) {
  const handleCardClick = () => {
    onCardClick(item);
  };
  const currentUser = useContext(CurrentUserContext);
  const isLiked = currentUser
    ? item.likes.some((id) => id === currentUser?.data?._id)
    : false;
  const handleLike = () => {
    onCardLike({ id: item._id, isLiked: isLiked });
  };
  return (
    <li className="card">
      {isLoggedIn && currentUser && (
        <img
          onClick={handleCardClick}
          className="card__image"
          src={item.imageUrl}
          alt={item.name}
        />
      )}
      {isLoggedIn && currentUser && <h2 className="card__name">{item.name}</h2>}
      {isLoggedIn && currentUser && (
        <button
          onClick={handleLike}
          type="button"
          className={`card__like-btn ${
            isLiked ? "card__like-btn_active" : "card__like-btn_inactive"
          }`}
        ></button>
      )}
    </li>
  );
}
