import {
  MainStyled,
  CardStyled,
  HeadingStyled,
  HeadingWrapper,
  HeadingLogo,
  ButtonWrapper,
  TermStyled,
  InputStyled,
} from '@/components/shared/commonStyles/Card.styled';
import { useActivate } from './hooks/useActivate';
import { FaRegKeyboard, FaRegUser } from 'react-icons/fa';
import {
  FormStyled,
  InputWrapper,
} from '@/components/shared/Navigation/Navigation.styled';
import { ImageWrapper, ImgInput, UploadText } from './Activate.styled';
import { CgProfile } from 'react-icons/cg';
import CircularIcon from '@/components/CircularIcon';

const Activate = () => {
  const {
    states: { user, avatar },
    functions: { uploadImage, handleSubmit },
    mutations: { activateMutation },
  } = useActivate();
  return (
    <MainStyled>
      <CardStyled>
        <HeadingWrapper>
          <HeadingLogo
            src='/images/cool.png'
            style={{ width: '25px', height: '25px' }}
          />
          <HeadingStyled>Let's activate your account</HeadingStyled>
        </HeadingWrapper>
        <FormStyled
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const fullName = formData.get('fullName');
            const userName = formData.get('userName');
            handleSubmit({
              userId: user?.id,
              fullName,
              userName,
              avatar,
            });
          }}>
          <div>
            <ImageWrapper>
              {avatar ? <ImgInput src={avatar} /> : <CgProfile size={50} />}
            </ImageWrapper>
          </div>
          <UploadText htmlFor='fileInput'>
            <input
              type='file'
              id='fileInput'
              onChange={uploadImage}
              name='avatar'
              style={{ display: 'none' }}
              accept='image/*'
            />
            {avatar ? 'Choose another Pic' : 'Upload your Pic'}
          </UploadText>
          {!user?.signedUpwithGoogle && (
            <InputWrapper>
              <span>
                <FaRegKeyboard />
              </span>
              <InputStyled placeholder='Enter your FullName' name='fullName' />
            </InputWrapper>
          )}
          <InputWrapper>
            <span>
              <FaRegUser />
            </span>
            <InputStyled placeholder='Set your username' name='userName' />
          </InputWrapper>
          <TermStyled>
            {user?.signedUpwithGoogle
              ? 'Just your username and we’re all set to go!'
              : 'Your fullname, username, we’re all set to go!'}
          </TermStyled>
          <ButtonWrapper type='submit'>
            Next
            {activateMutation?.isPending && (
              <CircularIcon width={12} height={12} color='#000' />
            )}
          </ButtonWrapper>
        </FormStyled>
      </CardStyled>
    </MainStyled>
  );
};

export default Activate;
