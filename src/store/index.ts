import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './menuSlice';
import adminReducer from './adminSlice';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    admin: adminReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
