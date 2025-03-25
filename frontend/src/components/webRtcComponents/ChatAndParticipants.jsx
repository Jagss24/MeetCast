import { useState } from 'react';
import ChatComp from '@/components/webRtcComponents/ChatComp';
import Participants from '@/components/webRtcComponents/Participants';

const ChatAndParticipants = ({
  isOpen,
  onClick,
  msgContent,
  setMsgContent,
  clientMessages = [],
  clients = [],
}) => {
  const [active, setActive] = useState('chat');
  const options = [{ name: 'chat' }, { name: 'pariticipants' }];

  return (
    <div className='w-full max-h-full h-full bg-border rounded flex flex-col p-2'>
      <div className='bg-primary grid grid-cols-2 text-center text-gray rounded p-1'>
        {options.map((eachopt) => (
          <p
            data-active={eachopt.name === active}
            onClick={() => setActive(eachopt.name)}
            className='capitalize data-[active="true"]:bg-border data-[active="true"]:text-white p-1 cursor-pointer transition-all duration-300 rounded'
            key={eachopt.name}>
            {eachopt.name}
          </p>
        ))}
      </div>
      {active === 'chat' && (
        <ChatComp
          msgContent={msgContent}
          setMsgContent={setMsgContent}
          onClick={onClick}
          clientMessages={clientMessages}
        />
      )}
      {active === 'pariticipants' && <Participants clients={clients} />}
    </div>
  );
};

export default ChatAndParticipants;
