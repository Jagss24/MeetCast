import DummyImage from '@/components/DummyImage';

const Participants = ({ clients = [] }) => {
  return (
    <div className='flex-1 overflow-auto h-[90%] p-2'>
      {clients?.map((client, idx) => (
        <div className='flex items-center gap-2 my-3' key={idx}>
          {client?.avatar ? (
            <img
              src={client?.avatar}
              alt='user_pic'
              referrerPolicy='no-referrer'
              className='w-10 h-10 object-cover rounded-full'
            />
          ) : (
            <DummyImage
              userName={client?.fullName?.charAt(0).toUpperCase()}
              className='w-10 h-10'
            />
          )}
          <p className='text-white text-sm font-medium'>{client?.fullName}</p>
        </div>
      ))}
    </div>
  );
};

export default Participants;
