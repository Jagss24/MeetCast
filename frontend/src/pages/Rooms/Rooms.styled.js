import styled from 'styled-components';
import { MAX } from '../../typography/style';

export const RoomCardContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isProfile',
})`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
  flex-wrap: wrap;
  margin-top: 1rem;
  padding: ${(props) => (props.isProfile ? '0px' : '0 5rem')};
  ${MAX.md} {
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    padding: 0;
  }
`;
