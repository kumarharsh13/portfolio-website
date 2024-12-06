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
			<h1>Certificates</h1>
      <Marquee
        speed={120}
        pauseOnHover={true}
        direction="right"
        autoFill={true}
      >
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
    <div className={styles.certificateCard}>
      <div className={styles.content}>
        <img src={imageSrc} alt={certificate.certificateTitle} />
        <div className={styles.certificateInfo}>
          <h4>{certificate.certificateTitle}</h4>
          <h5>{certificate.organisation}</h5>
        </div>
      </div>
    </div>
  );
}
export default CertificateSection;
