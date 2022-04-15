import clsx from 'clsx';

import avatar from '~/assets/avatar.png';

const PostHeader = () => {
  return (
    <div className='flex items-center py-3 px-4'>
      <img className='w-8h h-8 mr-3 rounded-full' src={avatar.src} alt='Avatar' />
      <span className={clsx('text-sm font-medium')}>duolingo</span>
    </div>
  );
};

export default PostHeader;
