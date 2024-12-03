import PropTypes from "prop-types";

import Yoga from "../../resources/images/Yoga.png";
import styles from "../aboutSection/InfoCard.module.css";

InfoCard.propTypes = {
  flexDirection: PropTypes.string,
};

function InfoCard({ infoCardDetails, flexDirection = "row" }) {
  return (
    <div
      className={styles.infoCard}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: flexDirection,
      }}
    >
      <div className={styles.imageContainer}>
        <img src={Yoga} />
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
  return (
    <div className={styles.dataCard}>
      <img src={Yoga} alt="Yoga" className={styles.logo} />
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
