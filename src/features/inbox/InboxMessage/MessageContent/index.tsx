import { useConversationSelector } from '~/redux/selectors';

import ContentText from './ContentText';

const MessageContent = () => {
  const { messages, selectedConversation } = useConversationSelector();

  if (selectedConversation == null) return null;

  const selectedMessages = messages[selectedConversation._id]?.data ?? [];

  return (
    <div className='flex flex-col py-4 px-5 overflow-y-auto space-y-2'>
      {selectedMessages.map((message) => (
        <ContentText key={message._id} {...message} />
      ))}
    </div>
  );
};

export default MessageContent;
