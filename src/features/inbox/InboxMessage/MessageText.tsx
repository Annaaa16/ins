import clsx from 'clsx';
import React from 'react';

const MessageText = () => {
  return (
    <div className='flex flex-col py-4 px-5 overflow-y-auto space-y-2'>
      <div
        className={clsx(
          'text-sm max-w-max w-[55%] break-words py-4 px-[19px] rounded-[22px]',
          'bg-gray-100',
        )}
      >
        <div className=''>
          dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        </div>
      </div>
    </div>
  );
};

export default MessageText;
