import styled, { keyframes, css } from "styled-components";
import { MAX, VIEW } from "../../typography/style";

export const MeetContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
export const VideoContainer = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50% 50%;
  grid-row: 1;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
  max-width: 100%;
  padding: 0 100px;
  height: 100%;
  ${MAX.lg} {
    width: 90% !important;
    padding: 0px;
    max-width: none;

    ${MAX.sm} {
      grid-template-columns: 100%;
      grid-template-rows: auto;
    }
  }
`;

export const Controls = styled.div`
  position: fixed;
  bottom: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 15px 0;
  & > div {
    width: 30%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 22px;
    gap: 1rem;
    ${MAX.sm} {
      width: 100%;
    }
    ${MAX.md} {
      width: 50%;
    }
    & > button {
      cursor: pointer;
      background: var(--navbar-color);
      padding: 1rem;
      border-radius: 50%;
      border: none;
      outline: none;
    }
    svg {
      color: var(--button-color);
    }
  }
`;

export const TopicStyle = styled.div`
  width: 100%;
  background-color: var(--navbar-color);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 0px;
  height: 8%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  user-select: none;
  & > h4 {
    font-weight: 600;
    font-size: 18px;
    text-transform: capitalize;
    width: 80%;
    text-align: center;
  }
  .icon > span {
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--navbar-color);
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .icon {
    position: absolute;
    left: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    ${MAX.sm} {
      width: 10%;
      position: relative;
      left: 0;
    }
  }
`;

export const HoverLayer = styled.div.withConfig({
  shouldForwardProp: (prop) => !["show"].includes(prop),
})`
  display: ${({ show }) => (show ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  cursor: pointer;
  & > span {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const UserToast = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  background: #fff;
  border-radius: 0.8rem;
  color: #000;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem 1rem;
  }
  .userName {
    border-left: 1px solid #e5e7eb;
    height: 100%;
    padding: 0;
  }
  & > div > img {
    width: 40px;
    height: 40px;
    border-radius: 50px;
  }

  & > div > span {
    font-size: 1rem;
    padding: 0.5rem 1rem;
  }
`;

export const ClientContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !["isFullScreen"].includes(prop),
})`
  width: ${({ isFullScreen }) => (isFullScreen ? "100vw" : "100%")};
  height: ${({ isFullScreen }) => (isFullScreen ? "100vh" : "100%")};
  border-radius: 20px;
  position: ${({ isFullScreen }) => (isFullScreen ? "fixed" : "relative")};
  top: ${({ isFullScreen }) => (isFullScreen ? "0" : "auto")};
  left: ${({ isFullScreen }) => (isFullScreen ? "0" : "auto")};
  z-index: ${({ isFullScreen }) => (isFullScreen ? "999" : "auto")};
  text-align: center;
  overflow: hidden;
  transition: all 0.3s;
  & > p {
    position: absolute;
    text-align: center;
    width: 100%;
    bottom: 0;
    user-select: none;
  }
  ${VIEW.xl} {
    width: ${({ isFullScreen }) => (isFullScreen ? "100vw" : "85%")};
  }
`;
export const VideoElement = styled.video.withConfig({
  shouldForwardProp: (prop) => !["isVideoOn", "isFullScreen"].includes(prop),
})`
  position: absolute;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 100% !important;
  display: ${(props) => (props.isVideoOn ? "block" : "none")};
  margin: 0 auto;
  object-fit: ${(props) => (props.isFullScreen ? "contain" : "cover")};
  ${MAX.lg} {
    object-fit: contain;
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.4);
  }
  70% {
    transform: scale(1.2);
    box-shadow: 0 0 0 10px rgba(255, 0, 0, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0);
  }
`;
export const AvtarContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !["audioElem", "isUserSpeaking"].includes(prop),
})`
  width: ${(props) => (props?.audioElem ? "fit-content" : "100%")};
  height: ${(props) => (props?.audioElem ? "fit-content" : "100%")};
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--navbar-color);
  border-radius: ${(props) => (props?.audioElem ? "50%" : "0")};
  user-select: none;
  img,
  div {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    ${(props) => {
      return (
        props?.isUserSpeaking &&
        !props?.audioElem &&
        css`
          animation: ${pulse} 1.5s infinite;
        `
      );
    }}
  }
  ${(props) => {
    return (
      props?.isUserSpeaking &&
      props?.audioElem &&
      css`
        animation: ${pulse} 1.5s infinite;
      `
    );
  }}
