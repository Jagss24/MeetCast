import UiTextInput from '@/components/ui/UiTextInput';
import { Send } from 'lucide-react';

const ChatComp = ({
  onClick,
  msgContent,
  setMsgContent,
  clientMessages = [],
}) => {
  return (
    <>
      <div className='flex-1 overflow-auto h-[90%] max-h-[90%] p-2'>
        {clientMessages?.map((eachClientMsg, idx) => (
          <div className='text-white my-2' key={idx}>
            <h5 className='text-sm font-semibold'>
              {eachClientMsg?.userFullName}
            </h5>
            <p className='text-xs '>{eachClientMsg?.msgContent}</p>
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onClick();
        }}>
        <UiTextInput
          value={msgContent}
          onChange={(e) => setMsgContent(e.target.value)}
          placeholder='Send a message to everyone'
          icon={<Send className='text-xs size-4' onClick={onClick} />}
          className='flex items-center border border-gray'
        />
      </form>
    </>
  );
};

export default ChatComp;
