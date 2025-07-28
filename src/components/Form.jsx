import { useEffect, useRef, useState } from "react";

function Form() {
  const socialLinks = [
    { name: "Instagram", url: "https://www.instagram.com" },
    { name: "X", url: "https://twitter.com" },
    { name: "Behance", url: "https://www.behance.net" },
    { name: "Linkedin", url: "https://www.linkedin.com" },
  ];

  const dejaItems = [
    { id: "logo", label: "un logo", checked: true },
    { id: "identite", label: "une identité visuelle", checked: false },
    { id: "photos", label: "des photos", checked: true },
    { id: "public", label: "un public cible défini", checked: false },
    { id: "brief", label: "un brief clair", checked: false },
  ];

  const leftRef = useRef(null);
  const rightRef = useRef(null);

  const [fadeLeft, setFadeLeft] = useState(false);
  const [fadeRight, setFadeRight] = useState(false);

  useEffect(() => {
    const el = leftRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setFadeLeft(true);
      },
      { threshold: 0.4 }
    );
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  useEffect(() => {
    const el = rightRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setFadeRight(true);
      },
      { threshold: 0.4 }
    );
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <section id="form">
      <div className="content-form">
        <div
          className={`form-one ${fadeLeft ? "fade-left" : ""}`}
          ref={leftRef}
        >
          <div className="content-project">
            <h2>Parlez-nous de votre projet.</h2>
            <p>
              <span>Pas de formulaire générique. Décrivez votre besoin en</span>{" "}
              <br />
              <span>quelques lignes, nous revenons vers vous avec une</span>{" "}
              <br />
              <span>proposition concrète.</span>
            </p>
          </div>

          <div className="content-disponiblite">
            <div className="disponiblite">
              <p>Prochaine disponiblité</p>
              <h3>Août 2025</h3>
            </div>

            <div className="us-contact">
              <p>Nous contacter</p>
              <h3>
                bonjour@mbstudio.com <br />
                [+33] 6 54 32 11 96
              </h3>
            </div>

            <div className="us-social">
              <p>Nos réseaux</p>
              <ul>
                {socialLinks.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {social.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <section
          className={`form-two ${fadeRight ? "fade-right" : ""}`}
          ref={rightRef}
        >
          <form className="email-template" onSubmit={(e) => e.preventDefault()}>
            <p>Bonjour MB Studio,</p>

            <p>
              Je m’appelle (
              <input type="text" size="6" placeholder=" votre nom " required />
              ). Je vous contacte parce que j’ai besoin de <br /> (
              <input
                type="text"
                size="16"
                placeholder=" designer et développeur"
              />
              ) et (
              <input type="text" size="8" placeholder=" e-commerce" />) pour{" "}
              <br />
              (
              <input
                type="text"
                size="24"
                placeholder=" mon entreprise de vente de fixie gear en ligne "
              />
              ).
            </p>
            <div className="content-radio-list">
              <p>J’ai déjà :</p>
              <ul className="radio-list">
                {dejaItems.map((item) => (
                  <li key={item.id}>
                    <label className="radio-item">
                      (
                      <input
                        type="checkbox"
                        name={item.id}
                        defaultChecked={item.checked}
                      />
                      <span className="custom-radio" />
                      <span className="radio-label">{item.label}</span>)
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <p>
              Mon budget est de (
              <input type="text" size="11" placeholder="EUR 2500-5000" />
              ), et j’aimerais lancer le <br /> projet dans (
              <input type="text" size="6" placeholder="2 à 6 mois" />
              ). <br /> Vous pouvez me contacter par (
              <input type="text" size="3" placeholder="email" />) à <br />
              (
              <input
                type="email"
                size="16"
                placeholder="votremail@domaine.com"
                required
              />
              ).
            </p>

            <p>
              À bientôt, (
              <input type="text" size="6" placeholder="votre nom" required />
              ).
            </p>
          </form>
        </section>
      </div>
    </section>
  );
}

export default Form;
