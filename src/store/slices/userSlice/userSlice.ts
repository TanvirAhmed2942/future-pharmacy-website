import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteCookie } from "@/lib/cookies";
import type { RootState } from "@/store/store";

interface User {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  role: string;
  isLoggedIn: boolean;
  dateOfBirth: string;
  profile?: string;
}

export interface UserState {
  user: User;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  user: {
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    role: "user",
    dateOfBirth: "",
    isLoggedIn: false,
  },
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Partial<User>>) => {
      state.user = {
        ...state.user,
        ...action.payload,
        isLoggedIn: true,
      };
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = {
        ...initialState.user,
      };
      state.isLoggedIn = false;
      // Clear cookies and localStorage on logout
      if (typeof window !== "undefined") {
        deleteCookie("token");
        deleteCookie("refreshToken");
        localStorage.removeItem("userData");
      }
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
  },
});

export const { login, logout, updateUser } = userSlice.actions;

// Selectors
export const selectUser = (state: RootState) => state.user.user;
export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn;
export const selectUserRole = (state: RootState) => state.user.user.role;

export default userSlice.reducer;
