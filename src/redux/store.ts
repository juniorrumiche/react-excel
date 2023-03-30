import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slices/user/slices";

export const store = configureStore({
  reducer: {
    UserSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
