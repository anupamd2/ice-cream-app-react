import User from "../../types/core/User";
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import RegisterInput from "../../types/Auth/RegisterInput";
import initial_data from "../../data/initial_data";
import IceCreamPreferencesInput from "../../types/User/IceCreamPreferencesInput";

interface UserState {
  users: User[];
  isLoading: boolean;
  error: string;
}

function getInitialUserState(): UserState {
  return {
    users: [...initial_data],
    isLoading: false,
    error: "",
  };
}

const registerNewUser = createAsyncThunk<
  User,
  RegisterInput,
  { state: RootState }
>("user/register", async (registerInput: RegisterInput, { getState }) => {
  const userList: UserState = getState().users;
  const match = userList.users.find(
    (user) => user.username === registerInput.username
  );
  if (!match) {
    const newUser: User = {
      username: registerInput.username,
      password: registerInput.password,
      iceCreamPreferences: [],
    };
    return Promise.resolve(newUser);
  }
  return Promise.reject("Username already exists");
});

const saveUserInformation = createAsyncThunk<
  IceCreamPreferencesInput,
  IceCreamPreferencesInput,
  { state: RootState }
>(
  "user/save",
  async (iceCreamPreferencesInput: IceCreamPreferencesInput, { getState }) => {
    const userList: UserState = getState().users;
    const match = userList.users.find(
      (user) => user.username === iceCreamPreferencesInput.username
    );
    if (!match) {
      return Promise.reject("Username not found");
    }
    return Promise.resolve(iceCreamPreferencesInput);
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: getInitialUserState(),
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<UserState>) => {
    builder
      .addCase(registerNewUser.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(registerNewUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = [...state.users, action.payload];
        state.error = "";
      })
      .addCase(registerNewUser.rejected, (state, action) => {
        state.isLoading = false;
        if (action.error.message) {
          state.error = action.error.message;
        } else {
          state.error = "Unknown error";
        }
      });
    builder
      .addCase(saveUserInformation.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(saveUserInformation.fulfilled, (state, action) => {
        state.isLoading = false;
        const usersCopy: User[] = [];
        state.users.forEach((user) => {
          if (user.username !== action.payload.username) {
            usersCopy.push(user);
          } else {
            const newUser: User = {
              username: user.username,
              password: user.password,
              iceCreamPreferences: action.payload.iceCreamPreferences,
            };
            usersCopy.push(newUser);
          }
        });
        state.users = usersCopy;
        state.error = "";
      })
      .addCase(saveUserInformation.rejected, (state, action) => {
        state.isLoading = false;
        if (action.error.message) {
          state.error = action.error.message;
        } else {
          state.error = "Unknown error";
        }
      });
  },
});

const userReducer = userSlice.reducer;

export { registerNewUser, saveUserInformation };
export default userReducer;
