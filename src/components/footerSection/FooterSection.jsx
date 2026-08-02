import { useState } from "react";
import styles from "../footerSection/FooterSection.module.css";
import Magnetic from "../ui/Magnetic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faHeart, faCopy, faCheck, faDownload } from "@fortawesome/free-solid-svg-icons";
import Resume from "../../resources/resume/Harsh Kumar Resume.pdf";

const EMAIL = "kr.harsh13@gmail.com";

function FooterSection() {
  const [status, setStatus] = useState("idle"); // idle | success
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const name = data.get("name");
    const email = data.get("email");
    const message = data.get("message");
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    // Opens the visitor's mail client with everything pre-filled — no backend needed.
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setStatus("success");
    e.target.reset();
  };

  return (
    <div className={styles.footerSection}>
      <span className={styles.badge}><span className={styles.dot} /> Open to opportunities</span>
      <h1>Let&apos;s Connect</h1>
      <p className={styles.subtitle}>
        Have a role, project, or idea in mind? Drop me a message — I&apos;ll get back to you.
      </p>

      {status === "success" ? (
        <div className={styles.success}>
          <FontAwesomeIcon icon={faCheck} /> Opening your mail app… if nothing happens, email me at {EMAIL}.
        </div>
      ) : (
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.row}>
            <input className={styles.input} type="text" name="name" placeholder="Your name" required />
            <input className={styles.input} type="email" name="email" placeholder="Your email" required />
          </div>
          <textarea className={styles.textarea} name="message" placeholder="Your message" rows={4} required />
          <Magnetic strength={0.25} style={{ display: 'block', width: '100%' }}>
            <button className={styles.submit} type="submit" style={{ width: '100%' }}>Send Message</button>
          </Magnetic>
        </form>
      )}

      <div className={styles.actions}>
        <a href={Resume} download="Harsh Kumar Resume.pdf" className={styles.resumeBtn}>
          <FontAwesomeIcon icon={faDownload} /> Download Résumé
        </a>
        <button className={styles.copyBtn} onClick={copyEmail}>
          <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
          {copied ? "Copied!" : EMAIL}
        </button>
      </div>

      <div className={styles.socialMedia}>
        <a href={`mailto:${EMAIL}`} aria-label="Email"><FontAwesomeIcon icon={faEnvelope} /></a>
        <a href="https://in.linkedin.com/in/kumarharsh13" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FontAwesomeIcon icon={faLinkedinIn} /></a>
        <a href="https://github.com/kumarharsh13" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FontAwesomeIcon icon={faGithub} /></a>
      </div>

      <div className={styles.createdBy}>
        Crafted with <FontAwesomeIcon icon={faHeart} className={styles.heartIcon} /> by Harsh Kumar
      </div>
      <div className={styles.copyright}>All rights reserved © 2026</div>
    </div>
  );
}

export default FooterSection;
