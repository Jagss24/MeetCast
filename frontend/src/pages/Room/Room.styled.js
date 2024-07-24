import styled, { keyframes } from "styled-components";

export const RoomConatiner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  margin: 0 auto;
  width: 1300px;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  flex-direction: column;
`;
export const Title = styled.h2`
  font-weight: 600;
  word-spacing: 2px;
`;

export const About = styled.p`
  font-weight: 300;
`;

export const SpeakerConatiners = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 15px;
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 60px;
  }
`;
export const EachSpeaker = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
`;
export const ButtonConatiners = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;
  & > button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    background-color: #0077ff;
    outline: none;
    border: none;
    cursor: pointer;
    padding: 13px;
    color: #fff;
    border-radius: 10px;
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;
export const Spinner = styled.div.withConfig({
  shouldForwardProp: (prop) => !["width", "height"].includes(prop),
})`
  border: 2px solid transparent; /* Light grey */
  border-top: 2px solid #fff; /* Blue */
  border-radius: 50%;
  width: ${(props) => (props?.width ? props?.width + "px" : "auto")};
  height: ${(props) => (props?.height ? props?.width + "px" : "auto")};
  animation: ${spin} 1s linear infinite;
`;
