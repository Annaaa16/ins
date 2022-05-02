import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// types
import {
  AddFetchedConversationsReducer,
  AddFetchedMessagesReducer,
  ConversationSliceState,
  UpdateRealMessageReducer,
} from '../types/conversation';
import { UserWithOnlineStatus } from '../types/shared';
import { SocketMessage } from '~/types/socket';

import { ConversationFragment, MessageFragment } from '~/types/generated';
import { getCurrentTime } from '~/helpers/time';

const initialState: ConversationSliceState = {
  messages: {},
  conversations: [],
  cursor: null,
  hasMore: true,
  selectedConversation: null,
  onlineUserIds: [],
};

const updateLastMessage = (
  state: ConversationSliceState,
  conversationId: string,
  lastMessage: ConversationFragment['lastMessage'],
) => {
  state.conversations.forEach((conversation) => {
    // TODO: Filter unneeded fields of lastMessage
    if (conversation._id === conversationId) conversation.lastMessage = lastMessage;
  });
};

const setOnlineStatus = (
  state: ConversationSliceState,
  status: 'online' | 'offline',
  userId: string,
) => {
  outer: for (const conversation of state.conversations) {
    for (const member of conversation.members) {
      if (member._id === userId) {
        member.isOnline = status === 'online';

        break outer;
      }
    }
  }

  const isOnline = state.onlineUserIds.includes(userId);

  if (!isOnline && status === 'online') state.onlineUserIds.push(userId);
  else if (isOnline && status === 'offline')
    state.onlineUserIds.splice(state.onlineUserIds.indexOf(userId), 1);
};

const updateConversations = (
  conversations: ConversationSliceState['conversations'],
  onlineUserIds: string[],
) => {
  return conversations.map((conversation) => {
    const updatedMembers = conversation.members.map((member) => {
      return { ...member, isOnline: onlineUserIds.includes(member._id) };
    });

    return { ...conversation, members: updatedMembers };
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
      const updatedConversations = updateConversations(conversations, state.onlineUserIds);

      state.cursor = cursor ?? state.cursor;
      state.hasMore = hasMore ?? state.hasMore;
      state.conversations.push(...updatedConversations);
    },

    addConversation: (
      state,
      { payload: { conversation } }: PayloadAction<{ conversation: ConversationFragment }>,
    ) => {
      state.conversations.push(conversation);

      const updatedConversations = updateConversations(state.conversations, state.onlineUserIds);

      state.conversations = updatedConversations;
    },

    addCreator: (
      state,
      {
        payload: { conversationId, creator },
      }: PayloadAction<{ conversationId: string; creator: UserWithOnlineStatus }>,
    ) => {
      state.conversations.map((conversation) => {
        if (conversation._id === conversationId) conversation.creators.push(creator);
      });
    },

    setSelectedConversation: (state, action: PayloadAction<ConversationFragment>) => {
      state.selectedConversation = action.payload;
    },

    setOnlineStatus: (state, { payload: { userId } }: PayloadAction<{ userId: string }>) => {
      setOnlineStatus(state, 'online', userId);
    },

    seOfflineStatus: (state, { payload: { userId } }: PayloadAction<{ userId: string }>) => {
      setOnlineStatus(state, 'offline', userId);
    },

    initOnlineStatus: (state, { payload: { userIds } }: PayloadAction<{ userIds: string[] }>) => {
      const onlineUserIds = [...new Set([...userIds, ...state.onlineUserIds])];
      const updatedConversations = updateConversations(state.conversations, onlineUserIds);

      state.conversations = updatedConversations;
      state.onlineUserIds = onlineUserIds;
    },

    // SECTION: Message
    addFetchedMessages: (
      state,
      { payload: { messages, conversationId, ...rest } }: PayloadAction<AddFetchedMessagesReducer>,
    ) => {
      if (state.messages[conversationId] == null)
        state.messages[conversationId] = {
          data: messages.reverse(),
          ...rest,
        };
      else state.messages[conversationId]!.data.unshift(...messages.reverse());
    },

    addFakeMessage: (state, { payload }: PayloadAction<MessageFragment>) => {
      state.messages[payload.conversationId]?.data.push(payload);

      updateLastMessage(state, payload.conversationId, payload);
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

      updateLastMessage(state, conversationId, realMessage);
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

      // TODO: Filter sender fields
      state.messages[conversationId]?.data.push(socketMessage as any);

      updateLastMessage(state, conversationId, socketMessage);
    },
  },
});

export const conversationActions = conversationSlice.actions;

export default conversationSlice.reducer;
