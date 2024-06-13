import styled from "styled-components";

export const RoomComponent = styled.div`
  display: flex;
  padding-top: 80px;
`;
export const RoomNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  padding: 0 30px;
`;

export const FirstChild = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
export const SecondChild = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #20bd5f;
  border-radius: 20px;
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;
export const StartContainer = styled.button`
  background-color: #20bd5f;
  color: #fff;
  border: none;
  outline: none;
`;
export const SearchInput = styled.input`
  padding: 8px 12px;
  border-radius: 20px;
  border: none;
  outline: none;
  color: #fff;
  background-color: #353535;
`;

export const RoomMainComponent = styled.div``;
