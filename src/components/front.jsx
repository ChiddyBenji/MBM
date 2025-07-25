import "../styles/App.scss";
import logo from "../assets/logo.png";
import arrowdown from "../assets/arrowdown.png";

function Front() {
  const title = [
    "Architectes du Web.",
    "Bâtisseurs d'expériences",
    "digitales intemporelles.",
  ];
  const p = [
    "Nous concevons des sites web qui visent l’excellence —",
    " pas le superflu.",
  ];

  const scrollToNextSection = () => {
    const nextSection = document.querySelector(".content-description");
    if (nextSection) {
      window.scrollTo({
        top: nextSection.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="who">
    <div className="content-front">
      <div className="content-logo-front">
        <img src={logo} alt="Logo de l'entreprise" />
      </div>
      <div className="content-title-front">
        <h1>
          {title.map((line, index) => (
            <span key={index}>
              {line}
              {index !== title.length - 1 && <br />}
            </span>
          ))}
        </h1>
        <p>
          {p[0]} <span className="grey-text">{p[1]}</span>
        </p>
      </div>
      <div className="content-arrow-front">
        <img
          src={arrowdown}
          alt="Flèche vers le bas"
          onClick={scrollToNextSection}
        />
      </div>
    </div>
    </section>
  );
}

export default Front;
