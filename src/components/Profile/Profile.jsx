import Sidebar from "../Sidebar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";


function Profile({
  clothingItems,
  onCardClick,
  handleAddClick,
  handleEditProfileClick,
  handleSignOut,
  isLoggedIn,
}) {
  return (
    <section className="profile">
      <Sidebar
        handleEditProfileClick={handleEditProfileClick}
        handleSignOut={handleSignOut}
        isLoggedIn={isLoggedIn}
      />
      
      <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        handleAddClick={handleAddClick}
      />
    </section>
  );
}

export default Profile;
