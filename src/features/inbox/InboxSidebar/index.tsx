import { useEffect } from 'react';
import clsx from 'clsx';

import { LIMITS } from '~/constants';
import { useGetConversationsLazyQuery } from '~/types/generated';
import { useStoreDispatch } from '~/redux/store';
import { conversationActions } from '~/redux/slices/conversationSlice';
import { useAuthSelector, useConversationSelector } from '~/redux/selectors';
import { useIntersectionObserver } from '~/hooks';

import IconNewMessage from '~/components/Icon/IconNewMessage';
import SidebarConversation from './SidebarConversation';

const InboxSidebar = () => {
  const { isIntersecting, containerObserverRef, observerRef } = useIntersectionObserver({
    rootMargin: '200px',
  });

  const { conversations } = useConversationSelector();
  const { currentUser } = useAuthSelector();

  const [getConversations] = useGetConversationsLazyQuery();
  const dispatch = useStoreDispatch();

  useEffect(() => {
    if (!isIntersecting) return;

    (async () => {
      const response = await getConversations({
        variables: {
          limit: LIMITS.CONVERSATIONS,
          cursor: null,
        },
      });

      const data = response.data?.getConversations;

      if (data?.success) {
        dispatch(
          conversationActions.addFetchedConversations({
            conversations: data.conversations!,
            hasMore: !!data.hasMore,
            cursor: data.cursor ?? null,
          }),
        );
      }
    })();
  }, [isIntersecting, getConversations, dispatch]);

  return (
    <>
      <div className={clsx('relative', 'flex-shrink-0 h-header-h border-b border-line')}>
        <div className='flex-center h-full w-full font-medium text-sm lg:text-base'>
          {currentUser!.username}
        </div>
        <IconNewMessage className={clsx('abs-center-y right-5', 'cursor-pointer')} />
      </div>

      <div ref={containerObserverRef} className='overflow-y-auto'>
        {conversations.map((conversation) => (
          <SidebarConversation
            key={conversation._id}
            currentUser={currentUser}
            conversation={conversation}
          />
        ))}

        <div ref={observerRef} />
      </div>
    </>
  );
};

export default InboxSidebar;
