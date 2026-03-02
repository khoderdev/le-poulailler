import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AdminState {
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AdminState = {
  isAuthenticated: false,
  isLoading: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      const adminPassword =
        import.meta.env.VITE_ADMIN_PASSWORD || "lepoulailler2024";
      if (action.payload === adminPassword) {
        state.isAuthenticated = true;
        sessionStorage.setItem("admin_authenticated", "true");
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      sessionStorage.removeItem("admin_authenticated");
    },
    checkSession: (state) => {
      state.isAuthenticated =
        sessionStorage.getItem("admin_authenticated") === "true";
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { login, logout, checkSession, setLoading } = adminSlice.actions;
export default adminSlice.reducer;
