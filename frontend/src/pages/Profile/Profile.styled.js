import styled from "styled-components";

export const ProfileWrapperStyled = styled.div`
  padding: 0 80px;
`;
export const ProfileContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 40px;
`;
export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
`;

export const UserInfoContainer = styled.div``;
export const RoomContainer = styled.div`
  display: flex;
  margin-top: 30px;
  flex-direction: column;
`;

export const RoomTypes = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid gray;
  width: 100%;
`;

export const RoomTypeHeading = styled("h4").withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})`
  color: ${(props) => (props.active ? " #0077ff" : "#fff")};
  cursor: pointer;
  user-select: none;
  &:hover {
    color: blue;
  }
`;

export const NoRoomContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  & > div {
    text-align: center;
    .no-rooms {
      color: gray;
    }
  }
`;

export const GoBack = styled.div`
  margin-bottom: 30px;
  button {
    padding: 12px 16px;
    background-color: rgba(139, 139, 139, 0.9);
    outline: none;
    border: none;
    border-radius: 22px;
    color: #fff;
    cursor: pointer;
  }
`;
