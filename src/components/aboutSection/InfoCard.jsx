import PropTypes from 'prop-types';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import styles from './InfoCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import yabxLogo from '../../resources/icons/yabx.svg';
import comvivaLogo from '../../resources/icons/comviva.png';
import nitrrLogo from '../../resources/icons/nitrr.png';
import maismLogo from '../../resources/icons/maism.png';

const logos = {
  'yabx.svg': yabxLogo,
  'comviva.png': comvivaLogo,
  'nitrr.png': nitrrLogo,
  'maism.png': maismLogo,
};

function TiltCard({ info }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useTransform(ry, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(rx, [-0.5, 0.5], ['-8deg', '8deg']);

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    rx.set((e.clientX - rect.left) / rect.width - 0.5);
    ry.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  const logoSrc = logos[info.logo] || null;

  return (
    <motion.div
      className={styles.card}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {logoSrc && <img src={logoSrc} alt={info.company || info.institution} className={styles.logo} />}
      <h2 className={styles.title}>{info.jobTitle || info.degree}</h2>
      <h4 className={styles.meta}>
        <span>{info.company || info.institution}</span>
        <span>{info.startDate} - {info.endDate}</span>
      </h4>
      <p className={styles.desc}>
        {info.location ? (
          <><FontAwesomeIcon icon={faLocationDot} className={styles.locIcon} />&nbsp;{info.location}</>
        ) : info.description}
      </p>
    </motion.div>
  );
}

TiltCard.propTypes = {
  info: PropTypes.object.isRequired,
};

function InfoCard({ title, items }) {
  return (
    <div className={styles.group}>
      <h3 className={styles.groupTitle}>{title}</h3>
      <div className={styles.stack}>
        {items.map((info, i) => <TiltCard key={i} info={info} />)}
      </div>
    </div>
  );
}

InfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};

export default InfoCard;
