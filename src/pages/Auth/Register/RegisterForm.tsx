import "../Form.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectUsersLoadingError } from "../../../services/User/UserSelectors";
import { registerNewUser } from "../../../services/User/UserSlice";
import RegisterInput from "../../../types/Auth/RegisterInput";
import { useNavigate } from "react-router";

const registerFormSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  password: z.string(),
});

type RegisterFormSchemaType = z.infer<typeof registerFormSchema>;

function RegisterForm() {
  const { register, handleSubmit, formState } = useForm<RegisterFormSchemaType>(
    {
      resolver: zodResolver(registerFormSchema),
    }
  );
  const errors = formState.errors;
  const dispatch = useAppDispatch();
  const { error, isLoading } = useAppSelector(selectUsersLoadingError);
  const navigate = useNavigate();

  const onSubmit = (data: RegisterFormSchemaType) => {
    const registerInput: RegisterInput = {
      username: data.username,
      password: data.password,
    };
    dispatch(registerNewUser(registerInput))
      .unwrap()
      .then(() => {
        alert("Account created!");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onClickRegister = () => {
    navigate("/login");
  };

  return (
    <div className="full-screen-container">
      <div className="login-container">
        <h1 className="login-title">Create an account</h1>
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
            Register
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
          {errors.username && (
            <div className="error-container">
              <p className="error-message">{errors.username.message}</p>
            </div>
          )}
          <div className="new-user-msg-container">
            <p className="new-user-msg">
              Already have an account?{" "}
              <button className="link" onClick={onClickRegister}>
                Login
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
