import styled from "styled-components";

export const EmailPhoneWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  align-self: flex-end;
`;

export const TermStyled = styled.span`
  color: #d9d9d9;
  text-align: center;
  font-weight: normal;
  font-size: 13px;
  opacity: 0.8;
  padding: 0 60px;
  width: 400px;
`;

export const InputStyled = styled.input`
  position: relative;
  background-color: #ffffff;
  border-radius: 20px;
  border: none;
  outline: none;
  padding: 8px 10px 8px 30px;
  color: #20bd5f;
  font-size: 16px;
  &::placeholder {
    color: #20bd5f;
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
