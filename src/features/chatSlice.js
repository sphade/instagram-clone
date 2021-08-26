import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatId: null,
  chatName: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChat: (state, action) => {
      state.chatId = action.payload.chatId;
      state.chatName = action.payload.chatName;
    },
  },
});

export const { setChat} = chatSlice.actions;
export const selectChatName = (state) => state.chat.chatName;
export const selectChatId = (state) => state.chat.chatId;
export default chatSlice.reducer;
