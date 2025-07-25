import { motion } from "framer-motion";
import call from "../assets/call.png";
import ecrou from "../assets/ecrou.png";

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.15,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function Call({ step }) {
  const progress = (step / 3) * 100;

  return (
    <section id="plans">
    <div className="content-call">
      <motion.div
        className="content-callfirst"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="txt-firtcall" variants={itemVariants}>
          <p>
            Un parcours clair,
            <br />
            de l'idée
          </p>
        </motion.div>
        <motion.div className="img-call" variants={itemVariants}>
          <img src={call} alt="smartphone" />
        </motion.div>
        <motion.div className="txt-secondcall" variants={itemVariants}>
          <p>à la mise en ligne.</p>
        </motion.div>
        <motion.div className="content-push-scroll" variants={itemVariants}>
          <img src={ecrou} alt="" />
        </motion.div>
      </motion.div>

      <div className="content-callsecond">
        <div className="one">
          <p>1</p>
        </div>
        <h2>Exploration (Call #1)</h2>
        <p>
          Écoute active → définition de vos objectifs et <br /> contraintes
          techniques.
        </p>
        <div className="scroll-horizon">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
    </section>
  );
}

export default Call;
