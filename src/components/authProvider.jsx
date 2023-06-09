import { onAuthStateChanged } from "firebase/auth";
import {
  auth,
  getUserInfo,
  registerNewUser,
  userExists,
} from "../firebase/firebase";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthProvider({
  children,
  onUserLoggedIn,
  onUserNotLoggedIn,
  onUserNotRegistered,
}) {
  const navigate = useNavigate();

  // manage user data and state
  useEffect(() => {
    // check if user is registered
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // check if user is registered
        const isRegistered = await userExists(user.uid);
        if (isRegistered) {
          // if user is registered, send user to dashboard
          const userInfo = await getUserInfo(user.uid);
          if (userInfo.processCompleted) {
            //  redirect to Dashboard
            onUserLoggedIn(userInfo);
          } else {
            // redirect to registration
            onUserNotRegistered(userInfo);
          }
        } else {
          // register user
          await registerNewUser({
            uid: user.uid,
            displayName: user.displayName,
            profilePicture: "",
            username: "",
            processCompleted: false,
          });
          // redirect to Choose username
          onUserNotRegistered(user);
        }
      } else {
        onUserNotLoggedIn(user);
      }
    });
  }, [navigate, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegistered]);

  return <div>{children}</div>;
}
