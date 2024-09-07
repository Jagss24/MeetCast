import styled from "styled-components";
import { MAX } from "../../typography/style";

export const PodContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const AudioAndChatContainer = styled.div.withConfig({
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

  ${MAX.md} {
    grid-template-columns: ${(props) => (props.fullScreen ? "1fr" : "1fr")};
    grid-template-rows: ${(props) => (props.fullScreen ? "auto" : "auto auto")};
  }
`;

export const AudioConatiner = styled.div`
  display: grid;
  grid-row: 1;
  align-items: flex-start;
  grid-template-columns: repeat(auto-fit, minmax(150px, 0fr));
  gap: 20px;
  max-width: 100%;
  padding: 0 100px;
  height: 100%;
`;

export const AudioElement = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  & > p {
    text-align: center;
    margin: 0;
  }
`;

export const AvtarContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1d1d1d;
`;
