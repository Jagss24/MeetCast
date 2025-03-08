import { useActivate } from './hooks/useActivate';
import UIPageWrapper from '@/components/ui/UIPageWrapper';
import UiCard from '@/components/ui/UiCard';
import UiTextInput from '@/components/ui/UiTextInput';
import UiButton from '@/components/ui/UiButton';
import { CircleUserRound, ShieldCheck } from 'lucide-react';

const Activate = () => {
  const {
    states: { user, avatar },
    functions: { uploadImage, handleSubmit },
    mutations: { activateMutation },
  } = useActivate();
  return (
    <UIPageWrapper classname='flex items-center justify-center'>
      <UiCard
        className='w-96 rounded-md'
        headingIcon={<ShieldCheck className='size-6 text-success' />}
        titleClassName=''
        headerTitle='Lets activate your account'>
        <section className='mt-4 flex flex-col gap-4 w-full'>
          <form
            className='flex flex-col items-center justify-center gap-4'
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
            {avatar ? (
              <img
                className='size-32 rounded-full object-cover '
                src={avatar}
              />
            ) : (
              <CircleUserRound className='size-32 ' strokeWidth={0.8} />
            )}
            <label
              className='text-success font-semibold text-sm cursor-pointer'
              htmlFor='fileInput'>
              <input
                type='file'
                id='fileInput'
                onChange={uploadImage}
                name='avatar'
                style={{ display: 'none' }}
                accept='image/*'
              />
              {avatar ? 'Choose another Pic' : 'Upload your Pic'}
            </label>
            {!user?.signedUpwithGoogle && (
              <UiTextInput
                name='fullName'
                placeholder='Enter your fullname'
                label='Full Name:'
              />
            )}
            <UiTextInput
              name='userName'
              placeholder='Enter your username'
              label='Username:'
            />
            <p className='text-gray text-xs font-semibold'>
              {' '}
              {user?.signedUpwithGoogle
                ? 'Just your username and we’re all set to go!'
                : 'Your fullname, username, we’re all set to go!'}
            </p>
            <UiButton
              type='submit'
              isLoading={activateMutation?.isPending}
              text='Activate'
              className='px-4 h-8 focus:ring-2 focus:ring-success'
            />
          </form>
        </section>
      </UiCard>
    </UIPageWrapper>
  );
};

export default Activate;
