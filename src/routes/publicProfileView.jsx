import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PublicLink from "../components/publicLink.jsx";
import {
  existsUsername,
  getProfilePhotoUrl,
  getUserPublicProfileInfo,
} from "../firebase/firebase";

export default function PublicProfileView() {
  const params = useParams(); // get data from URL
  const [profile, setProfile] = useState(null);
  const [url, setUrl] = useState("");
  const [state, setState] = useState(0);

  useEffect(() => {
    getProfile();

    async function getProfile() {
      const username = params.username; // get username from URL

      const userUid = await existsUsername(username);

      if (userUid) {
        const userInfo = await getUserPublicProfileInfo(userUid);
        setProfile(userInfo);

        const url = await getProfilePhotoUrl(
          userInfo.profileInfo.profilePicture
        );
        setUrl(url);
      } else {
        setState(7);
      }
    }
  }, [params]);

  if (state === 7) {
    return (
      <div>
        <h1>Usuario no existe</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="profileTitle">{profile?.profileInfo.username}</h2>
      <div>
        <img src={url} alt="Profile Picture" className="profilePic" />
      </div>
      <h3 className="profileTitle">{profile?.profileInfo.displayName}</h3>
      <div>
        {profile?.linksInfo.map((link) => (
          <PublicLink key={link.docId} url={link.url} title={link.title} />
        ))}
      </div>
    </div>
  );
}
