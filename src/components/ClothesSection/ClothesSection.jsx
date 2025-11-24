import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/currentUserContext";

function ClothesSection({ clothingItems, onCardClick, handleAddClick }) {
  const currentUser = useContext(CurrentUserContext);
  const userClothes = clothingItems.filter((item) => { return item.owner === currentUser?._id; });
  return (
    <div className="clothes-section">
      <div className="clothes-section__container">
        <div className="clothes-section__text">
          <p className="clothes-section__title">Your Items</p>
          <button className="clothes-section__button" onClick={handleAddClick}>
            + Add New
          </button>
        </div>
      </div>
      {currentUser && userClothes && (
        <ul className="clothes-section__cards">
          {userClothes.map((item) => {
            return (
              <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default ClothesSection;
