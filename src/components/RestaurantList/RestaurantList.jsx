import PropTypes from "prop-types";
import styled from "styled-components";
import RestaurantItem from "./RestaurantItem";
import { useCategoryStore } from "../../store/useCategoryStore";

export default function RestaurantList({ restaurants, onOpenModal }) {
  const category = useCategoryStore((state) => state.category);

  const filteredRestaurants = restaurants.filter(
    (restaurant) => category === "전체" || restaurant.category === category,
  );

  return (
    <RestaurantListContainer>
      <ul>
        {filteredRestaurants.map((item) => (
          <RestaurantItem key={item.id} item={item} onOpenModal={onOpenModal} />
        ))}
      </ul>
    </RestaurantListContainer>
  );
}

const RestaurantListContainer = styled.section`
  display: flex;
  flex-direction: column;

  padding: 0 16px;
  margin: 16px 0;
`;

RestaurantList.propTypes = {
  restaurants: PropTypes.array.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};
