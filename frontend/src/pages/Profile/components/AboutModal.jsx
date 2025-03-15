import React, { useState } from 'react';
import { useProfile } from '../hooks/useProfile';
import { Pencil, X } from 'lucide-react';
import UiModal from '@/components/ui/UiModal';
import UiTextInput from '@/components/ui/UiTextInput';
import UiButton from '@/components/ui/UiButton';

const AboutModal = () => {
  const {
    services: { profileData, getReLoginUser },
    mutations: { userInfoUpdateMutation },
  } = useProfile();
  const profileUserData = profileData?.data?.data?.userData;
  const loggedInuserData = getReLoginUser?.data?.data?.userData;
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className='w-[20%] '>
      <h4 className='text-gray font-semibold'>About Me</h4>
      <p className='flex items-start gap-2'>
        {profileUserData?.about || ' Write something about yourself'}

        {profileUserData?.id === loggedInuserData?.id && (
          <span onClick={() => setIsModalOpen(true)} className='cursor-pointer'>
            <Pencil className='size-4' />
          </span>
        )}
      </p>
      {isModalOpen && (
        <UiModal headingText='Update About You' className='relative'>
          <form
            className='flex flex-col gap-4 w-full mt-4'
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const about = formData.get('about');
              userInfoUpdateMutation
                .mutateAsync({
                  userId: loggedInuserData?.id,
                  about: about,
                })
                .then(() => setIsModalOpen(false));
            }}>
            <UiTextInput
              defaultValue={profileUserData?.about}
              name='about'
              placeholder='Enter about youself'
              className='bg-transparent border-b border-white rounded-none text-white placeholder:text-extraLightGray'
            />
            <UiButton
              type='submit'
              text='Update'
              className='w-20 focus:scale-90 focus:brightness-90'
            />
            <span
              className='absolute top-2 right-2 cursor-pointer bg-primary'
              onClick={() => setIsModalOpen(false)}>
              <X className='size-4 text-white' />
            </span>
          </form>
        </UiModal>
      )}
    </div>
  );
};

export default AboutModal;
