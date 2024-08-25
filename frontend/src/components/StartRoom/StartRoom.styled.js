import styled from "styled-components";

export const StartRoomContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
  height: auto;
`;

export const StartRoomBody = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 50%;
  max-width: 500px;
  background: #000000;
  box-shadow: 4px 4px 6.5px 0px #20bd5f33;
  border-radius: 20px;
  position: relative;
  & > span {
    position: absolute;
    right: 0;
    top: 0;
    padding: 10px;
    cursor: pointer;
  }
`;

export const TopicDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StartRoomHeader = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 30px 30px 0;
  & > input {
    margin: 15px 0px;
  }
`;

export const StartRoomBase = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 85%;
  gap: 0.5rem;
  h3 {
    align-self: flex-start;
    font-size: 1rem;
  }
  input {
    width: 100%;
    margin: 15px 0px;
    border: none;
    outline: none;
    line-height: 18px;
    background-color: #fff;
    padding: 13px 11px 13px 11px;
    border-radius: 10px;
    font-size: 0.9rem;
    margin: 0;
  }
  .desc_div {
    position: relative;
    width: 100%;
    margin-bottom: 1rem;
    & > span {
      position: absolute;
      right: 0;
      bottom: -25%;
      color: white;
    }
  }
`;

export const StartRoomFooter = styled.div`
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  margin: 20px 0;
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #20bd5f;
    border: none;
    outline: none;
    border-radius: 22px;
    padding: 10px 14px;
    cursor: pointer;
  }
`;

export const RoomTypes = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
  width: 100%;
  margin-top: 20px;
`;

export const RoomType = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "roomType",
})`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${(prop) => (prop.roomType ? "#20BD5F33" : "")};
  color: ${(prop) => (prop.roomType ? "#20BD5F" : "")};
  width: 100px;
  padding: 10px;
  border-radius: 12px;
  transition: all 0.3s;
  img {
    width: 50px;
  }
  &:hover {
    background-color: #20bd5f33;
  }
`;

export const RoomTitle = styled.span`
  margin-top: 10px;
`;

export const AccessiBility = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1.5rem;
  gap: 0.75rem;
  & > span {
    margin-top: 0.75rem;
    font-weight: 500;
  }
  & > div {
    display: flex;
    gap: 20px;
  }
`;

export const AccessibilityType = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "accessibility",
})`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => (props?.accessibility ? "#20bd5f33" : "none")};
  color: ${(props) => (props?.accessibility ? "#fff" : "#20bd5f")};
  font-weight: 600;
  border: 1px solid #00ff6675;
  padding: 8px 12px;
  border-radius: 22px;
  cursor: pointer;
  transition: all 0.3s;
  text-align: center;
`;

export const OptionOuterStyled = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

export const AssignSpeakerConatiner = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  h6 {
    font-size: 0.9rem;
  }
`;
