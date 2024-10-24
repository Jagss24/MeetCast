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
  position: relative;
  img {
    width: 10rem;
    height: 10rem;
    border-radius: 1.375rem;
    object-fit: cover;
  }
  div {
    border-radius: 1.375rem;
  }
  label {
    position: absolute;
    right: 0px;
    bottom: 0px;
    transform: translateX(50%);
    background-color: #000;
    padding: 0.5rem;
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
  }
  ${MAX.md} {
    label {
      right: -10px;
      bottom: -10px;
      transform: none;
    }
  }
`;

export const UserInfoContainer = styled.div`
  padding-top: 0.625rem;
  & > h3 {
    font-weight: 500;
    font-size: 1.5rem;
  }
  & > p {
    color: var(--button-color);
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
    & > div > span {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.5rem;
      cursor: pointer;
    }
    & > div {
      display: flex;
      align-items: center;
      margin-top: 0.9rem;
      gap: 0.5rem;
    }
    & > div > p > span {
      display: flex;
      justify-content: center;
      align-items: center;
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
  background-color: var(--navbar-color);
  color: var(--button-color);
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
    props.active ? "var(--navbar-color)" : "rgba(131,130,130,0.1)"};
  color: ${(props) => (props.active ? "var(--button-color)" : "#B0B0B0")};
  border-radius: 1.25rem;
  padding: 0.625rem;
  cursor: pointer;
  user-select: none;
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

export const AboutModalStyled = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: none;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  overflow: hidden;

  &.open {
    display: flex;
  }
  h4 {
    font-size: 1.2rem;
  }
  & > div {
    min-width: 50%;
    position: relative;
    @media (max-width: 768px) {
      min-width: 90%;
    }
    margin: 0 auto;
    background-color: var(--navbar-color);
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    border-radius: 0.25rem;
    & > span {
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.5rem;
      cursor: pointer;
    }
  }
  input {
    border: none;
    outline: none;
    border-bottom: 1px solid rgb(159, 0, 255);
    background-color: transparent;
    color: var(--button-color);
    font-size: 0.9rem;
  }

  button {
    background: var(--button-color);
    outline: none;
    border: none;
    border-radius: 0.25rem;
    padding: 0.5rem;
    width: fit-content;
    cursor: pointer;
    &:hover {
      opacity: 0.9;
    }
  }
`;
