import PropTypes from "prop-types";
import styled from "styled-components";
import { CATEGORY_IMAGE } from "../../RestaurantData";

export default function RestaurantItem({ item, onOpenModal }) {
  return (
    <RestaurantLi onClick={() => onOpenModal(item)}>
      <RestaurantCategory>
        <CategoryIcon src={CATEGORY_IMAGE[item.category]} alt={item.category} />
      </RestaurantCategory>
      <RestaurantInfo>
        <RestaurantName>{item.name}</RestaurantName>
        <Description>{item.description}</Description>
      </RestaurantInfo>
    </RestaurantLi>
  );
}

const RestaurantLi = styled.li`
  display: flex;
  align-items: flex-start;

  padding: 16px 8px;

  border-bottom: 1px solid #e9eaed;

  cursor: pointer;
  &:hover {
    background-color: #f9fafb;
  }
`;

const RestaurantCategory = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  min-width: 64px;
  min-height: 64px;

  margin-right: 16px;

  border-radius: 50%;
  background: var(--lighten-color);
`;

const CategoryIcon = styled.img`
  width: 36px;
  height: 36px;
`;

const RestaurantInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const RestaurantName = styled.h3`
  margin: 0;
`;

const Description = styled.p`
  display: -webkit-box;

  padding-top: 8px;

  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

RestaurantItem.propTypes = {
  item: PropTypes.shape({
    category: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onOpenModal: PropTypes.func.isRequired,
};
