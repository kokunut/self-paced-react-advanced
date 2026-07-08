import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import CategoryFilter from "./components/CategoryFilter/CategoryFilter";
import RestaurantList from "./components/RestaurantList/RestaurantList";
import RestaurantDetailModal from "./components/RestaurantDetailModal/RestaurantDetailModal";
import AddRestaurantModal from "./components/AddRestaurantModal/AddRestaurantModal";
import {
  useAddRestaurantMutation,
  useRestaurantsQuery,
} from "./hooks/useRestaurants";

function App() {
  const { isPending, error, data: restaurants = [] } = useRestaurantsQuery();

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const addRestaurantMutation = useAddRestaurantMutation();

  const handleAddRestaurant = (newRestaurant) => {
    addRestaurantMutation.mutate(newRestaurant, {
      onSuccess: () => {
        setIsAddModalOpen(false);
      },
    });
  };

  const handleOpenModal = (item) => {
    setSelectedRestaurant(item);
    setIsDetailModalOpen(true);
  };

  if (isPending) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div
          className="loading-spinner"
          style={{
            width: "32px",
            height: "32px",
            border: "4px solid #e5e7eb",
            borderTop: "4px solid #3b82f6",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
      </div>
    );
  }
  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <Header onOpenModal={() => setIsAddModalOpen(true)} />
      <main>
        <CategoryFilter />
        <RestaurantList
          restaurants={restaurants}
          onOpenModal={handleOpenModal}
        />
      </main>
      <aside>
        {isDetailModalOpen && (
          <RestaurantDetailModal
            restaurant={selectedRestaurant}
            onClose={() => setIsDetailModalOpen(false)}
          />
        )}
        {isAddModalOpen && (
          <AddRestaurantModal
            onClose={() => setIsAddModalOpen(false)}
            onAdd={handleAddRestaurant}
          />
        )}
      </aside>
    </>
  );
}

export default App;
