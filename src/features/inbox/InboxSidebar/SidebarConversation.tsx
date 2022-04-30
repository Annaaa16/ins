import clsx from 'clsx';

import { LIMITS } from '~/constants';
import { ConversationFragment, useGetMessagesLazyQuery, UserFragment } from '~/types/generated';
import { useConversationSelector } from '~/redux/selectors';
import { useStoreDispatch } from '~/redux/store';
import { useSocketContext } from '~/contexts/SocketContext';
import { conversationActions } from '~/redux/slices/conversationSlice';

import Skeleton from '~/components/Skeleton';

import avatar from '~/assets/avatar.png';

interface SidebarConversationProps {
  currentUser: UserFragment | null;
  conversation: ConversationFragment;
}

const SidebarConversation = ({ conversation, currentUser }: SidebarConversationProps) => {
  const { conversationHandler } = useSocketContext();
  const { selectedConversation, messages } = useConversationSelector();

  const [getMessages] = useGetMessagesLazyQuery();
  const dispatch = useStoreDispatch();

  if (currentUser == null) return null;

  const { _id: conversationId, members, lastMessage } = conversation;

  const receiver = members.filter((member) => member._id !== currentUser._id)[0];

  const handleSelectConversation = async () => {
    // Prevent click on same conversation
    if (selectedConversation?._id === conversationId) return;

    dispatch(conversationActions.setSelectedConversation(conversation));

    conversationHandler.joinConversation(conversationId);

    const hasMessagesCache =
      messages[conversationId] != null && messages[conversationId]!.data.length > 0;

    if (hasMessagesCache) return;

    const response = await getMessages({
      variables: {
        conversationId,
        cursor: null,
        limit: LIMITS.MESSAGES,
      },
    });

    const data = response.data?.getMessages;

    if (data?.success && data.messages)
      dispatch(
        conversationActions.addFetchedMessages({
          conversationId,
          messages: data.messages,
          cursor: data.cursor ?? null,
          hasMore: !!data.hasMore,
        }),
      );
  };

  return (
    <div
      onClick={handleSelectConversation}
      className={clsx(
        'flex items-center px-4 py-2.5',
        selectedConversation?._id === conversation._id && 'bg-gray-100',
      )}
    >
      <Skeleton
        className='mr-3 w-12 h-12'
        objectFit='cover'
        rounded
        src={receiver.avatar ?? avatar.src}
      />
      <div className='min-w-0 text-sm-1 lg:text-sm'>
        <div>{receiver.username}</div>
        {lastMessage && (
          <div className={clsx('flex mt-0.5', 'text-base-gray')}>
            <div className='mr-1.5 truncate'>{lastMessage.text}</div>
            <div className='flex-1'>41s</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarConversation;
