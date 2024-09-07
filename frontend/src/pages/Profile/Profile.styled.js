import styled from "styled-components";
import { MAX } from "../../typography/style";

export const ProfileWrapperStyled = styled.div`
  margin-bottom: 12.5rem;
`;
export const ProfileContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2.5rem;
  padding: 0 3rem;
  ${MAX.lg} {
    padding: 0 1.875rem;
  }
  ${MAX.md} {
    gap: 1rem;
  }
  ${MAX.sm} {
    padding: 0 0.9rem;
  }
`;
export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(-50%);
  img {
    width: 10rem;
    height: 10rem;
    border-radius: 1.375rem;
    object-fit: cover;
  }
`;

export const UserInfoContainer = styled.div`
  padding-top: 0.625rem;
  & > h3 {
    font-weight: 500;
    font-size: 1.5rem;
  }
  & > p {
    color: #20bd5f;
    font-size: 1.125rem;
  }
`;
export const RoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  ${MAX.md} {
    width: 100%;
  }
`;

export const AboutAndRoomContainer = styled.div`
  display: flex;
  gap: 1.875rem;
  padding: 0 3rem;
  .aboutContainer {
    width: 20%;
    & > p {
      margin-top: 0.9rem;
    }
    .sessions {
      margin-top: 1.25rem;
      width: 80%;
    }
    ${MAX.md} {
      width: 100%;
    }
  }
  ${MAX.md} {
    padding: 0 0.9rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const SessionBox = styled.div`
  display: flex;
  gap: 0.3rem;
  & > span {
    width: 1.875rem;
  }
  background-color: rgba(32, 189, 95, 0.2);
  color: #20bd5f;
  border-radius: 1.125rem;
  padding: 0.5rem 0;
`;

export const RoomTypes = styled.div`
  display: flex;
  gap: 1.25rem;
  align-items: center;
  padding-bottom: 0.625rem;
  width: 100%;
`;

export const RoomTypeHeading = styled("h4").withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})`
  background-color: ${(props) =>
    props.active ? "rgba(32, 189, 95, 0.2)" : "rgba(131,130,130,0.2)"};
  color: ${(props) => (props.active ? " #20BD5F" : "#fff")};
  border-radius: 1.25rem;
  padding: 0.625rem;
  cursor: pointer;
  user-select: none;
  &:hover {
    opacity: 0.8;
  }
`;

export const NoRoomContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 500px;
  & > div {
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
    top: 1.875rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.4);
    width: fit-content;
    padding: 0.625rem;
    border-radius: 50%;
    &:hover {
      opacity: 0.9;
    }
  }
  .goBack {
    left: 1.875rem;
  }
  .camera {
    top: 1.875rem;
    right: 1.875rem;
  }
  input {
    display: none;
  }
  img {
    width: 100%;
    height: 200px;
  }
`;
