import { useEffect, useRef } from 'react';

import { useConversationSelector } from '~/redux/selectors';

import ContentText from './ContentText';

const MessageContent = () => {
  const { messages, selectedConversation } = useConversationSelector();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current)
      containerRef.current.scrollTo({
        behavior: 'smooth',
        top: containerRef.current.scrollHeight,
      });
  }, [messages]);

  if (selectedConversation == null) return null;

  const selectedMessages = messages[selectedConversation._id]?.data ?? [];

  return (
    <div ref={containerRef} className='flex flex-col py-4 px-5 overflow-y-auto space-y-2'>
      {selectedMessages.map((message) => (
        <ContentText key={message._id} {...message} />
      ))}
    </div>
  );
};

export default MessageContent;