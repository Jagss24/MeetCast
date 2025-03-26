import { useStartRoom } from '../../hooks/useStartRoom';
import UiModal from '@/components/ui/UiModal';
import UiButton from '@/components/ui/UiButton';
import { ACCESSIBILITY_TYPES } from '../../room.constants';
import UiTextInput from '@/components/ui/UiTextInput';
import UISelector from '@/components/ui/UISelector';
import UIMultiSearchSelector from '@/components/ui/UIMultiSearchSelector';
import toast from 'react-hot-toast';
import { X } from 'lucide-react';
import { TOPIC_OPTIONS } from '../../room.constants';

const StartRoom = ({ closeModal }) => {
  const {
    functions: { handleCreateRoom },
    states: {
      selectedOption,
      selectedUser,
      userQuery,
      listOfUsers,
      visibility,
      allCanSpeak,
    },
    setStates: {
      setVisibility,
      setSelectedOption,
      setSelectedUser,
      setUserQuery,
      setAllCanSpeak,
    },
  } = useStartRoom();

  return (
    <UiModal className='relative'>
      <section className='flex flex-col items-center gap-4 my-4'>
        <span>Room Type</span>

        <div className='flex items-center gap-4'>
          {ACCESSIBILITY_TYPES.map((eachAccessibility) => (
            <UiButton
              key={eachAccessibility.name}
              text={eachAccessibility.name}
              data-active={visibility === eachAccessibility.name}
              onClick={() => setVisibility(eachAccessibility.name)}
              icon={<eachAccessibility.icon className='size-4' />}
              buttonType='tertiary'
              className='text-white px-6 p-2 flex-row-reverse gap-4 rounded-full capitalize border border-white focus:ring-2 focus:ring-gray data-[active=true]:bg-white data-[active=true]:text-primary data-[active=true]:ring-0 duration-200'
            />
          ))}
        </div>
        {visibility === 'public' && (
          <div className='w-full'>
            <p className='text-sm my-2 font-semibold'>Speaker options</p>
            <div className='flex items-center gap-4 justify-center w-full'>
              <UiButton
                buttonType='tertiary'
                text='Assigned speakers only'
                data-active={!allCanSpeak}
                onClick={() => setAllCanSpeak(false)}
                className='px-4 text-white font-normal border border-offWhite h-10 data-[active=true]:bg-border'
              />
              <UiButton
                buttonType='tertiary'
                text='Everyone can speak'
                data-active={allCanSpeak}
                onClick={() => setAllCanSpeak(true)}
                className='px-4 text-white font-normal border border-offWhite h-10 data-[active=true]:bg-border'
              />
            </div>
          </div>
        )}

        <UISelector
          label='About What?'
          value={selectedOption}
          onChange={(val) => {
            return setSelectedOption({ id: val.id, name: val.name });
          }}
          placeholder='Select topic'
          options={TOPIC_OPTIONS}
        />
      </section>

      <form
        className='w-full flex flex-col gap-2'
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const topic = formData.get('title');
          const description = formData.get('description');
          handleCreateRoom({ topic, description });
        }}>
        <UiTextInput
          name='title'
          label='Title of the room'
          placeholder='Enter your room title...'
          className='placeholder:font-normal mt-1'
        />
        <UiTextInput
          name='description'
          label='Description of the room'
          placeholder='Say something about your room...'
          className='placeholder:font-normal mt-1'
        />
        {!allCanSpeak && visibility === 'public' && (
          <UIMultiSearchSelector
            label='Speakers'
            onChange={(val) => {
              if (val.length === 4)
                return toast.error('You can only select up to 3 options.');
              setSelectedUser(val);
            }}
            placeholder='Search user to assign as speaker'
            selectedValues={selectedUser}
            options={listOfUsers}
            query={userQuery}
            setQuery={setUserQuery}
            className='bg-white h-12'
          />
        )}

        {visibility === 'private' && (
          <p className='text-sm font-semibold bg-border/30 border border-gray p-4 rounded-lg'>
            If you will create private room everyone will be allowed to speak
          </p>
        )}
        <UiButton
          text='Create Room'
          buttonType='primary'
          className='px-4 w-auto self-center'
          type='submit'
        />
      </form>

      <span
        className='absolute top-2 right-2 cursor-pointer bg-primary'
        onClick={closeModal}>
        <X className='size-4 text-white' />
      </span>
    </UiModal>
  );
};

export default StartRoom;
