import PropTypes from "prop-types";
import styles from "../aboutSection/InfoCard.module.css";
import yabxLogo from "../../resources/icons/yabx.svg";
import comvivaLogo from "../../resources/icons/comviva.png";
import nitrrLogo from "../../resources/icons/nitrr.png";
import maismLogo from "../../resources/icons/maism.png";

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
        flexDirection: flexDirection, // This makes it dynamic based on prop
        width: "100%", // Ensure it takes full width
        boxSizing: "border-box",
      }}
    >
      <div className={styles.imageContainer}>
        <img src={infoImage} alt="Info visual representation" />
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
        <p>{info.location ? "📍" + info.location : info.description}</p>
      </div>
    </div>
  );
}

export default InfoCard;
