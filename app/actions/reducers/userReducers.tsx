// reducers/userReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user: {
    name: string;
  } | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ name: string }>) {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
