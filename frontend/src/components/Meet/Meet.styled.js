import styled, { keyframes, css } from "styled-components";

export const VideoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 10%;
  width: 100%;
  height: 100%;
`;

export const Controls = styled.div`
  position: fixed;
  bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  & > div {
    width: 30%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 20px;
    border-radius: 22px;

    & > button {
      cursor: pointer;
      background: #1d1d1d;
      padding: 20px;
      border-radius: 50%;
      border: none;
      outline: none;
    }
  }
`;

export const ClientContainer = styled.div`
  width: 450px;
  height: 450px;
  position: relative;
  text-align: center;
`;
export const VideoElement = styled.video.withConfig({
  shouldForwardProp: (prop) => prop !== "isVideoOn",
})`
  width: 100%;
  height: 100%;
  display: ${(props) => (props.isVideoOn ? "block" : "none")};
  margin: 0 auto;
  object-fit: fill;
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
  ${(props) => {
    console.log({ props });
    return (
      props?.isUserSpeaking &&
      css`
        animation: ${pulse} 1.5s infinite;
      `
    );
  }}
`;
