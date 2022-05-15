import { useEffect } from 'react';
import clsx from 'clsx';

import { LIMITS } from '~/constants';
import { MODAL_TYPES, useModalContext } from '~/contexts/ModalContext';
import { useGetConversationsLazyQuery } from '~/types/generated';
import { useStoreDispatch } from '~/redux/store';
import { conversationActions } from '~/redux/slices/conversationSlice';
import { useAuthSelector, useConversationSelector } from '~/redux/selectors';
import { useIntersectionObserver } from '~/hooks';

import IconNewMessage from '~/components/Icon/IconNewMessage';
import SidebarConversation from './SidebarConversation';
import SidebarLoading from './SidebarLoading';

const InboxSidebar = () => {
  const { isIntersecting, containerObserverRef, observerRef } = useIntersectionObserver({
    rootMargin: '200px',
  });

  const { showModal } = useModalContext();
  const { currentUser } = useAuthSelector();
  const conversationSelector = useConversationSelector();

  const [getConversations, { loading: getConversationsLoading }] = useGetConversationsLazyQuery();
  const dispatch = useStoreDispatch();

  const { conversations, hasMore } = conversationSelector;

  useEffect(() => {
    if (!isIntersecting || !hasMore) return;

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
  }, [isIntersecting, hasMore, getConversations, dispatch]);

  return (
    <>
      <div className={clsx('relative', 'flex-shrink-0 h-header-h border-b border-line')}>
        <div className='flex-center h-full w-full font-medium text-sm lg:text-base'>
          {currentUser!.username}
        </div>
        <IconNewMessage
          onClick={() => showModal(MODAL_TYPES.NEW_MESSAGE)}
          className={clsx('abs-center-y right-5', 'cursor-pointer')}
        />
      </div>

      {getConversationsLoading ? (
        <>
          <SidebarLoading />
          <SidebarLoading />
          <SidebarLoading />
        </>
      ) : (
        <div ref={containerObserverRef} className='overflow-y-auto'>
          {conversations.map((conversation) => (
            <SidebarConversation
              conversationSelector={conversationSelector}
              key={conversation._id}
              currentUser={currentUser}
              conversation={conversation}
            />
          ))}

          <div ref={observerRef} />
        </div>
      )}
    </>
  );
};

export default InboxSidebar;
