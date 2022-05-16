import { useRef } from 'react';

import clsx from 'clsx';

// types
import { UserWithPostCount } from '~/redux/types/auth';
import { useAddAvatarMutation, useUpdateAvatarMutation } from '~/types/generated';
import { useStoreDispatch } from '~/redux/store';
import { useAuthSelector } from '~/redux/selectors';
import { authActions } from '~/redux/slices/authSlice';
import { postActions } from '~/redux/slices/postSlice';
import { commentActions } from '~/redux/slices/commentSlice';

import { SpinnerLogo } from '~/components/Spinner';
import Skeleton from '~/components/Skeleton';
import DetailActions from './DetailActions';

import avatar from '~/assets/avatar.png';

interface ProfileDetailProps {
  user: UserWithPostCount;
}

const ProfileDetail = ({ user }: ProfileDetailProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { currentUser } = useAuthSelector();

  const [addAvatar, { loading: addAvatarLoading }] = useAddAvatarMutation();
  const [updateAvatar, { loading: updateAvatarLoading }] = useUpdateAvatarMutation();
  const dispatch = useStoreDispatch();

  const isMe = currentUser!._id === user._id;
  const isLoading = addAvatarLoading || updateAvatarLoading;

  const handleAvatar = (file?: File) => {
    if (file == null || !isMe) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      let avatar: string | null = null;

      // Add avatar
      if (currentUser!.avatar == null) {
        const response = await addAvatar({
          variables: {
            base64Photo: reader.result as string,
          },
        });

        const data = response.data?.addAvatar;

        if (data?.success) avatar = data.avatar as string;
      } else {
        const response = await updateAvatar({
          variables: {
            oldPhotoUrl: currentUser!.avatar as string,
            base64Photo: reader.result as string,
          },
        });

        const data = response.data?.updateAvatar;

        if (data?.success) avatar = data.avatar as string;
      }

      if (avatar == null) return;

      dispatch(authActions.setAvatar({ avatar }));
      dispatch(postActions.updateAvatar({ currentUserId: currentUser!._id, avatar }));
      dispatch(commentActions.updateAvatar({ currentUserId: currentUser!._id, avatar }));
    };
  };

  return (
    <>
      <div className='col-span-1'>
        <div
          className={clsx(
            'relative',
            'w-36 h-36 mt-4 ml-7 overflow-hidden rounded-full',
            isMe && !isLoading && 'cursor-pointer',
          )}
        >
          <Skeleton
            onClick={() => {
              if (isMe) fileInputRef.current?.click();
            }}
            objectFit='cover'
            src={user.avatar ?? avatar.src}
            alt='Avatar'
          />
          {isLoading && (
            <>
              <div className={clsx('absolute inset-0', 'bg-modal-light')} />
              <SpinnerLogo className={clsx('absolute inset-0', 'w-2/5 m-auto')} />
            </>
          )}
        </div>
        {isMe && (
          <input
            ref={fileInputRef}
            accept='image/png, image/jpeg, image/gif'
            onChange={(e) => handleAvatar(e.target.files?.[0])}
            className='hidden'
            type='file'
          />
        )}
      </div>
      <div className='col-span-2'>
        <div className='flex items-center'>
          <h1 className='text-4xl'>{user.username}</h1>
          <DetailActions user={user} />
        </div>
        <div className='flex gap-x-5 text-base mt-5'>
          <span>
            <span className='font-medium'>{user.postCounts}</span> posts
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
