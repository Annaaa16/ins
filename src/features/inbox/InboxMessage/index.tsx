import { useConversationSelector } from '~/redux/selectors';

import MessageFooter from './MessageFooter';
import MessageHeader from './MessageHeader';
import MessagePlaceholder from './MessagePlaceholder';
import MessageContent from './MessageContent';

const InboxMessage = () => {
  const { selectedConversation } = useConversationSelector();

  if (selectedConversation == null) return <MessagePlaceholder />;

  return (
    <>
      <MessageHeader />
      <MessageContent />
      <MessageFooter />
    </>
  );
};

export default InboxMessage;
