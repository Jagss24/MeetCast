import styled from "styled-components";

export const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  height: 3.75rem;
  background-color: #131313;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  .logo_wrapper {
    display: flex;
    align-items: center;
    text-decoration: none;
    span {
      color: #fff;
      font-weight: 500;
    }
  }
`;

export const SearchInput = styled.input`
  padding: 8px 10px 8px 30px;
  border-radius: 20px;
  border: none;
  outline: none;
  color: #838282;
  line-height: 18px;
  background-color: #d9d9d9;
`;
export const InputWrapper = styled.div`
  position: relative;
  display: inline-block;
  & > span {
    display: flex;
    position: absolute;
    left: 10px; /* Position the icon inside the input */
    top: 50%;
    transform: translateY(-50%);
    color: #20bd5f;
    z-index: 3;
  }
`;

export const UserComponent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  div {
    cursor: pointer;
  }
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
  }
`;
