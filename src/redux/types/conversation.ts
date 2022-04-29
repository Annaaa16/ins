import { ConversationFragment } from '~/types/generated';

export interface ConversationSliceState {
  conversations: ConversationFragment[];
  cursor: string | null;
  hasMore: boolean;
}

export interface AddFetchedConversationsReducer {
  conversations: ConversationFragment[];
  cursor: string | null;
  hasMore: boolean;
}
