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

function Step2({ step }) {
  const progress = (step / 3) * 100;

  return (
    <div className="content-call">
      <motion.div
        className="content-callfirst"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="txt-firtcall" variants={itemVariants}>
          <p>
            Une vision structurée,
            <br />
            du design
          </p>
        </motion.div>
        <motion.div className="img-call" variants={itemVariants}>
          <img src={call} alt="smartphone" />
        </motion.div>
        <motion.div className="txt-secondcall" variants={itemVariants}>
          <p>à la maquette interactive.</p>
        </motion.div>
        <motion.div className="content-push-scroll" variants={itemVariants}>
          <img src={ecrou} alt="" />
        </motion.div>
      </motion.div>

      <div className="content-callsecond">
        <div className="one">
          <p>2</p>
        </div>
        <h2>Conception (Call #2)</h2>
        <p>
          Wireframes, maquettes UI et logique utilisateur <br /> pour vos
          futures interfaces.
        </p>
        <div className="scroll-horizon">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
}

export default Step2;
