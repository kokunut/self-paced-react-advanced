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

  if (isPending) return "Loading...";
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
