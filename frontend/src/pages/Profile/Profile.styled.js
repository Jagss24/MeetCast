import styled from "styled-components";

export const ProfileWrapperStyled = styled.div`
  margin-bottom: 200px;
`;
export const ProfileContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 40px;
  padding: 0 80px;
`;
export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(-50%);
  img {
    width: 160px;
    height: 160px;
    border-radius: 50%;
  }
`;

export const UserInfoContainer = styled.div`
  padding-top: 10px;
  & > h3 {
    font-weight: 500;
    font-size: 24px;
  }
  & > p {
    color: #20bd5f;
    font-size: 18px;
  }
`;
export const RoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

export const AboutAndRoomContainer = styled.div`
  display: flex;
  gap: 30px;
  padding: 0 80px;
  .aboutContainer {
    width: 20%;
    & > p {
      margin-top: 15px;
    }
    .sessions {
      margin-top: 20px;
      width: 80%;
    }
  }
`;

export const SessionBox = styled.div`
  display: flex;
  gap: 5px;
  & > span {
    width: 30px;
  }
  background-color: rgba(32, 189, 95, 0.2);
  color: #20bd5f;
  border-radius: 18px;
  padding: 8px 0;
`;

export const RoomTypes = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  padding-bottom: 10px;
  width: 100%;
`;

export const RoomTypeHeading = styled("h4").withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})`
  background-color: ${(props) =>
    props.active ? "rgba(32, 189, 95, 0.2)" : "rgba(131,130,130,0.2)"};
  color: ${(props) => (props.active ? " #20BD5F" : "#fff")};
  border-radius: 20px;
  padding: 10px;
  cursor: pointer;
  user-select: none;
  &:hover {
    opacity: 0.8;
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

export const CoverContainer = styled.div`
  position: relative;
  & > label,
  & > span {
    position: absolute;
    top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.4);
    width: fit-content;
    padding: 10px;
    border-radius: 50%;
    &:hover {
      opacity: 0.9;
    }
  }
  .goBack {
    left: 30px;
  }
  .camera {
    top: 30px;
    right: 30px;
  }
  input {
    display: none;
  }
  img {
    width: 100%;
    height: 200px;
  }
`;
