import React from 'react';
import { UiModalBox, UiModalContainer } from './UiModal.styled';
import {
  HeadingStyled,
  HeadingWrapper,
} from '@/components/shared/commonStyles/Card.styled';

const UiModal = ({ children, headingText }) => {
  return (
    <UiModalContainer>
      <UiModalBox>
        <HeadingWrapper>
          <HeadingStyled>{headingText}</HeadingStyled>
        </HeadingWrapper>
        {children}
      </UiModalBox>
    </UiModalContainer>
  );
};

export default UiModal;
