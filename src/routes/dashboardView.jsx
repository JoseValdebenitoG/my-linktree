import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/authProvider";
import DashboardWrapper from "../components/dashboardWrapper";
import { v4 as uuidv4 } from "uuid";
import {
  getLinks,
  insertNewLink,
  updateLink,
  deleteLink,
} from "../firebase/firebase";
import LinkProvider from "../components/linkProvider";
import "../styles/dashboardView.css";

export default function dashboardView() {
  const navigate = useNavigate();
  const [state, setState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState([]);

  const formRef = useRef(null);

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
    formRef.current.reset();
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
      setLinks([...links, newLink]);
      setTitle("");
      setUrl("");
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

  async function handleDeleteLink(docId) {
    await deleteLink(docId);
    const newLinks = links.filter((item) => item.docId !== docId);
    setLinks([...newLinks]);
  }

  async function handleUpdateLink(docId, title, url) {
    const link = links.find((item) => item.docId === docId);
    link.title = title;
    link.url = url;
    await updateLink(docId, link);
  }

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
      <div className="dashWrapper">
        <h1 className="dashTitle">Dashboard</h1>

        <form ref={formRef} onSubmit={handleOnSubmit} className="dashForm">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={handleOnChange}
          />

          <label htmlFor="url">Url</label>
          <input type="text" name="url" id="url" onChange={handleOnChange} />

          <input type="submit" value="Crear nuevo Link" />
        </form>

        <div className="linkWrapper">
          <h2 className="linkWrapperTitle">Mis Links</h2>
          {links.map((link) => (
            <LinkProvider
              key={link.id}
              docId={link.docId}
              url={link.url}
              title={link.title}
              onDelete={handleDeleteLink}
              onUpdate={handleUpdateLink}
            />
          ))}
        </div>
      </div>
    </DashboardWrapper>
  );
}
