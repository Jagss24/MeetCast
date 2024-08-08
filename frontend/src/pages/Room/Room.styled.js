import styled, { keyframes } from "styled-components";

export const RoomConatiner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  margin: 0 auto;
  width: 1300px;
  margin-bottom: 50px;
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

export const UserContainers = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isCenter",
})`
  display: flex;
  justify-content: ${(props) => (props.isCenter ? "center" : "space-between")};
  align-items: flex-start;
  width: 100%;
  & > div {
    width: 45%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 30px;
    flex-direction: column;
  }
`;
export const EachSpeaker = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  & > div {
    display: flex;
    gap: 20px;
    align-items: center;
  }
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .buttons {
    .decline {
      background-color: red;
      &:hover {
        background-color: rgba(255, 0, 0, 0.8);
      }
    }
    & > button {
      display: flex;
      gap: 5px;
      background-color: #0077ff;
      padding: 12px 16px;
      border-radius: 22px;
      border: none;
      cursor: pointer;
      color: #fff;
      transition: background-color 0.2s;
      &:hover {
        background-color: rgba(0, 119, 255, 0.8);
      }
      &:disabled {
        background-color: gray;
        cursor: not-allowed;
      }
    }
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
    &:hover {
      background-color: rgba(0, 119, 255, 0.8);
    }
    &:disabled {
      background-color: gray;
      cursor: not-allowed;
    }
  }
`;
export const SpeakerContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 22px;
  & > h3 {
    text-align: center;
    border-radius: 22px;
    background-color: rgba(0, 0, 0, 0.2);
    padding: 10px 0;
    width: 100%;
  }
  & > div {
    width: 90%;
    display: flex;
    gap: 20px;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    padding: 0 20px 20px;
  }
`;

export const AllowContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 22px;
  min-height: auto;
  max-height: 350px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  & > h3 {
    position: sticky;
    text-align: center;
    border-radius: 22px;
    top: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 1;
    padding: 10px 0;
    width: 100%;
  }
  & > div {
    width: 90%;
    display: flex;
    gap: 20px;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    padding: 0 20px 20px;
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

export const DeclinedText = styled.p`
  margin: 0;
  color: #fc1616;
`;

export const ShareContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  span {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000;
    padding: 15px;
  }
`;

export const SuccessText = styled.p`
  margin: 0;
  color: #0fcd0f;
`;
