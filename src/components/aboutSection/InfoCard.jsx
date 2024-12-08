import PropTypes from "prop-types";
import { motion } from "framer-motion";
import styles from "../aboutSection/InfoCard.module.css";
import yabxLogo from "../../resources/icons/yabx.svg";
import comvivaLogo from "../../resources/icons/comviva.png";
import nitrrLogo from "../../resources/icons/nitrr.png";
import maismLogo from "../../resources/icons/maism.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

const logos = {
  "yabx.svg": yabxLogo,
  "comviva.png": comvivaLogo,
  "nitrr.png": nitrrLogo,
  "maism.png": maismLogo
};

InfoCard.propTypes = {
  infoCardDetails: PropTypes.array.isRequired,
  infoImage: PropTypes.string.isRequired,
  flexDirection: PropTypes.string,
};

function InfoCard({ infoCardDetails, infoImage, flexDirection = "row" }) {
  return (
    <div
      className={styles.infoCard}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: flexDirection,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div className={styles.imageContainer}>
      <motion.img
            src={infoImage}
            alt="Info visual representation"
            className={styles.yogaManImage}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            whileInView={{
              y: [0, -20, 0],
              transition: {
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
              },
            }}
          />
      </div>
      <div className={styles.infoContainer}>
        {infoCardDetails.map((info, index) => (
          <DataCard key={index} info={info} />
        ))}
      </div>
    </div>
  );
}

function DataCard({ info }) {
  const logoSrc = logos[info.logo] || null

  return (
    <div className={styles.dataCard}>
      <img src={logoSrc} alt={info.company || info.institution} className={styles.logo} />
      <div className={styles.details}>
        <h2>{info.jobTitle || info.degree}</h2>
        <h4 className={styles.companyTenure}>
          <span>{info.company || info.institution}</span>
          <span>
            {info.startDate} - {info.endDate}
          </span>
        </h4>
        <p className={styles.description}>
          {/* Proper rendering of location with the icon */}
          {info.location ? (
            <>
              <FontAwesomeIcon icon={faLocationDot} className={styles.locationIcon} />&nbsp;
              {info.location}
            </>
          ) : (
            info.description
          )}
        </p>
      </div>
    </div>
  );
}

export default InfoCard;
