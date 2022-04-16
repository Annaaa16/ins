// types
import { Post } from '~/types/generated';

export interface PostSliceState {
  posts: Post[];
}

export interface ModalSliceState {
  isOpen: boolean;
}
