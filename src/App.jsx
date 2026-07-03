import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import CategoryFilter from "./components/CategoryFilter/CategoryFilter";
import RestaurantList from "./components/RestaurantList/RestaurantList";
import RestaurantDetailModal from "./components/RestaurantDetailModal/RestaurantDetailModal";
import AddRestaurantModal from "./components/AddRestaurantModal/AddRestaurantModal";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const BASE_URL = "http://localhost:3000/restaurants";

function App() {
  const queryClient = useQueryClient();
  const {
    isPending,
    error,
    data: restaurants = [],
  } = useQuery({
    queryKey: ["restaurants"],
    queryFn: () => fetch(BASE_URL).then((res) => res.json()),
  });

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const addRestaurantMutation = useMutation({
    mutationFn: async (newRestaurant) => {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRestaurant),
      });

      if (!res.ok) {
        throw new Error("서버에 식당을 추가하는 데 실패했습니다.");
        return res.json();
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
      setIsAddModalOpen(false);
    },
    onError: (error) => {
      console.error(error);
      alert("음식점을 추가하는 중 오류가 발생했습니다. 다시 시도해 주세요.");
    },
  });

  const handleAddRestaurant = (newRestaurant) => {
    addRestaurantMutation.mutate(newRestaurant);
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
