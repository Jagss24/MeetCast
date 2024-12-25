import styled from "styled-components";

export const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background: var(--navbar-color);
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
    top: 50%;
    transform: translateY(-50%);
    color: #20bd5f;
    z-index: 3;
    cursor: pointer;
  }
  & > span.icons {
    right: 10px; /* Add some spacing from the right */
  }

  & > span:first-of-type {
    left: 10px; /* Position for the left icon */
  }
`;

export const UserComponent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  position: relative;
  div {
    cursor: pointer;
  }
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
  }
  .user-modal {
    position: absolute;
    top: 100%;
    right: 0%;
    z-index: 10;
    background-color: var(--navbar-color);
    width: 150px;
    display: none;

    &.open {
      display: block;
    }
    & > p {
      padding: 0.5rem;
      border-bottom: 1px solid var(--border-color);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
    }
  }
`;
