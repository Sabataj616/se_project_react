import Sidebar from "../Sidebar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({ clothingItems, onCardClick }) {
  return (
    <section className="profile">
      <Sidebar />
      <ClothesSection clothingItems={clothingItems} onCardClick={onCardClick} />
    </section>
  );
}

export default Profile;
