import styled, { keyframes, css } from "styled-components";

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
`;

export const Controls = styled.div`
  position: fixed;
  bottom: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  & > div {
    width: 30%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 15px;
    border-radius: 22px;

    & > button {
      cursor: pointer;
      background: #1d1d1d;
      padding: 12px;
      border-radius: 50%;
      border: none;
      outline: none;
    }
  }
`;

export const TopicStyle = styled.div`
  width: 100%;
  background-color: #131313;
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
  }
  & > span {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 20px;
    background: #20bd5f33;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`;
export const ClientContainer = styled.div`
  width: 85%;
  height: 100%;
  border-radius: 20px;
  position: relative;
  text-align: center;
  overflow: hidden;
  & > p {
    position: absolute;
    text-align: center;
    width: 100%;
    bottom: 0;
    user-select: none;
  }
`;
export const VideoElement = styled.video.withConfig({
  shouldForwardProp: (prop) => prop !== "isVideoOn",
})`
  position: absolute;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 100% !important;
  display: ${(props) => (props.isVideoOn ? "block" : "none")};
  margin: 0 auto;
  object-fit: cover;
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
  width: ${(props) => (props?.audioElem ? "50px" : "100%")};
  height: ${(props) => (props?.audioElem ? "50px" : "100%")};
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1d1d1d;
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

  @media (max-width: 768px) {
    grid-template-columns: ${(props) => (props.fullScreen ? "1fr" : "1fr")};
    grid-template-rows: ${(props) => (props.fullScreen ? "auto" : "auto auto")};
  }
`;

export const ChatContainer = styled.div`
  grid-row: 1;
  width: 100%;
  height: 90%;
  background: #ffffff;
  border-radius: 20px;
`;

export const PariticiPantContainer = styled.div`
  grid-row: 1;
  width: 100%;
  height: 90%;
  background: #ffffff;
  border-radius: 20px;
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
    }
  }
`;

export const ChatMessageContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-height: 400px;
  overflow: auto;
  & > div {
    & > h5 {
      font-weight: 500;
      font-size: 0.85rem;
    }
    & > p {
      font-weight: 400;
      font-size: 0.8rem;
    }
  }
`;

export const ChatInputContainer = styled.div`
  position: absolute;
  bottom: 10px;
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
    background: #20bd5f45;
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
`;

export const EachOption = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #20bd5f45;
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
