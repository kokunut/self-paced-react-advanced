import PropTypes from "prop-types";
import { useState } from "react";
import styled from "styled-components";
import { CATEGORY_LIST } from "../../RestaurantData";
import Modal from "../Modal/Modal";

export default function AddRestaurantModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    category: "",
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    onAdd({
      ...form,
      id: crypto.randomUUID(),
    });
  };

  return (
    <Modal title="새로운 음식점" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <FormItem $required>
          <Label htmlFor="category">카테고리</Label>
          <Select
            name="category"
            id="category"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="">선택해 주세요</option>
            {CATEGORY_LIST.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </FormItem>

        <FormItem $required>
          <Label htmlFor="name">이름</Label>
          <Input
            type="text"
            name="name"
            id="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </FormItem>

        <FormItem>
          <Label htmlFor="description">설명</Label>
          <Textarea
            name="description"
            id="description"
            value={form.description}
            onChange={handleChange}
            cols="30"
            rows="5"
          ></Textarea>
          <HelpText>메뉴 등 추가 정보를 입력해 주세요.</HelpText>
        </FormItem>

        <ButtonContainer>
          <StyledButton $variant="primary" type="submit">
            추가하기
          </StyledButton>
        </ButtonContainer>
      </form>
    </Modal>
  );
}

const FormItem = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 36px;

  label::after {
    ${(props) =>
      props.$required &&
      `
      padding-left: 4px;
      color: var(--primary-color);
      content: "*";
  `}
  }
`;

const Label = styled.label`
  color: var(--grey-400);
  font-size: 14px;
`;

const Input = styled.input`
  height: 44px;

  padding: 8px;
  margin: 6px 0;

  border: 1px solid var(--grey-200);
  border-radius: 8px;

  font-size: 16px;
`;

const Select = styled.select`
  height: 44px;

  padding: 8px;

  border: 1px solid var(--grey-200);
  border-radius: 8px;

  color: var(--grey-300);
`;

const Textarea = styled.textarea`
  padding: 8px;
  margin: 6px 0;
  border: 1px solid var(--grey-200);
  border-radius: 8px;
  font-size: 16px;
  resize: none;
`;

const HelpText = styled.span`
  color: var(--grey-300);
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const StyledButton = styled.button`
  width: 100%;
  height: 44px;
  margin-right: 16px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }
  ${(props) =>
    props.$variant === "primary" &&
    `
    background: var(--primary-color);
    color: var(--grey-100);
  `}
`;

AddRestaurantModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};
