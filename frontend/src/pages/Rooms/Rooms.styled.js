import styled from "styled-components";

export const RoomComponent = styled.div`
  padding-top: 20px;
  width: 100%;
`;
export const RoomCardContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isProfile",
})`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 30px;
  padding: ${(props) => (props.isProfile ? "0px" : "0 80px")};
`;
export const RoomNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
`;

export const FirstChild = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const Buttons = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  background-color: ${(props) =>
    props.active ? "rgba(32, 189, 95, 0.2)" : "rgba(131, 130, 130, 0.2)"};

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) => (props.active ? "#20bd5f" : "#fff")};
    font-weight: 600;
    line-height: 23px;
  }
  border-radius: 20px;
  padding: 10px 14px;
  cursor: pointer;
  border: none;
  outline: none;
  &:hover {
    opacity: 0.9;
  }
`;

export const LoadingDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 40px;
  min-height: calc(100vh - 150px);
`;
