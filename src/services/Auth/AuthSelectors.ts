import { RootState } from "../../app/store";

const selectUsername = (state: RootState) => state.auth.username;
const selectAuthLoadingError = (state: RootState) => {
  return {
    isLoading: state.auth.isLoading,
    error: state.auth.error,
  };
};

export { selectUsername, selectAuthLoadingError };
