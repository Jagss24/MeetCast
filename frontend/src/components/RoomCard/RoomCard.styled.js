import styled from "styled-components";

export const RoomCardStyled = styled.div`
  display: flex;
  /* justify-content: flex-start; */
  align-items: center;
  background-color: #1d1d1d;
  border-radius: 12px;
  margin-top: 30px;
  width: 300px;
  height: 200px;
`;

export const RoomMain = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 10px;
  padding: 0 20px;
`;
export const SpeakerContainers = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;
export const SpeakersAvatar = styled.div`
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #20bd5f;
    &:last-child {
      top: 25px;
      left: 20px;
    }
  }
`;
export const SpeakersName = styled.div`
  display: flex;
  flex-direction: column;
  span {
    font-weight: 300;
  }
`;
export const Topic = styled.span`
  max-width: 300px;
`;

export const TotalNumber = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 6px;
  align-items: center;
  position: absolute;
  bottom: -40px;
  right: 15px;
  span {
    font-weight: 500;
    font-size: 0.8rem;
    color: #c4c5c5;
  }
`;

export const IconContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;
