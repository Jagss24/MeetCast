import styled from "styled-components";
import { MAX } from "../../typography/style";

export const RoomCardStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 0.75rem 0;
  background: linear-gradient(
    72.8deg,
    rgba(32, 189, 95, 0.5) 1.12%,
    rgba(19, 19, 19, 0.5) 98.64%
  );
  border-radius: 10px;
  min-width: 400px;
  max-width: 400px;
  min-height: 210px;
  height: auto;
  ${MAX.sm} {
    width: 90%;
    max-width: 90%;
    min-width: 90%;
  }
`;

export const RoomMain = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  gap: 0.625rem;
  width: 95%;
  position: relative;
`;
export const SpeakerContainers = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 1.25rem;
  gap: 1.875rem;
  align-items: center;
  position: relative;
  margin-bottom: 0.625rem;
`;

export const HostContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
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
      top: 1.5rem;
      left: 1.25rem;
    }
  }
`;

export const Topic = styled.span`
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 500;
`;
export const About = styled.p`
  font-weight: 400;
  span {
    cursor: pointer;
    color: #20bd5f;
  }
`;
export const JoinRoom = styled.button`
  text-align: center;
  color: #20bd5f;
  background-color: #000;
  max-width: fit-content;
  border: none;
  outline: none;
  padding: 0.625rem;
  border-radius: 0.625rem;
  align-self: center;
  cursor: pointer;
  transition: all 0.1s;
  &:hover {
    color: #fff;
    opacity: 0.8;
  }
`;
