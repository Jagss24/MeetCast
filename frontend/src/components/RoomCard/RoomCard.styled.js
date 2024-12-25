import styled from "styled-components";
import { MAX } from "../../typography/style";

export const RoomCardStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 0.75rem 0;
  border-radius: 10px;
  min-width: 400px;
  max-width: 400px;
  min-height: 210px;
  height: auto;
  border: 1px solid var(--border-color);
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
  min-height: 3rem;
  word-break: break-all;
  span {
    cursor: pointer;
    color: #20bd5f;
  }
`;
export const JoinRoom = styled.button`
  text-align: center;
  color: var(--text-color);
  background-color: var(--button-color);
  max-width: fit-content;
  border: none;
  outline: none;
  padding: 0.625rem;
  border-radius: 0.625rem;
  align-self: center;
  cursor: pointer;
  transition: all 0.1s;
  &:hover {
    opacity: 0.8;
  }
`;
