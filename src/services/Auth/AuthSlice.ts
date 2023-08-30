import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import LoginInput from "../../types/Auth/LoginInput";
import { RootState } from "../../app/store";

interface AuthState {
  username: string | undefined;
  isLoading: boolean;
  error: string;
}

const initialState: AuthState = {
  username: undefined,
  isLoading: false,
  error: "",
};

const login = createAsyncThunk<string, LoginInput, { state: RootState }>(
  "auth/login",
  async (loginInput: LoginInput, { getState }) => {
    const userList = getState().users.users;
    const match = userList.find(
      (user) =>
        user.username === loginInput.username &&
        user.password === loginInput.password
    );
    if (match) {
      return Promise.resolve(match.username);
    }
    return Promise.reject("Invalid username or password");
  }
);

const logout = createAsyncThunk("auth/logout", async () => {
  return Promise.resolve("");
});

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.username = action.payload;
        state.error = "";
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        if (action.error.message) {
          state.error = action.error.message;
        } else {
          state.error = "Unknown error";
        }
      });
    builder
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.username = undefined;
        state.error = "";
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        if (action.error.message) {
          state.error = action.error.message;
        } else {
          state.error = "Unknown error";
        }
      });
  },
});

const authReducer = authSlice.reducer;

export { login, logout };
export default authReducer;
