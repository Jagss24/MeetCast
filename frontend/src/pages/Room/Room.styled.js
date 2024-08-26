import styled, { keyframes } from "styled-components";

export const RoomConatiner = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "notAllowPadding",
})`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  padding: ${(props) => (props?.notAllowPadding ? "0" : "0 100px")};
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
    align-items: center;
    gap: 30px;
    flex-direction: column;
  }
`;
export const EachSpeaker = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #c0c0c080;
  box-shadow: 0px 4px 4px 0px #00000066;
  padding: 0.5rem;
  border-radius: 22px;
  & > div {
    display: flex;
    gap: 20px;
    align-items: center;
    cursor: pointer;
  }
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .buttons {
    .decline {
      color: #ff0000;
      background: #ff00003d;
    }
    & > button {
      display: flex;
      gap: 5px;
      padding: 12px 16px;
      border-radius: 22px;
      border: none;
      cursor: pointer;
      color: #20bd5f;
      background: #20bd5f33;
      font-weight: 600;
      transition: background 0.2s;

      &:hover {
        opacity: 0.8;
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
  box-shadow: 4px 4px 6.6px 0px #d9d9d926;
  background: #131313;
  border-radius: 22px;
  & > h3 {
    text-align: center;
    padding: 10px 0;
    width: 100%;
    border-bottom: 1px solid #83828299;
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
  box-shadow: 4px 4px 6.6px 0px #d9d9d926;
  background: #131313;
  border-radius: 22px;
  scrollbar-width: none;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  & > h3 {
    position: sticky;
    text-align: center;
    top: 0;
    border-bottom: 1px solid #83828299;
    z-index: 1;
    padding: 10px 0;
    width: 100%;
  }
  & > div {
    width: 80%;
    display: flex;
    gap: 1.5rem;
    align-items: center;
    flex-direction: column;
    margin-bottom: 2.5rem;
    max-height: 350px;
    overflow-y: auto;
    scrollbar-width: none;
    padding: 0 1rem;
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
