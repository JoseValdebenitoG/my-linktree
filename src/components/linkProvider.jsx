import { useState, useRef, useEffect } from "react";
import "../styles/linkProvider.css";

export default function LinkProvider({
  docId,
  title,
  url,
  onDelete,
  onUpdate,
}) {
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentUrl, setCurrentUrl] = useState(url);
  const [editTitle, setEditTitle] = useState(false);
  const [editUrl, setEditUrl] = useState(false);

  const titleRef = useRef(null);
  const urlRef = useRef(null);

  useEffect(() => {
    titleRef.current ? titleRef.current.focus() : null;
  }, [editTitle]);

  useEffect(() => {
    urlRef.current ? urlRef.current.focus() : null;
  }, [editUrl]);

  function handleEditTitle() {
    setEditTitle(true);
  }

  function handleEditUrl() {
    setEditUrl(true);
  }

  function handleChangeTitle(e) {
    setCurrentTitle(e.target.value);
  }

  function handleChangeUrl(e) {
    setCurrentUrl(e.target.value);
  }

  function handleBlurTitle() {
    setEditTitle(false);
    onUpdate(docId, currentTitle, currentUrl);
  }

  function handleBlurUrl() {
    setEditUrl(false);
    onUpdate(docId, currentTitle, currentUrl);
  }

  function handleDelete() {
    onDelete(docId);
  }

  return (
    <div className="linkCard">
      <div>
        <div className="linkCardTitle">
          {editTitle ? (
            <>
              <input
                ref={titleRef}
                value={currentTitle}
                onChange={handleChangeTitle}
                onBlur={handleBlurTitle}
                type="text"
              />
            </>
          ) : (
            <>
              <button onClick={handleEditTitle}>
                <i className="material-icons">edit</i>
              </button>
              <p className="linkTitle">{currentTitle}</p>
            </>
          )}
        </div>
        <div className="linkCardUrl">
          {editUrl ? (
            <>
              <input
                ref={urlRef}
                value={currentUrl}
                onChange={handleChangeUrl}
                onBlur={handleBlurUrl}
                type="text"
              />
            </>
          ) : (
            <>
              <button onClick={handleEditUrl}>
                <i className="material-icons">edit</i>
              </button>
              <p className="linkUrl">{currentUrl}</p>
            </>
          )}
        </div>
      </div>
      <div>
        <button onClick={handleDelete}>
          <i className="material-icons">delete</i>
        </button>
      </div>
    </div>
  );
}
