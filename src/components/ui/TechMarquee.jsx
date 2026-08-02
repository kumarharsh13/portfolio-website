import styles from "./TechMarquee.module.css";

const STACK = [
  "Ruby on Rails",
  "Node.js",
  "Express",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "RabbitMQ",
  "JavaScript",
  "Python",
  "Git",
  "Github",
  "Sidekiq",
  "Postman",
];

export default function TechMarquee() {
  const items = [...STACK, ...STACK];
  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.track}>
        {items.map((t, i) => (
          <span className={styles.item} key={i}>
            {t}
            <span className={styles.dot}>•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
