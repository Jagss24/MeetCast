import styled from "styled-components";
import { MAX } from "../../typography/style";

export const RoomComponent = styled.div`
  padding-top: 1.25rem;
  width: 100%;
`;
export const RoomCardContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isProfile",
})`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
  flex-wrap: wrap;
  margin: 0 1.875rem;
  padding: ${(props) => (props.isProfile ? "0px" : "0 5rem")};
  ${MAX.md} {
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    padding: 0;
  }
`;
export const RoomNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.875rem;
  gap: 0.5rem;
  ${MAX.md} {
    padding: 0 0.625rem;
  }
`;

export const FirstChild = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
`;

export const Buttons = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
  background-color: ${(props) =>
    props.active ? "rgba(32, 189, 95, 0.2)" : "rgba(131, 130, 130, 0.2)"};

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) => (props.active ? "#20bd5f" : "#fff")};
    font-weight: 600;
    line-height: 1.375rem;
    white-space: nowrap;
  }
  border-radius: 1.25rem;
  padding: 0.625rem 0.875rem;
  cursor: pointer;
  border: none;
  outline: none;
  &:hover {
    opacity: 0.9;
  }
  .hide {
    ${MAX.md} {
      display: none;
    }
  }
`;

export const LoadingDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2.5rem;
  min-height: calc(100vh - 150px);
`;
