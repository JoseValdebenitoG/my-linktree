import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/authProvider";
import "../styles/loginView.css";

export default function LoginView() {
  const navigate = useNavigate();
  // manage the user state
  const [state, setCurrentState] = useState(0);
  /**
   * State to handle the current user
   * 0: initializing
   * 1: loading
   * 2: login Complete
   * 3: login but without register
   * 4: no user logged in
   * 5: username already exists
   * 6: new username, click to continue
   * 7: username no existe
   */

  // event click on button to register with google
  async function handleOnClick() {
    const googleProvider = new GoogleAuthProvider();
    await signInWithGoogle(googleProvider);

    // function to sign in with google on popup window
    // @param {GoogleAuthProvider}
    async function signInWithGoogle(googleProvider) {
      try {
        const res = await signInWithPopup(auth, googleProvider);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  }

  // functions to manage if the user is authenticated
  // @param {user}
  function handleUserLoggedIn(user) {
    navigate("/dashboard");
  }

  function handleUserNotRegistered(user) {
    navigate("/choose-username");
  }

  function handleUserNotLoggedIn() {
    setCurrentState(4);
  }

  // return components according to the state
  if (state === 4) {
    return (
      <div className="loginContainer">
        <div>
          <h1>My Link Tree</h1>
        </div>
        <button className="loginBtn" onClick={handleOnClick}>
          <i className="material-icons" id="google-icon">
            Google
          </i>
          Login with Google
        </button>
      </div>
    );
  }

  // send state of user to AuthProvider
  // @param {user}
  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
      onUserNotLoggedIn={handleUserNotLoggedIn}
    >
      <h2>Loading...</h2>
    </AuthProvider>
  );
}
