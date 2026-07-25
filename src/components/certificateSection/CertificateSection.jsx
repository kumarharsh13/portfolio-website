import styles from "../certificateSection/CertificateSection.module.css";
import Marquee from "react-fast-marquee";

import certificates from "../../resources/data/certificates.json";
import Css from "../../resources/certificates/CSS.png";
import HtmlCss from "../../resources/certificates/HTMLCSS.png";
import InterPerCom from "../../resources/certificates/InterpersonalCommunication.png";
import JavaScript from "../../resources/certificates/JavaScript.png";
import Linux from "../../resources/certificates/Linux.png";
import PersonalBranding from "../../resources/certificates/PersonalBranding.png";
import ProblemSolving from "../../resources/certificates/ProblemSolving.png";
import PythonHackRank from "../../resources/certificates/PythonHackerRank.png";
import PythonLinkedIn from "../../resources/certificates/PythonLinkedIn.png";
import SoftwareIntern from "../../resources/certificates/SoftwareEngineerIntern.png";
import Sql from "../../resources/certificates/SQL.png";
import Yabx1 from "../../resources/certificates/Yabx1.png";

const images = {
  "Yabx1.png": Yabx1,
  "CSS.png": Css,
  "HTMLCSS.png": HtmlCss,
  "InterpersonalCommunication.png": InterPerCom,
  "JavaScript.png": JavaScript,
  "Linux.png": Linux,
  "PersonalBranding.png": PersonalBranding,
  "ProblemSolving.png": ProblemSolving,
  "PythonHackerRank.png": PythonHackRank,
  "PythonLinkedIn.png": PythonLinkedIn,
  "SoftwareEngineerIntern.png": SoftwareIntern,
  "SQL.png": Sql,
};

function CertificateSection() {
  return (
    <div className={styles.certificateSection} id="certificates">
      <h1 className={styles.heading}>Certificates</h1>
      <Marquee speed={60} pauseOnHover direction="right" autoFill>
        {certificates.map((certificate, index) => (
          <DataCard certificate={certificate} key={index} />
        ))}
      </Marquee>
    </div>
  );
}

function DataCard({ certificate }) {
  const imageSrc = images[certificate.certificateImage] || null;
  return (
    <div className={styles.card}>
      <img src={imageSrc} alt={certificate.certificateTitle} className={styles.thumb} />
      <div className={styles.info}>
        <h4 className={styles.title}>{certificate.certificateTitle}</h4>
        <h5 className={styles.org}>{certificate.organisation}</h5>
      </div>
    </div>
  );
}
export default CertificateSection;
