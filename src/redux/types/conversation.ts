import { ConversationFragment, MessageFragment } from '~/types/generated';

export interface ConversationWithOnlineStatus extends ConversationFragment {
  members: Array<ConversationFragment['creators'][0] & { isOnline?: boolean }>;
}

export interface ConversationSliceState {
  messages: {
    [conversationId: string]: {
      data: MessageFragment[];
      cursor: string | null;
      hasMore: boolean;
    } | null;
  };
  conversations: ConversationWithOnlineStatus[];
  selectedConversation: ConversationWithOnlineStatus | null;
  cursor: string | null;
  hasMore: boolean;
  onlineUserIds: string[];
}

export interface AddFetchedConversationsReducer {
  conversations: ConversationWithOnlineStatus[];
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
