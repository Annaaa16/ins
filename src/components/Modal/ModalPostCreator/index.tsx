import { useState } from 'react';

import clsx from 'clsx';

import { useCreatePostMutation, useUpdatePostMutation } from '~/types/generated';
import { useStoreDispatch } from '~/redux/store';
import { postActions } from '~/redux/slices/postSlice';
import { useModalContext } from '~/contexts/ModalContext';
import { usePostSelector } from '~/redux/selectors';

import ModalWrapper from '../ModalWrapper';
import CreatorForm from './CreatorForm';
import CreatorHeader from './CreatorHeader';
import CreatorPhoto from './CreatorPhoto';
import CreatorLoading from './CreatorLoading';

const ModalPostCreator = () => {
  const { hideModal } = useModalContext();

  const { selectedPost, currentAction } = usePostSelector();

  const [caption, setCaption] = useState<string>(selectedPost?.caption ?? '');
  const [preview, setPreview] = useState<string>('');
  const [oldPhoto, setOldPhoto] = useState<string>(selectedPost?.photo ?? '');

  const [createPost, { loading: createPostLoading }] = useCreatePostMutation();
  const [updatePost, { loading: updatePostLoading }] = useUpdatePostMutation();
  const dispatch = useStoreDispatch();

  const reset = () => {
    setCaption('');
    setPreview('');
    hideModal();
  };

  const handleCreatePostSubmit = async () => {
    const response = await createPost({
      variables: {
        createPostInput: {
          caption,
          base64Photo: preview,
        },
      },
    });

    const data = response.data?.createPost;

    if (data?.success && data.post) {
      dispatch(postActions.addNewPost(data.post));
      reset();
    }
  };

  const handleUpdatePostSubmit = async () => {
    const response = await updatePost({
      variables: {
        updatePostInput: {
          postId: selectedPost!._id,
          caption,
          ...(preview
            ? {
                newBase64Photo: preview,
                oldPhotoUrl: oldPhoto,
              }
            : {}),
        },
      },
    });

    const data = response.data?.updatePost;

    if (data?.success && data.post) {
      dispatch(postActions.updatePost(data.post));
      reset();
    }
  };

  return (
    <ModalWrapper className='w-[913px] max-w-full mx-auto my-12 lg:my-auto'>
      {createPostLoading || updatePostLoading ? (
        <CreatorLoading />
      ) : (
        <div className={clsx('rounded-xl overflow-y-auto', 'bg-white', 'scrollbar-none')}>
          <CreatorHeader
            onCreateOrUpdateSubmit={
              currentAction === 'update' ? handleUpdatePostSubmit : handleCreatePostSubmit
            }
          />
          <div className={clsx('flex flex-col lg:flex-row h-full')}>
            <CreatorPhoto
              preview={preview || oldPhoto}
              oldPhoto={oldPhoto}
              onSetPreview={setPreview}
              onSetOldPhoto={setOldPhoto}
            />
            <CreatorForm caption={caption} onChangeCaption={setCaption} />
          </div>
        </div>
      )}
    </ModalWrapper>
  );
};

export default ModalPostCreator;
