import styled from 'styled-components';
import { MAX } from '../../../typography/style';

export const MainStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: calc(100vh - 80px);
`;

export const CardStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
  border-radius: 1.25rem;
  padding: 2.5rem 0;
  flex-direction: column;
  position: relative;
  box-shadow: 4px 4px 9.5px 0px #d9d9d980;
  .sub {
    text-align: center;
    padding: 0 1.8rem;
    line-height: 1.5rem;
  }
  width: 400px;
  ${MAX.sm} {
    width: 85%;
    .sub {
      font-size: 14px;
    }
  }
`;

export const HeadingStyled = styled.p`
  font-size: 1.3rem;
  font-weight: bold;
`;

export const HeadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HeadingLogo = styled.span`
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonWrapper = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--button-color);
  color: var(--text-color);
  font-size: 1rem;
  font-weight: normal;
  cursor: pointer;
  outline: none;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  margin-bottom: 0.625rem;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &:not(&:disabled):hover {
    opacity: 0.8;
  }
  &:focus {
    border: 3px solid #20bd5f;
  }
`;
