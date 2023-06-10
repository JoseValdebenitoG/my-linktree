import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/authProvider";
import DashboardWrapper from "../components/dashboardWrapper";
import { v4 as uuidv4 } from "uuid";
import { getLinks, insertNewLink } from "../firebase/firebase";
import Link from "../components/link";

export default function dashboardView() {
  const navigate = useNavigate();
  const [state, setState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState([]);

  // if user is registerded, set current user
  async function handleUserLoggedIn(user) {
    setCurrentUser(user);
    setState(2);
    const resLinks = await getLinks(user.uid);
    setLinks([...resLinks]);
  }
  // if user is not registered, go to login
  function handleUserNotRegistered(user) {
    navigate("/login");
  }
  // if user is not logged in, go to login
  function handleUserNotLoggedIn() {
    navigate("/login");
  }

  function handleOnSubmit(event) {
    event.preventDefault();
    addLink();
  }

  function addLink() {
    if (title !== "" && url !== "") {
      // create new link
      // for id, install uuid on project
      // and import v4 as uuidv4 from uuid and add to id as a function
      const newLink = {
        id: uuidv4(),
        title: title,
        url: url,
        uid: currentUser.uid,
      };
      // add new link to database
      const res = insertNewLink(newLink);
      newLink.docId = res.id;
      setTitle("");
      setUrl("");
      setLinks([...links, newLink]);
    }
  }

  function handleOnChange(event) {
    const value = event.target.value;
    if (event.target.name === "title") {
      setTitle(value);
    }

    if (event.target.name === "url") {
      setUrl(value);
    }
  }

  // TODO
  function handleDeleteLink(docId) {}

  // TODO
  function handleUpdateLink(docId) {}

  if (state === 0) {
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

  return (
    <DashboardWrapper>
      <div>
        <h1>Dashboard</h1>
      </div>
      <form action="" onSubmit={handleOnSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" onChange={handleOnChange} />

        <label htmlFor="url">Url</label>
        <input type="text" name="url" id="url" onChange={handleOnChange} />

        <input type="submit" value="Crear nuevo Link" />
      </form>

      <div>
        <h2>Mis Links</h2>
        {links.map((link) => (
          <Link
            key={link.docId}
            url={link.url}
            title={link.title}
            onDelete={handleDeleteLink}
            onUpdate={handleUpdateLink}
          />
        ))}
      </div>
    </DashboardWrapper>
  );
}
