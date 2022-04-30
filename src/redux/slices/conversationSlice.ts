import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// types
import {
  AddFetchedConversationsReducer,
  AddFetchedMessagesReducer,
  ConversationSliceState,
  UpdateRealMessageReducer,
} from '../types/conversation';
import { SocketMessage } from '~/types/socket';

import { ConversationFragment, MessageFragment } from '~/types/generated';
import { getCurrentTime } from '~/helpers/time';

const initialState: ConversationSliceState = {
  messages: {},
  conversations: [],
  cursor: null,
  hasMore: false,
  selectedConversation: null,
};

const updateLastMessage = (
  conversations: ConversationSliceState['conversations'],
  conversationId: string,
  lastMessage: ConversationFragment['lastMessage'],
) => {
  conversations.forEach((conversation) => {
    // TODO: Filter unneeded fields of lastMessage
    if (conversation._id === conversationId) conversation.lastMessage = lastMessage;
  });
};

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    // SECTION: Conversation
    addFetchedConversations: (
      state,
      {
        payload: { conversations, cursor, hasMore },
      }: PayloadAction<AddFetchedConversationsReducer>,
    ) => {
      state.conversations.push(...conversations);
      state.cursor = cursor;
      state.hasMore = hasMore;
    },

    setSelectedConversation: (state, action: PayloadAction<ConversationFragment>) => {
      state.selectedConversation = action.payload;
    },

    // SECTION: Message
    addFetchedMessages: (
      state,
      { payload: { messages, conversationId, ...rest } }: PayloadAction<AddFetchedMessagesReducer>,
    ) => {
      if (state.messages[conversationId] == null)
        state.messages[conversationId] = {
          data: messages,
          ...rest,
        };
      else state.messages[conversationId]!.data.unshift(...messages);
    },

    addFakeMessage: (state, { payload }: PayloadAction<MessageFragment>) => {
      state.messages[payload.conversationId]?.data.push(payload);

      updateLastMessage(state.conversations, payload.conversationId, payload);
    },

    updateRealMessage: (
      state,
      { payload: { fakeMessageId, message: realMessage } }: PayloadAction<UpdateRealMessageReducer>,
    ) => {
      const { _id: realMessageId, conversationId, createdAt } = realMessage;

      state.messages[conversationId]?.data.forEach((message) => {
        if (message._id === fakeMessageId) {
          message._id = realMessageId;
          message.createdAt = createdAt;
        }
      });

      updateLastMessage(state.conversations, conversationId, realMessage);
    },

    addIncomingSocketMessage: (
      state,
      { payload: { _id, text, conversationId, userId } }: PayloadAction<SocketMessage>,
    ) => {
      const sender = state.conversations
        .find((conversation) => conversation._id === conversationId)
        ?.members.find((member) => member._id === userId);

      if (sender == null) return;

      const socketMessage = {
        _id,
        conversationId,
        text,
        user: sender,
        createdAt: getCurrentTime(),
      };

      state.messages[conversationId]?.data.push(socketMessage);

      updateLastMessage(state.conversations, conversationId, socketMessage);
    },
  },
});

export const conversationActions = conversationSlice.actions;

export default conversationSlice.reducer;
