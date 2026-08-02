import { useState } from 'react';
import PropTypes from 'prop-types';
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

const MONTHS = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };

// Turn "Aug-2023" / "Present" into a Date, then produce a human duration string.
function parseDate(d) {
  if (d === 'Present') return new Date();
  const [m, y] = d.split('-');
  return new Date(Number(y), MONTHS[m] ?? 0, 1);
}

function formatDuration(start, end) {
  const s = parseDate(start);
  const e = parseDate(end);
  let months = (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());
  months = Math.max(months, 0) + 1; // inclusive of the current month
  const y = Math.floor(months / 12);
  const mo = months % 12;
  const parts = [];
  if (y) parts.push(`${y} yr${y > 1 ? 's' : ''}`);
  if (mo) parts.push(`${mo} mo`);
  return parts.join(' ') || '1 mo';
}

function RoleRow({ role, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={styles.role}>
      <button className={styles.roleHead} onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span className={styles.roleTitle}>
          {role.jobTitle}
          {role.org && <span className={styles.roleOrg}>{role.org}</span>}
        </span>
        <span className={styles.roleRight}>
          <span className={styles.roleDates}>{role.startDate} – {role.endDate}</span>
          <span className={`${styles.chev} ${open ? styles.chevOpen : ''}`}>⌄</span>
        </span>
      </button>
      {open && (
        <ul className={styles.points}>
          {role.points.map((p, j) => <li key={j}>{p}</li>)}
        </ul>
      )}
    </div>
  );
}

RoleRow.propTypes = {
  role: PropTypes.object.isRequired,
  defaultOpen: PropTypes.bool,
};

function Card({ info }) {
  const logoSrc = logos[info.logo] || null;

  return (
    <div className={styles.card}>
      {info.roles ? (
        // Company group — LinkedIn-style: one company header, multiple roles.
        <>
          <div className={styles.companyHead}>
            {logoSrc && <img src={logoSrc} alt={info.company} className={styles.logo} />}
            <div className={styles.companyMeta}>
              <div className={styles.companyNameRow}>
                <h2 className={styles.title}>{info.company}</h2>
                {info.parent && <span className={styles.parentTag}>part of {info.parent}</span>}
              </div>
              <span className={styles.duration}>{formatDuration(info.startDate, info.endDate)}</span>
            </div>
          </div>
          <div className={styles.roles}>
            {info.roles.map((role, i) => (
              <RoleRow key={i} role={role} defaultOpen />
            ))}
          </div>
        </>
      ) : (
        // Education card.
        <>
          {logoSrc && <img src={logoSrc} alt={info.institution} className={styles.logo} />}
          <h2 className={styles.title}>{info.degree}</h2>
          <h4 className={styles.meta}>
            <span>{info.institution}</span>
            <span className={styles.dates}>{info.startDate} – {info.endDate}</span>
          </h4>
          <p className={styles.desc}>
            {info.location && (
              <><FontAwesomeIcon icon={faLocationDot} className={styles.locIcon} />&nbsp;{info.location}</>
            )}
            {info.score && <span className={styles.score}>{info.score}</span>}
          </p>
        </>
      )}
    </div>
  );
}

Card.propTypes = {
  info: PropTypes.object.isRequired,
};

function InfoCard({ title, items }) {
  return (
    <div className={styles.group}>
      {title && <h3 className={styles.groupTitle}>{title}</h3>}
      <div className={styles.stack}>
        {items.map((info, i) => <Card key={i} info={info} />)}
      </div>
    </div>
  );
}

InfoCard.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array.isRequired,
};

export default InfoCard;
