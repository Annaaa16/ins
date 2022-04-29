import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// types
import { AddFetchedConversationsReducer, ConversationSliceState } from '../types/conversation';

const initialState: ConversationSliceState = {
  conversations: [],
  cursor: null,
  hasMore: false,
};

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
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
  },
});

export const conversationActions = conversationSlice.actions;

export default conversationSlice.reducer;
