import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { AUTH } from "../../constants/actionTypes";
import { GoogleLogin } from "react-google-login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
  faEye as farEye,
  faEyeSlash as farEyeSlash,
} from "@fortawesome/free-regular-svg-icons";

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = () => {};

  const googleAuthSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, payload: { token, result } });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleAuthFaliure = (error) => {
    console.log(`Google Authentication Failed - ${error}`);
  };

  return (
    <div className="flex flex-col items-center mt-16 mb-10">
      <h1 className="text-2xl font-bold">
        {isSignIn ? "Welcome Back!" : "Create Your Account"}
      </h1>
      <form onSubmit={handleSubmit} className="w-1/3 text-center mt-3">
        {!isSignIn && (
          <input
            placeholder="Name"
            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 mt-4"
            required="required"
            type="text"
            name="name"
            id="name"
            autoFocus
            // value={}
            // onChange={}
          />
        )}
        <input
          placeholder="Email"
          className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 mt-4"
          required="required"
          type="email"
          name="email"
          id="email"
          // value={}
          // onChange={}
        />
        <div className="relative">
          <input
            placeholder="Password"
            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 mt-4"
            required="required"
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            // value={}
            // onChange={}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon
                icon={showPassword ? farEyeSlash : farEye}
                size="lg"
              />
            </button>
          </div>
        </div>

        <button
          className="w-2/3 mt-8 py-2 px-4 text-white font-semibold rounded-lg bg-purple-600 shadow-lg"
          type="submit"
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>

        <p className="text-xl font-bold mt-3">OR</p>
        <GoogleLogin
          clientId="403337593566-e111og3qco29l97c0p1ve7gfuhl3a2kf.apps.googleusercontent.com"
          render={(renderProps) => (
            <button
              className="w-2/3 mt-3 p-2 border-2 rounded-lg"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <FontAwesomeIcon icon={faGoogle} />{" "}
              <span>Sign in with Google</span>
            </button>
          )}
          onSuccess={googleAuthSuccess}
          onFaliure={googleAuthFaliure}
          cookiePolicy={"single_host_origin"}
        />
      </form>
      {isSignIn ? (
        <button
          className="mt-5 text-sm text-indigo-700"
          onClick={() => setIsSignIn(!isSignIn)}
        >
          No Account? Register now.
        </button>
      ) : (
        <button
          className="mt-5 text-sm text-indigo-700"
          onClick={() => setIsSignIn(!isSignIn)}
        >
          Have an account? Sign in.
        </button>
      )}
    </div>
  );
};

export default Auth;