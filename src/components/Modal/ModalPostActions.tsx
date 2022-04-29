import clsx from 'clsx';

import { MODAL_TYPES, useModalContext } from '~/contexts/ModalContext';
import { useAuthSelector, usePostSelector } from '~/redux/selectors';
import { useDeletePostMutation } from '~/types/generated';
import { useStoreDispatch } from '~/redux/store';
import { postActions } from '~/redux/slices/postSlice';

import PostActions from '~/helpers/modalActions/post';
import ModalWrapper from './ModalWrapper';
import Loading from '../Loading';

const ModalPostActions = () => {
  const { showModal, hideModal } = useModalContext();

  const { currentUser } = useAuthSelector();
  const { selectedPost } = usePostSelector();

  const [deletePost, { loading: loadingDelete }] = useDeletePostMutation();

  const dispatch = useStoreDispatch();

  const isPostOwner = currentUser?._id === selectedPost?.user._id;

  const handleDeletePost = async () => {
    if (!isPostOwner) return;

    const postId = selectedPost!._id;

    const response = await deletePost({
      variables: {
        postId,
      },
    });

    if (response.data?.deletePost.success) {
      dispatch(
        postActions.deletePost({
          postId,
        }),
      );

      dispatch(postActions.setSelectedPost(null));
      hideModal(MODAL_TYPES.POST_ACTIONS);
    }
  };

  const { meActions, publicActions, addPostAction } = new PostActions();

  const selectedActions = isPostOwner ? meActions : publicActions;

  addPostAction('delete', handleDeletePost);
  addPostAction('edit', () => {
    dispatch(postActions.setCurrentAction('update'));
    showModal(MODAL_TYPES.POST_CREATOR);
  });

  return (
    <ModalWrapper
      closeHandler={() => dispatch(postActions.setSelectedPost(null))}
      modalType={MODAL_TYPES.POST_ACTIONS}
    >
      {loadingDelete ? (
        <Loading title='Deleting' />
      ) : (
        <ul
          className={clsx(
            'text-center rounded-lg w-100 max-w-full text-sm divide-y-2 border-line',
            'bg-white',
          )}
        >
          {selectedActions.map(({ title, hasConfirm, action }) => (
            <li
              key={title}
              onClick={action}
              className={clsx(
                'py-4',
                'cursor-pointer',
                hasConfirm && ['font-bold', 'text-base-red'],
              )}
            >
              {title}
            </li>
          ))}
        </ul>
      )}
    </ModalWrapper>
  );
};

export default ModalPostActions;
