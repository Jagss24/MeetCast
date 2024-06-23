import styled from "styled-components";

export const StartRoomContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
`;

export const StartRoomBody = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 50%;
  max-width: 500px;
  background: #1d1d1d;
  border-radius: 20px;
  position: relative;
  & > span {
    position: absolute;
    right: 0;
    top: 0;
    padding: 10px;
    cursor: pointer;
  }
`;

export const StartRoomHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 30px;
  border-bottom: 2px solid #262626;
  & > span {
    align-self: flex-start;
  }
  & > input {
    margin: 15px 0px;
  }
`;

export const StartRoomFooter = styled.div`
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  margin: 20px 0;
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #20bd5f;
    border: none;
    outline: none;
    border-radius: 22px;
    padding: 6px 12px;
    cursor: pointer;
  }
`;

export const RoomTypes = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 20px;
`;

export const RoomType = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "roomType",
})`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${(prop) => (prop.roomType ? "#262626" : "")};
  width: 100px;
  padding: 10px;
  border-radius: 12px;
  img {
    width: 50px;
  }
  &:hover {
    background-color: #262626;
  }
`;

export const RoomTitle = styled.span`
  margin-top: 10px;
`;
