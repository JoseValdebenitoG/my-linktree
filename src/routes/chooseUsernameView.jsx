import { useState } from "react";
import AuthProvider from "../components/authProvider";
import { useNavigate } from "react-router-dom";
import { existsUsername, updateUser } from "../firebase/firebase";
import "../styles/chooseUsernameView.css";

export default function chooseUsernameView() {
  const navigate = useNavigate();
  const [state, setState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [username, setUsername] = useState("");

  // functions to manage if the user is authenticated
  // @param {user}
  //if user is registered an logged in, go to dashboard
  function handleUserLoggedIn(user) {
    navigate("/dashboard");
  }
  // if user is not registered, go to choose username
  //add user to currentUser
  function handleUserNotRegistered(user) {
    setCurrentUser(user);
    setState(3);
  }
  // if user is not logged in, go to login
  function handleUserNotLoggedIn() {
    navigate("/login");
  }
  // capture input data and send
  function handleInputUsername(e) {
    const username = e.target.value;
    const lowerUsername = username.toLowerCase();
    setUsername(lowerUsername);
  }

  // verifing if the username already exists
  async function handleContinue() {
    if (username !== "") {
      const exists = await existsUsername(username);
      if (exists) {
        setState(5);
      } else {
        // if not exists, update the user and go to the next step
        // @param {user}
        const tmp = { ...currentUser };
        tmp.username = username;
        tmp.processCompleted = true;
        await updateUser(tmp);
        setState(6);
      }
    }
  }

  // render page depending state, 3 if login without register, 5 if username already exists
  // @param {user}
  if (state === 3 || state === 5) {
    return (
      <div className="container">
        <h1>Bienvenido {currentUser.displayName} !</h1>
        <section className="chooseWrapper">
          <p>Para terminar el proceso elige un nombre de usuario</p>
          {state === 5 ? <p>El nombre de usuario ya existe</p> : null}
          <input
            type="text"
            onInput={handleInputUsername}
            className="chooseUsrInput"
          />
          <button className="chooseUsrBtn" onClick={handleContinue}>
            Continuar <i className="material-icons">chevron_right</i>
          </button>
        </section>
      </div>
    );
  }
  function goDashBoard() {
    window.location.href = "/dashboard";
  }

  // render page depending state, 6 if username saved
  if (state === 6) {
    return (
      <div className="container">
        <h1>Felicidades {currentUser.displayName}</h1>
        <p className="chooseTextWelcome">
          Tu nombre de usuario ha sido guardado, ya puedes agregar tus links
        </p>
        <div>
          <button onClick={goDashBoard} className="chooseUsrBtn">
            Continuar <i className="material-icons">chevron_right</i>
          </button>
        </div>
      </div>
    );
  }

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
