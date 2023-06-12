import { useState, useRef, useEffect } from "react";
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
    <div key={docId}>
      <div>
        <div>
          {editTitle ? (
            <>
              <input
                ref={titleRef}
                value={currentTitle}
                onChange={handleChangeTitle}
                onBlur={handleBlurTitle}
              />
            </>
          ) : (
            <>
              <button onClick={handleEditTitle}>Edit</button>
              {currentTitle}
            </>
          )}
        </div>
        <div>
          {editUrl ? (
            <>
              <input
                ref={urlRef}
                value={currentUrl}
                onChange={handleChangeUrl}
                onBlur={handleBlurUrl}
              />
            </>
          ) : (
            <>
              <button onClick={handleEditUrl}>Edit</button>
              {currentUrl}
            </>
          )}
        </div>
      </div>
      <div>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}
