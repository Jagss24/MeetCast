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
`;

export const StartRoomBody = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 50%;
  max-width: 500px;
  background: #1d1d1d;
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

export const StartRoomHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 30px;
  border-bottom: 2px solid #262626;
  & > span {
    align-self: flex-start;
  }
  & > input {
    margin: 15px 0px;
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
  justify-content: space-around;
  align-items: center;
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
  background-color: ${(prop) => (prop.roomType ? "#262626" : "")};
  width: 100px;
  padding: 10px;
  border-radius: 12px;
  img {
    width: 50px;
  }
  &:hover {
    background-color: #262626;
  }
`;

export const RoomTitle = styled.span`
  margin-top: 10px;
`;

export const AccessiBility = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  gap: 30px;
`;

export const AccessiBilityOptions = styled.div`
  display: flex;
  gap: 20px;
  span {
    display: flex;
    flex-direction: row !important;
    /* position: relative; */
    margin: 0.5rem;
    input[type="radio"] {
      position: absolute;
      opacity: 0;
      & + label {
        &:before {
          content: "";
          background: #f4f4f4;
          border-radius: 100%;
          border: 1px solid darken(#f4f4f4, 25%);
          display: inline-block;
          width: 1.2em;
          height: 1.2em;
          position: relative;
          top: 0.2em;
          margin-right: 0.5em;
          vertical-align: top;
          cursor: pointer;
          text-align: center;
          transition: all 250ms ease;
        }
      }
      &:checked + label:before {
        background-color: #3197ee;
        box-shadow: inset 0 0 0 4px #f4f4f4;
      }
      &:focus + label:before {
        outline: none;
        border-color: #3197ee;
      }
      &:disabled + label:before {
        box-shadow: inset 0 0 0 4px #f4f4f4;
        border-color: darken(#f4f4f4, 25%);
        background: darken(#f4f4f4, 25%);
      }
      & + label:empty:before {
        margin-right: 0;
      }
    }
  }
`;

export const AccessiBilityText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-size: 1rem;
    font-weight: 500;
  }
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
  padding: 20px 20px 0;
  gap: 10px;
  h6 {
    font-size: 0.9rem;
  }
`;
