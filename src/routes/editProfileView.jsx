import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DashboardWrapper from "../components/dashboardWrapper";
import AuthProvider from "../components/authProvider";
import {
  getProfilePhotoUrl,
  setUserProfilePhoto,
  updateUser,
} from "../firebase/firebase";

export default function EditProfileView() {
  const navigate = useNavigate();
  const [state, setState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [profileUrl, setProfileUrl] = useState(null);
  const fileRef = useRef();

  async function handleUserLoggedIn(user) {
    setCurrentUser(user);
    const url = await getProfilePhotoUrl(user.profilePicture);
    setProfileUrl(url);
    setState(2);
  }
  // if user is not registered, go to login
  function handleUserNotRegistered(user) {
    navigate("/login");
  }
  // if user is not logged in, go to login
  function handleUserNotLoggedIn() {
    navigate("/login");
  }

  function handleOpenFilePicker() {
    fileRef.current ? fileRef.current.click() : null;
  }

  function handleChangeFile(e) {
    // add file to send firegase
    const files = e.target.files;
    const fileReader = new FileReader(); // change file to byte arrays

    if (fileReader && files && files.length > 0) {
      fileReader.readAsArrayBuffer(files[0]);
      fileReader.onload = async function () {
        const imageData = fileReader.result;

        // send file to firebase
        const res = await setUserProfilePhoto(currentUser.uid, imageData);

        // update user with new profile photo
        if (res) {
          const tmpUser = { ...currentUser };
          console.log("usuario temporal " + tmpUser);

          tmpUser.profilePicture = res.metadata.fullPath;
          await updateUser(tmpUser);
          setCurrentUser({ ...tmpUser });
          // get url of new profile photo
          const url = await getProfilePhotoUrl(currentUser.profilePicture);
          console.log("url " + url);
          setProfileUrl(url);
        }
      };
    }
  }

  if (state !== 2) {
    return (
      <AuthProvider
        onUserLoggedIn={handleUserLoggedIn}
        onUserNotLoggedIn={handleUserNotLoggedIn}
        onUserNotRegistered={handleUserNotRegistered}
      >
        <h2>Loading...</h2>
      </AuthProvider>
    );
  }

  return (
    <DashboardWrapper>
      <div>
        <h2>Edit Profile Info</h2>
        <div>
          <div>
            <img src={profileUrl} alt="" width={100} />
          </div>
          <div>
            <button onClick={handleOpenFilePicker}>
              Elije una imagen para tu perfil
            </button>
            <input
              type="file"
              ref={fileRef}
              style={{ display: "none" }}
              onChange={handleChangeFile}
            />
          </div>
        </div>
      </div>
    </DashboardWrapper>
  );
}
