import { useState } from 'react';

import clsx from 'clsx';

import { useCreatePostMutation } from '~/types/generated';
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

  const { selectedPost } = usePostSelector();

  const [caption, setCaption] = useState<string>(selectedPost?.caption ?? '');
  const [preview, setPreview] = useState<string>(selectedPost?.photo ?? '');

  const [createPost, { loading }] = useCreatePostMutation();
  const dispatch = useStoreDispatch();

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
      setCaption('');
      setPreview('');

      dispatch(postActions.addNewPost(data.post));
      hideModal();
    }
  };

  return (
    <ModalWrapper className='w-[913px] max-w-full mx-auto my-12 lg:my-auto'>
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
    </ModalWrapper>
  );
};

export default ModalPostCreator;
