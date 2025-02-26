import styled from 'styled-components';

export const OTPWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
export const OTPBox = styled.input`
  display: inline-block;
  width: 50px;
  background-color: #454545;
  &:disabled {
    background-color: #262626;
  }
  border-radius: 10px;
  outline: none;
  border: none;
  color: #fff;
  padding: 1.1rem 0.1rem;
  margin-right: 15px;
  margin-bottom: 25px;
  text-align: center;
`;
