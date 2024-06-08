import styled from "styled-components";

export const MainStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const CardStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background-color: #1d1d1d;
  border-radius: 20px;
  padding: 40px 0;
  flex-direction: column;
`;

export const HeadingStyled = styled.p`
  font-size: 22px;
  font-weight: bold;
`;

export const HeadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HeadingImg = styled.img`
  width: 30px;
  height: 40px;
  margin-right: 10px;
`;

export const ButtonWrapper = styled.button`
  display: flex;
  align-items: center;
  background-color: #0077ff;
  color: #fff;
  font-size: 16px;
  font-weight: normal;
  outline: none;
  border: none;
  padding: 8px;
  border-radius: 20px;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &:not(&:disabled):hover {
    opacity: 0.8;
  }
`;
