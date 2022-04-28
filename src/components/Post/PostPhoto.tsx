import { useState } from 'react';

import clsx from 'clsx';

import { PostFragment } from '~/types/generated';
import { usePost, useDoubleTab } from '~/hooks';

import Skeleton from '../Skeleton';
import IconHeart from '../Icon/IconHeart';

const PostPhoto = (props: PostFragment) => {
  const [isHearted, setIsHearted] = useState<boolean>(false);

  const { photo } = props;

  const { isLiked, reactPost } = usePost(props);
  const [doubleTab] = useDoubleTab();

  const handleReactPost = () => {
    const callback = () => {
      setIsHearted(true);

      if (!isLiked) reactPost();
    };

    doubleTab(callback);
  };

  if (!photo) return null;

  return (
    <div className={'relative'} onClick={handleReactPost}>
      <div className='abs-center z-10'>
        {isHearted && (
          <IconHeart
            white
            onAnimationEnd={() => setIsHearted(false)}
            className={clsx('w-20 h-20 drop-shadow-xl', 'animate-like-feed')}
          />
        )}
      </div>
      <Skeleton src={photo} alt='Thumbnail' draggable={false} />
    </div>
  );
};

export default PostPhoto;
