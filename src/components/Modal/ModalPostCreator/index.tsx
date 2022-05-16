import { useState } from 'react';

import clsx from 'clsx';

import { MODAL_TYPES, useModalContext } from '~/contexts/ModalContext';
import { useCreatePostMutation, useUpdatePostMutation } from '~/types/generated';
import { useStoreDispatch } from '~/redux/store';
import { postActions } from '~/redux/slices/postSlice';
import { useAuthSelector, usePostSelector } from '~/redux/selectors';

import ModalWrapper from '../ModalWrapper';
import CreatorForm from './CreatorForm';
import CreatorHeader from './CreatorHeader';
import CreatorPhoto from './CreatorPhoto';
import Loading from '~/components/Loading';

const ModalPostCreator = () => {
  const { modalTypes, hideModal } = useModalContext();
  const { selectedPost, currentAction } = usePostSelector();
  const { currentUser, selectedUser } = useAuthSelector();

  const [caption, setCaption] = useState<string>(selectedPost?.caption ?? '');
  const [preview, setPreview] = useState<string>('');

  const [createPost, { loading: loadingCreatePost }] = useCreatePostMutation();
  const [updatePost, { loading: loadingUpdatePost }] = useUpdatePostMutation();
  const dispatch = useStoreDispatch();

  const oldPhoto = selectedPost?.photo ?? '';

  const reset = () => {
    setCaption('');
    setPreview('');
    hideModal([MODAL_TYPES.POST_CREATOR, MODAL_TYPES.POST_ACTIONS]);

    if (!modalTypes.includes(MODAL_TYPES.POST_DETAIL)) dispatch(postActions.setSelectedPost(null));
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

    if (!data?.success) return;

    reset();

    // At profile page
    if (selectedUser != null && currentUser!._id !== selectedUser._id) return;

    dispatch(postActions.addNewPost(data.post!));
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

    if (data?.success) {
      dispatch(postActions.updatePost(data.post!));
      reset();
    }
  };

  return (
    <ModalWrapper
      modalType={MODAL_TYPES.POST_CREATOR}
      className='w-[913px] max-w-full mx-auto my-12 lg:my-auto'
    >
      {loadingCreatePost || loadingUpdatePost ? (
        <Loading title={currentAction === 'update' ? 'Updating' : 'Sharing'} />
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
            />
            <CreatorForm caption={caption} onChangeCaption={setCaption} />
          </div>
        </div>
      )}
    </ModalWrapper>
  );
};

export default ModalPostCreator;
