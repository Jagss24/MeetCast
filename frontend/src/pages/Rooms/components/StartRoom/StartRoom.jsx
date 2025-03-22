import { useStartRoom } from '../../hooks/useStartRoom';
import UiModal from '@/components/ui/UiModal';
import UiButton from '@/components/ui/UiButton';
import { ACCESSIBILITY_TYPES, ROOM_URL_KEYS } from '../../room.constants';
import UiTextInput from '@/components/ui/UiTextInput';
import UISelector from '@/components/ui/UISelector';
import UIMultiSearchSelector from '@/components/ui/UIMultiSearchSelector';
import toast from 'react-hot-toast';
import { X } from 'lucide-react';

const StartRoom = ({ closeModal }) => {
  const {
    functions: { handleCreateRoom },
    states: {
      TOPIC_OPTIONS,
      ROOM_TYPES,
      selectedOption,
      selectedUser,
      userQuery,
      listOfUsers,
    },
    setStates: { setSelectedOption, setSelectedUser, setUserQuery },
    routing: { navigateTo, activeRoom, visibility },
  } = useStartRoom();

  return (
    <UiModal className='relative'>
      <section className='flex flex-col items-center gap-4 my-4'>
        <span>Room Type</span>
        <div className='flex items-center gap-4'>
          {ROOM_TYPES.map((eachRoomType) => {
            const ICON = eachRoomType.icon;
            return (
              <UiButton
                key={eachRoomType.name}
                text={eachRoomType.name}
                icon={<ICON className='size-5' />}
                data-active={activeRoom === eachRoomType.name}
                onClick={() =>
                  navigateTo({
                    to: { [ROOM_URL_KEYS.roomType]: eachRoomType.name },
                  })
                }
                buttonType='tertiary'
                className='h-20 w-24 text-white capitalize flex flex-col-reverse gap-2 rounded-md focus:ring-2 focus:ring-gray data-[active=true]:bg-secondary duration-200'
              />
            );
          })}
        </div>
        {activeRoom === 'podcast' ? (
          <div className='flex items-center gap-4'>
            {ACCESSIBILITY_TYPES.map((eachAccessibility) => (
              <UiButton
                key={eachAccessibility.name}
                text={eachAccessibility.name}
                data-active={visibility === eachAccessibility.name}
                onClick={() =>
                  navigateTo({
                    to: { [ROOM_URL_KEYS.visibility]: eachAccessibility.name },
                  })
                }
                buttonType='tertiary'
                className='text-white px-6 p-2 rounded-full capitalize border border-white focus:ring-2 focus:ring-gray data-[active=true]:bg-white data-[active=true]:text-primary data-[active=true]:ring-0 duration-200'
              />
            ))}
          </div>
        ) : (
          <p className='text-sm font-semibold border border-gray p-4 rounded-lg'>
            If room type is meet then it will always be private
          </p>
        )}
        {activeRoom === 'podcast' && (
          <UISelector
            label='About What?'
            value={selectedOption}
            onChange={(val) => {
              return setSelectedOption({ id: val.id, name: val.name });
            }}
            placeholder='Select topic'
            options={TOPIC_OPTIONS}
          />
        )}
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
        {activeRoom === 'podcast' && visibility === 'public' && (
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
        {activeRoom === 'meet' && (
          <p className='text-sm font-semibold border border-gray p-4 rounded-lg'>
            If room type is meet those users who can join the room will be
            allowed to speak
          </p>
        )}
        {activeRoom === 'podcast' && visibility === 'private' && (
          <p className='text-sm font-semibold border border-gray p-4 rounded-lg'>
            If you will create private room eveyone will be allowed to speak
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
