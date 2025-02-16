import styled from "styled-components";

export const EmailPhoneWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  align-self: flex-end;
`;

export const TermStyled = styled.span`
  color: #d9d9d9;
  text-align: center;
  font-weight: normal;
  font-size: 0.75rem;
  opacity: 0.8;
  padding: 0 3.75rem;
  white-space: nowrap;
`;

export const InputStyled = styled.input`
  position: relative;
  background-color: #ffffff;
  border-radius: 1.25rem;
  border: none;
  outline: none;
  padding: 0.5rem 0.625rem 0.5rem 1.875rem;
  color: #334155;
  font-size: 1rem;
  &::placeholder {
    color: #a1a1aa;
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
