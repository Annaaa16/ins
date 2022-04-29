import clsx from 'clsx';

import { ConversationFragment, UserFragment } from '~/types/generated';

import Skeleton from '~/components/Skeleton';

import avatar from '~/assets/avatar.png';

interface SidebarConversationProps {
  currentUser: UserFragment | null;
  conversation: ConversationFragment;
}

const SidebarConversation = ({ conversation, currentUser }: SidebarConversationProps) => {
  if (currentUser == null) return null;

  const { _id: _conversationId, members, lastMessage } = conversation;

  const receiver = members.filter((member) => member._id !== currentUser._id)[0];

  return (
    <div className={clsx('flex items-center px-4 py-2.5', 'bg-gray-100')}>
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
