import "../styles/publicLink.css";

export default function PublicLink({ url, title }) {
  return (
    <div>
      <a
        className="publicLinkCard animate__animated animate__fadeInUp"
        href={url}
        target="_blank"
      >
        {title}
      </a>
    </div>
  );
}
