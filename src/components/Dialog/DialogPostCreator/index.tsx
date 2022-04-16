import { useState } from 'react';

import clsx from 'clsx';

import { useCreatePostMutation } from '~/types/generated';
import { useLoading } from '~/hooks';
import { useStoreDispatch } from '~/redux/store';
import { postActions } from '~/redux/slices/postSlice';
import { modalActions } from '~/redux/slices/modalSlice';

import Modal from '~/components/Modal';
import CreatorForm from './CreatorForm';
import CreatorHeader from './CreatorHeader';
import CreatorPhoto from './CreatorPhoto';
import CreatorLoading from './CreatorLoading';

const DialogPostCreator = () => {
  const [caption, setCaption] = useState<string>('');
  const [preview, setPreview] = useState<string>('');

  const [createPost] = useCreatePostMutation();
  const [loading, handleAction] = useLoading();
  const dispatch = useStoreDispatch();

  const handleCreatePostSubmit = async () => {
    const response = await handleAction(() =>
      createPost({
        variables: {
          createPostInput: {
            caption,
            base64Photo: preview,
          },
        },
      }),
    );

    const data = response.data?.createPost;

    if (data?.success && data.post) {
      setCaption('');
      setPreview('');

      dispatch(postActions.addNewPost(data.post));
      dispatch(modalActions.close());
    }
  };

  return (
    <Modal className='w-[913px] max-w-full mx-auto my-12 lg:my-auto'>
      {loading ? (
        <CreatorLoading />
      ) : (
        <div className={clsx('rounded-xl overflow-y-auto', 'bg-white', 'scrollbar-none')}>
          <CreatorHeader onCreatePostSubmit={handleCreatePostSubmit} />
          <div className={clsx('flex flex-col lg:flex-row h-full')}>
            <CreatorPhoto preview={preview} onSetPreview={setPreview} />
            <CreatorForm caption={caption} onChangeCaption={setCaption} />
          </div>
        </div>
      )}
    </Modal>
  );
};

export default DialogPostCreator;
