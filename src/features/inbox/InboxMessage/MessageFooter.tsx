import { FormEvent, useState } from 'react';

import clsx from 'clsx';

import { useAutoFocus } from '~/hooks';
// import { useSocketContext } from '~/contexts/SocketContext';

import IconEmoji from '~/components/Icon/IconEmoji';
import IconHeart from '~/components/Icon/IconHeart';
import IconPhoto from '~/components/Icon/IconPhoto';

const MessageFooter = () => {
  const [message, setMessage] = useState<string>('');

  // const { sendMessage } = useSocketContext();

  const { focusRef } = useAutoFocus();

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // sendMessage(message);
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