`;

export const VideoAndChatContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !["fullScreen"].includes(prop),
})`
  display: grid;
  grid-template-columns: ${(props) =>
    props.fullScreen ? "80% 20%" : "100% 0%"};
  grid-template-rows: 1fr;
  transition: grid 0.3s;
  justify-content: center;
  height: 92%;
  position: relative;
  margin: 1rem 0 0;
  ${MAX.lg} {
    grid-template-columns: ${(props) => (props.fullScreen ? "1fr" : "1fr")};
    grid-template-rows: ${(props) => (props.fullScreen ? "auto" : "auto auto")};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const ChatContainer = styled.div`
  grid-row: 1;
  width: 100%;
  height: 90%;
  background: #ffffff;
  border-radius: 20px;
  ${MAX.lg} {
    display: none;
  }
`;

export const PariticiPantContainer = styled.div`
  grid-row: 1;
  width: 100%;
  height: 90%;
  background: #ffffff;
  border-radius: 20px;
  ${MAX.lg} {
    display: none;
  }
`;

export const ChatInnerContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-direction: column;
  color: #000;
  position: relative;
  & > h3 {
    font-weight: 500;
    font-size: 1rem;
    color: #000;
  }
  .infoContainer {
    background: #c0c0c06b;
    padding: 10px 5px;
    border-radius: 13px;
    & > p {
      font-size: 0.7rem;
      text-align: center;
      ${MAX.lg} {
        font-size: 0.9rem;
      }
    }
  }
`;

export const ChatMessageContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-bottom: 20px;
  overflow: auto;
  flex-grow: 1;
  & > div {
    & > h5 {
      font-weight: 500;
      font-size: 0.85rem;
      ${MAX.lg} {
        font-size: 1rem;
      }
    }
    & > p {
      font-weight: 400;
      font-size: 0.8rem;
      ${MAX.lg} {
        font-size: 1rem;
      }
    }
  }
`;

export const ChatInputContainer = styled.div`
  padding: 10px 0 20px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 5px;
  & > input {
    background: #d9d9d9;
    outline: none;
    border: none;
    padding: 9px 15px 9px 15px;
    border-radius: 20px;
    width: 80%;
  }
  & > span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    padding: 5px;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

export const OptionsContainer = styled.div`
  position: absolute;
  top: 30px;
  left: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  ${MAX.lg} {
    position: relative;
    top: 0;
    left: 0;
    align-self: start;
    padding-left: 1rem;
    flex-direction: row;
    margin-bottom: 0.5rem;
  }
`;

export const EachOption = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--navbar-color);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  padding: 5px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
export const PariticiPantInnerContainer = styled.div`
  padding: 30px;
  color: #000;
  & > h3 {
    font-weight: 500;
    font-size: 1.2rem;
    letter-spacing: 1.5px;
  }
  & > h5 {
    padding-top: 10px;
    font-weight: 500;
    font-size: 1rem;
  }
`;

export const ClientNameContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  flex-grow: 1;
  padding-bottom: 20px;
  & > div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    & > img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    & > p {
      font-weight: 400;
      font-size: 0.9rem;
    }
  }
`;

export const MobileChatAndPariticipantContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !["fullScreen"].includes(prop),
})`
  background: #fff;
  width: 90%;
  height: 450px;
  position: fixed;
  left: 50%;
  bottom: 5rem;
  transform: translateX(-50%);
  border-radius: 1.375rem;
  display: ${(props) => (props?.fullScreen ? "block" : "none")};
  ${VIEW.lg} {
    display: none;
  }
`;
