import clsx from 'clsx';

import { MessageFragment } from '~/types/generated';
import { useAuthSelector } from '~/redux/selectors';

const ContentText = ({ text, user }: MessageFragment) => {
  const { currentUser } = useAuthSelector();

  const isMessageOwner = currentUser?._id === user._id;

  return (
    <div
      className={clsx(
        'text-sm max-w-max w-[55%] break-words py-3 px-[19px] rounded-[22px]',
        isMessageOwner ? ['ml-auto', 'text-white bg-primary'] : 'bg-gray-100',
      )}
    >
      {text}
    </div>
  );
};

export default ContentText;
