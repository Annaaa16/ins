import { ConversationFragment, MessageFragment } from '~/types/generated';

export interface ConversationSliceState {
  messages: {
    [conversationId: string]: {
      data: MessageFragment[];
      cursor: string | null;
      hasMore: boolean;
    } | null;
  };
  conversations: ConversationFragment[];
  selectedConversation: ConversationFragment | null;
  cursor: string | null;
  hasMore: boolean;
}

export interface AddFetchedConversationsReducer {
  conversations: ConversationFragment[];
  cursor: string | null;
  hasMore: boolean;
}

export interface AddFetchedMessagesReducer {
  conversationId: string;
  messages: MessageFragment[];
  cursor: string | null;
  hasMore: boolean;
}

export interface UpdateRealMessageReducer {
  fakeMessageId: string;
  message: MessageFragment;
}
