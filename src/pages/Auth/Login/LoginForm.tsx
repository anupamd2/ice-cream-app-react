import "../Form.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectAuthLoadingError } from "../../../services/Auth/AuthSelectors";
import { login } from "../../../services/Auth/AuthSlice";
import LoginInput from "../../../types/Auth/LoginInput";
import { useNavigate } from "react-router";

const loginFormSchema = z.object({
  username: z.string(),
  password: z.string(),
});

type LoginFormSchemaType = z.infer<typeof loginFormSchema>;

function LoginForm() {
  const { register, handleSubmit } = useForm<LoginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
  });
  const dispatch = useAppDispatch();
  const { error, isLoading } = useAppSelector(selectAuthLoadingError);
  const navigate = useNavigate();

  const onSubmit = (data: LoginFormSchemaType) => {
    const loginInput: LoginInput = {
      username: data.username,
      password: data.password,
    };
    dispatch(login(loginInput));
  };

  const onClickRegister = () => {
    navigate("/register");
  };

  return (
    <div className="full-screen-container">
      <div className="login-container">
        <h1 className="login-title">Welcome</h1>
        <form action="" className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              id="username"
              {...register("username")}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              id="password"
              {...register("password")}
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {isLoading && (
            <div className="loading-container">
              <p className="loading">Loading...</p>
            </div>
          )}
          {error && (
            <div className="error-container">
              <p className="error-message">{error}</p>
            </div>
          )}
          <div className="new-user-msg-container">
            <p className="new-user-msg">
              Don't have an account yet?{" "}
              <button className="link" onClick={onClickRegister}>
                Register here
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
