import styled from "styled-components";

export const RoomCardStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 12px 0;
  background: linear-gradient(
    72.8deg,
    rgba(32, 189, 95, 0.5) 1.12%,
    rgba(19, 19, 19, 0.5) 98.64%
  );
  border-radius: 10px;
  width: 30%;
  height: auto;
`;

export const RoomMain = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  gap: 10px;
  width: 95%;
  position: relative;
`;
export const SpeakerContainers = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 20px;
  gap: 30px;
  align-items: center;
  position: relative;
  margin-bottom: 10px;
`;

export const HostContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  img,
  div {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`;
export const SpeakersAvatar = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["randomcolors", "speakerLength"].includes(prop),
})`
  display: flex;
  flex-direction: column;
  position: relative;
  img,
  div {
    min-width: 45px;
    height: 45px;
    border-radius: 50%;
    object-fit: cover;
    &:last-child {
      position: ${(props) =>
        props.speakerLength === 1 ? "initial" : "absolute"};
      top: 25px;
      left: 20px;
    }
  }
`;
export const SpeakersName = styled.div`
  display: flex;
  flex-direction: column;
  span {
    font-weight: 300;
    margin-left: 30px;
    white-space: nowrap;
  }
`;
export const Topic = styled.span`
  font-size: 18px;
  line-height: 28px;
  font-weight: 500;
`;
export const About = styled.span`
  font-weight: 400;
`;
export const JoinRoom = styled.button`
  text-align: center;
  color: #20bd5f;
  background-color: #000;
  max-width: fit-content;
  border: none;
  outline: none;
  padding: 10px;
  border-radius: 10px;
  align-self: center;
  cursor: pointer;
  transition: all 0.1s;
  &:hover {
    color: #fff;
    opacity: 0.8;
  }
`;
