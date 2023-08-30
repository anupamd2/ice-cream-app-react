import { RootState } from "../../app/store";

const selectUsers = (state: RootState) => state.users.users;
const selectUsersLoadingError = (state: RootState) => {
  return {
    isLoading: state.users.isLoading,
    error: state.users.error,
  };
};

export { selectUsers, selectUsersLoadingError };
