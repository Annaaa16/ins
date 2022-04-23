// types
import { User } from '~/types/generated';

export interface AuthSliceState {
  currentUser: User | null;
}
