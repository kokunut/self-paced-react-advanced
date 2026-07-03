import styled from "styled-components";
import { useCategoryStore } from "../../store/useCategoryStore";
import { FILTER_CATEGORIES } from "../../RestaurantData";

export default function CategoryFilter() {
  const category = useCategoryStore((state) => state.category);
  const setCategory = useCategoryStore((state) => state.setCategory);

  return (
    <FilterContainer>
      <CategorySelect
        name="category"
        id="category-filter"
        aria-label="음식점 카테고리 필터"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {FILTER_CATEGORIES.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </CategorySelect>
    </FilterContainer>
  );
}

const FilterContainer = styled.section`
  display: flex;
  justify-content: space-between;

  padding: 0 16px;
  margin-top: 24px;
`;

const CategorySelect = styled.select`
  height: 44px;
  min-width: 125px;

  border: 1px solid #d0d5dd;
  border-radius: 8px;
  background: transparent;

  font-size: 16px;

  padding: 8px;
`;
