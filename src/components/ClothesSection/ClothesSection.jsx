import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ clothingItems, onCardClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section_container">
        <div className="clothes-section__text">
          <p className="clothes-section__title">Your Items</p>
          <button className="clothes-section__button">+ Add New</button>
        </div>
      </div>
      <ul className="clothes-section__cards">
        {clothingItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
