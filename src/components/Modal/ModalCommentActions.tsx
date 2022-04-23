import clsx from 'clsx';

import { MODAL_TYPES, useModalContext } from '~/contexts/ModalContext';
import { useAuthSelector, useCommentSelector } from '~/redux/selectors';
import { useDeleteCommentMutation } from '~/types/generated';
import { useStoreDispatch } from '~/redux/store';
import { commentActions } from '~/redux/slices/commentSlice';

import ModalWrapper from './ModalWrapper';
import CommentActions from '~/helpers/modalActions/comment';

const ModalCommentActions = () => {
  const { hideModal } = useModalContext();
  const { currentUser } = useAuthSelector();
  const { selectedComment } = useCommentSelector();

  const [deleteComment] = useDeleteCommentMutation();
  const dispatch = useStoreDispatch();

  const isCommentOwner = selectedComment?.user._id === currentUser?._id;

  const { meActions, publicActions, addCommentAction } = new CommentActions();

  const selectedActions = isCommentOwner ? meActions : publicActions;

  const handleDeleteComment = async () => {
    if (!selectedComment) return;

    const response = await deleteComment({
      variables: {
        commentId: selectedComment._id,
      },
    });

    hideModal(MODAL_TYPES.COMMENT_ACTIONS);

    if (response.data?.deleteComment.success)
      dispatch(commentActions.deleteComment(selectedComment));
  };

  addCommentAction('delete', handleDeleteComment);

  return (
    <ModalWrapper modalType={MODAL_TYPES.COMMENT_ACTIONS} lightOverlay hideCloseButton>
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
            className={clsx('py-4', 'cursor-pointer', hasConfirm && ['font-bold', 'text-base-red'])}
          >
            {title}
          </li>
        ))}
      </ul>
    </ModalWrapper>
  );
};

export default ModalCommentActions;
