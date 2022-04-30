import { FormEvent, useState } from 'react';

import { nanoid } from 'nanoid';
import clsx from 'clsx';

import { useStoreDispatch } from '~/redux/store';
import { useAutoFocus } from '~/hooks';
import { useCreateMessageMutation } from '~/types/generated';
import { useAuthSelector, useConversationSelector } from '~/redux/selectors';
import { useSocketContext } from '~/contexts/SocketContext';
import { conversationActions } from '~/redux/slices/conversationSlice';
import { getCurrentTime } from '~/helpers/time';

import IconEmoji from '~/components/Icon/IconEmoji';
import IconHeart from '~/components/Icon/IconHeart';
import IconPhoto from '~/components/Icon/IconPhoto';

const MessageFooter = () => {
  const [message, setMessage] = useState<string>('');

  const { conversationHandler } = useSocketContext();
  const { selectedConversation } = useConversationSelector();
  const { currentUser } = useAuthSelector();

  const [createMessage] = useCreateMessageMutation();
  const { focusRef } = useAutoFocus();
  const dispatch = useStoreDispatch();

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fakeMessage = {
      _id: nanoid(12), // fake id to send to socket before receive real message
      text: message,
      conversationId: selectedConversation!._id,
      createdAt: getCurrentTime(),
    };

    conversationHandler.sendMessage({
      ...fakeMessage,
      userId: currentUser!._id,
    });

    dispatch(
      conversationActions.addFakeMessage({
        ...fakeMessage,
        user: currentUser!,
      }),
    );

    setMessage('');

    const response = await createMessage({
      variables: {
        conversationId: selectedConversation!._id,
        createMessageInput: {
          text: message,
        },
      },
    });

    const data = response.data?.createMessage;

    if (data?.success && data.newMessage)
      dispatch(
        conversationActions.updateRealMessage({
          fakeMessageId: fakeMessage._id,
          message: data.newMessage,
        }),
      );
  };

  return (
    <div className={clsx('px-4 mt-auto pb-4')}>
      <form
        onSubmit={handleSendMessage}
        className='flex items-center flex-shrink-0 px-3 rounded-full border-1 border-line'
      >
        <button type='button' className='btn p-2'>
          <IconEmoji />
        </button>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          ref={focusRef}
          className={clsx(
            'w-full pl-1 py-3 text-sm',
            'placeholder:text-sm placeholder:text-base-gray',
          )}
          placeholder='Message...'
        />
        <button type='button' className='btn p-2'>
          <IconPhoto />
        </button>
        <button type='button' className='btn p-2'>
          <IconHeart />
        </button>
      </form>
    </div>
  );
};

export default MessageFooter;
