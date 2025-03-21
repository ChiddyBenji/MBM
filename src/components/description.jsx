import "../styles/App.scss";
import Dropdown from "../components/dropdown";

function Description() {
  const txtdescription = [
    "Pourquoi choisir un design",
    "intemporel moderne et efficace ?",
  ];
  const p = [
    "Nous bâtissons les sites web comme des monuments.",
    "Conçus pour durer, s'adapter et rester attractifs.",
  ];

  return (
    <div className="content-description">
      <div className="content-txt-description">
        <h2>
          {txtdescription.map((line, index) => (
            <span key={index}>
              {line}
              {index !== txtdescription.length - 1 && <br />}
            </span>
          ))}
        </h2>
        <p>
          {p.map((line, index) => (
            <span key={index}>
              {line}
              {index !== p.length - 1 && <br />}
            </span>
          ))}
        </p>
      </div>
      <div className="content-dropdown-description">
        <div className="content-dropdown">
            <Dropdown />
        </div>
      </div>
    </div>
  );
}

export default Description;
