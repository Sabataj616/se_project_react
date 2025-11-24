import Sidebar from "../Sidebar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function Profile({ clothingItems, onCardClick, handleAddClick }) {
  return (
    <section className="profile">
      <Sidebar />
      <EditProfileModal />
      <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        handleAddClick={handleAddClick}
      />
    </section>
  );
}

export default Profile;
