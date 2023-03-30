import { createSlice } from "@reduxjs/toolkit";
import { ReactSession } from "react-client-session";

ReactSession.setStoreType("localStorage");

interface User {
  user: {
    user_id: number | undefined;
    username: string | undefined;
    token: string | undefined;
  };
}

const initialState: User = {
  user: {
    user_id: ReactSession.get("user_id") || undefined,
    username: ReactSession.get("username") || undefined,
    token: ReactSession.get("token") || undefined,
  },
};

const UserSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      ReactSession.remove("user_id");
      ReactSession.remove("username");
      ReactSession.remove("token");
      state.user = {
        user_id: ReactSession.get("user_id") || undefined,
        username: ReactSession.get("username") || undefined,
        token: ReactSession.get("token") || undefined,
      };
    },
  },
});

export const { setUser, logoutUser } = UserSlice.actions;

export default UserSlice.reducer;
