import { MAX } from '@/typography/style';
import styled from 'styled-components';

const UiModalContainer = styled.div`
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
  z-index: 99;
`;

const UiModalBox = styled.div`
  padding: 2rem;
  max-width: 500px;
  width: full;
  background: var(--primary-color);
  border-radius: 1.25rem;
  ${MAX.md} {
    width: 90%;
    max-width: 90%;
  }
`;

export { UiModalContainer, UiModalBox };
