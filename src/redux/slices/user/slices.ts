import { createSlice } from "@reduxjs/toolkit";
import { ReactSession } from "react-client-session";

ReactSession.setStoreType("localStorage");

interface User {
  user?: {
    username?: string;
    token?: string;
  };
}

const initialState: User = {
  user: {
    username: ReactSession.get("username"),
    token: ReactSession.get("token"),
  },
};

const UserSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state ) => {
      ReactSession.remove("username");
      ReactSession.remove("token");
      state.user = {
        username: ReactSession.get("username"),
        token: ReactSession.get("token"),
      };
    },
  },
});

export const { setUser, logoutUser } = UserSlice.actions;

export default UserSlice.reducer;
