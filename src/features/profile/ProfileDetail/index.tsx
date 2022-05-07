import { UserFragment } from '~/types/generated';

import Skeleton from '~/components/Skeleton';
import DetailActions from './DetailActions';

import avatar from '~/assets/avatar.png';

interface ProfileDetailProps {
  postCounts: number;
  user: UserFragment;
}

const ProfileDetail = ({ user, postCounts }: ProfileDetailProps) => {
  return (
    <>
      <div className='col-span-1'>
        <Skeleton
          rounded
          className='w-36 h-36 pt-4 ml-7'
          src={user.avatar ?? avatar.src}
          alt='Avatar'
        />
      </div>
      <div className='col-span-2'>
        <div className='flex items-center'>
          <h1 className='text-4xl'>{user.username}</h1>
          <DetailActions user={user} />
        </div>
        <div className='flex gap-x-5 text-base mt-5'>
          <span>
            <span className='font-medium'>{postCounts}</span> posts
          </span>
          <span>
            <span className='font-medium'>{user.followers.length}</span> followers
          </span>
          <span>
            <span className='font-medium'>{user.following.length}</span> following
          </span>
        </div>
      </div>
    </>
  );
};

export default ProfileDetail;
