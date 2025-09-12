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

  const [formData, setFormData] = useState({
    nom1: "",
    besoin1: "",
    besoin2: "",
    entreprise: "",
    deja: dejaItems.reduce((acc, item) => {
      acc[item.id] = item.checked;
      return acc;
    }, {}),
    budget: "",
    delai: "",
    contactMoyen: "",
    email: "",
    nom2: "",
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

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
    return () => el && observer.unobserve(el);
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
    return () => el && observer.unobserve(el);
  }, []);

  useEffect(() => {
    const onResize = () => {
      const isDesktop = window.matchMedia("(min-width: 577px)").matches;
      if (isDesktop) {
        // force l'état "visible" quand on repasse en desktop
        setFadeLeft(true);
        setFadeRight(true);
      }
    };

    // run une fois au mount (utile si on charge direct en desktop)
    onResize();

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (id) => {
    setFormData((prev) => ({
      ...prev,
      deja: {
        ...prev.deja,
        [id]: !prev.deja[id],
      },
    }));
  };

  const validateForm = () => {
    const requiredFields = ["nom1", "email", "nom2"];
    return requiredFields.every((field) => formData[field].trim() !== "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Merci de remplir tous les champs obligatoires.");
      return;
    }

    const checkedItems = Object.entries(formData.deja)
      .filter(([_, val]) => val)
      .map(([key]) => `- ${dejaItems.find((item) => item.id === key)?.label}`)
      .join("\n");

    const body = `Bonjour MB Studio,\n\nJe m'appelle ${formData.nom1}. Je vous contacte parce que j’ai besoin de ${formData.besoin1} et ${formData.besoin2} pour ${formData.entreprise}.\n\nJ’ai déjà :\n${checkedItems}\n\nMon budget est de ${formData.budget}, et j’aimerais lancer le projet dans ${formData.delai}.\nVous pouvez me contacter par ${formData.contactMoyen} à ${formData.email}.\n\nÀ bientôt, ${formData.nom2}.`;

    window.open(
      `mailto:mbstudio@gmail.com?subject=Demande de projet MB Studio&body=${encodeURIComponent(
        body
      )}`,
      "_blank"
    );

    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 2000);
  };

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
              <br className="br-desktop" />
              <span>
                quelques lignes ____ , nous revenons vers vous avec une
              </span>{" "}
              <br className="br-desktop" />
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
                bonjour@mbstudio.com <br className="br-desktop" />
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
          <form className="email-template" onSubmit={handleSubmit}>
            <p>Bonjour MB Studio,</p>

            <p>
              Je m’appelle <span className="paren">(</span>
              <input
                type="text"
                name="nom1"
                size="6"
                placeholder=" votre nom "
                value={formData.nom1}
                onChange={handleInputChange}
                required
              />
              <span className="paren">)</span> Je vous contacte parce que j’ai
              besoin de <br className="br-desktop" />{" "}
              <span className="paren">(</span>
              <input
                type="text"
                name="besoin1"
                size="16"
                placeholder=" designer et développeur"
                value={formData.besoin1}
                onChange={handleInputChange}
              />
              <span className="paren">)</span> et{" "}
              <span className="paren">(</span>
              <input
                type="text"
                name="besoin2"
                size="8"
                placeholder=" e-commerce"
                value={formData.besoin2}
                onChange={handleInputChange}
              />
              <span className="paren">)</span> pour{" "}
              <br className="br-desktop" /> <span className="paren">(</span>
              <input
                type="text"
                name="entreprise"
                size="24"
                placeholder=" mon entreprise de vente de fixie gear en ligne "
                value={formData.entreprise}
                onChange={handleInputChange}
              />
              <span className="paren">)</span>
            </p>

            <div className="content-radio-list">
              <p>J’ai déjà :</p>
              <ul className="radio-list">
                {dejaItems.map((item) => (
                  <li key={item.id}>
                    <label className="radio-item">
                      <span className="paren">(</span>
                      <input
                        type="checkbox"
                        name={item.id}
                        checked={formData.deja[item.id]}
                        onChange={() => handleCheckboxChange(item.id)}
                      />
                      <span className="custom-radio" />
                      <span className="radio-label">{item.label}</span>
                      <span className="paren">)</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <p>
              Mon budget est de <span className="paren">(</span>
              <input
                type="text"
                name="budget"
                size="11"
                placeholder="EUR 2500-5000"
                value={formData.budget}
                onChange={handleInputChange}
              />
              <span className="paren">)</span> et j’aimerais lancer le{" "}
              <br className="br-desktop" /> projet dans{" "}
              <span className="paren">(</span>
              <input
                type="text"
                name="delai"
                size="6"
                placeholder="2 à 6 mois"
                value={formData.delai}
                onChange={handleInputChange}
              />
              <span className="paren">)</span> <br className="br-desktop" />{" "}
              Vous pouvez me contacter par <span className="paren">(</span>
              <input
                type="text"
                name="contactMoyen"
                size="3"
                placeholder="email"
                value={formData.contactMoyen}
                onChange={handleInputChange}
              />
              <span className="paren">)</span> à <br className="br-desktop" />{" "}
              <span className="paren">(</span>
              <input
                type="email"
                name="email"
                size="16"
                placeholder="votremail@domaine.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <span className="paren">)</span>
            </p>

            <p>
              À bientôt, <span className="paren">(</span>
              <input
                type="text"
                name="nom2"
                size="6"
                placeholder="votre nom"
                value={formData.nom2}
                onChange={handleInputChange}
                required
              />
              <span className="paren">)</span>
            </p>

            <button type="submit">Envoyer</button>

            {showConfirmation && (
              <p
                className="confirmation-message"
                style={{
                  color: "#2ecc71",
                  animation: "fadeInUp 0.4s ease-in-out",
                  transition: "opacity 0.4s ease, transform 0.4s ease",
                }}
              >
                Votre message est prêt à être envoyé via votre messagerie.
              </p>
            )}
          </form>
        </section>
      </div>
    </section>
  );
}

export default Form;
