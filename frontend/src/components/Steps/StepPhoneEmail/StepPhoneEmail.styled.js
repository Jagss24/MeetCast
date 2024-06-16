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
  font-size: 12px;
  opacity: 0.8;
  padding: 0 60px;
  width: 400px;
`;
export const InputBoxStyled = styled.div`
  position: relative;
  img {
    position: absolute;
    top: 8px;
    left: 8px;
  }
`;
export const InputStyled = styled.input`
  background-color: #262626;
  border-radius: 10px;
  border: none;
  outline: none;
  padding: 12px;
  color: #fff;
  font-size: 16px;
  text-align: center;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
