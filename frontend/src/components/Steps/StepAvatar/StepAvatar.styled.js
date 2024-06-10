import styled from "styled-components";

export const ImgInput = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: none;
  outline: none;
  overflow: hidden;
`;
export const BlueLineText = styled.label`
  font-size: 0.8rem;
  color: #0077ff;
  cursor: pointer;
`;

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid #0077ff;
`;

export const ErrorStyled = styled.p`
  font-size: 0.7rem;
  color: red;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 30px;
  align-items: center;
`;

export const ActivationStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 80px;
`;
