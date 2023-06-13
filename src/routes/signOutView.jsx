import AuthProvider from "../components/authProvider";
import { useNavigate } from "react-router-dom";
import { logOut } from "../firebase/firebase";

export default function signOutView() {
  const navigate = useNavigate();

  async function handleUserLoggedIn(user) {
    await logOut();
  }

  function handleUserNotRegistered(user) {
    navigate("/login");
  }
  // if user is not logged in, go to login
  function handleUserNotLoggedIn() {
    navigate("/login");
  }

  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotLoggedIn={handleUserNotLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
    ></AuthProvider>
  );
}
