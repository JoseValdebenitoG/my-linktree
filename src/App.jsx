import shirtLogo from "/logoCircle.png";
import "./styles/App.css";
import { Link, Route } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <div>
        <a href="https://www.github.com/josevaldebenitog" target="_blank">
          <img src={shirtLogo} className="logo" alt="Black shirt logo" />
        </a>
      </div>
      <h1 className="homeTitle">My Link Tree App</h1>
      <Link to="/login">
        <button className="homeEnterBtn">
          <i className="material-icons">account_box</i>
          <span>Ingresar</span>
        </button>
      </Link>
      <section className="homeTextWrapper">
        <p className="homeText">
          Ingresa y manten tus enlaces de redes sociales en un solo lugar.
        </p>
      </section>
    </div>
  );
}

export default App;
