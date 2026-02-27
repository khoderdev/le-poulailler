import { configureStore } from '@reduxjs/toolkit';
import menuReducer, { type MenuState } from './menuSlice';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
  },
});

export interface RootState {
  menu: MenuState;
}
export type AppDispatch = typeof store.dispatch;
