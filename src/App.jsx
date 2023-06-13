import shirtLogo from "/logoCircle.png";
import "./styles/App.css";

function App() {
  function goLogin() {
    window.location.href = "/login";
  }

  return (
    <>
      <div>
        <a href="https://www.github.com/josevaldebenitog" target="_blank">
          <img src={shirtLogo} className="logo" alt="Black shirt logo" />
        </a>
      </div>
      <h1>My Link Tree App</h1>
      <div className="card">
        <button onClick={goLogin}>
          <i className="material-icons">account_box</i>
          <span>Ingresar</span>
        </button>
        <p>Ingresa y manten tus enlaces de redes sociales en un solo lugar.</p>
      </div>
    </>
  );
}

export default App;
