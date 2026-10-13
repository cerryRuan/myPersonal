import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageTransition, { childVariants } from "../components/PageTransition";
import { profile, avatar } from "../data/content";
import "../styles/home.css";

const stagger = {
  animate: {
    transition: { staggerChildren: 0.1 },
  },
};

export default function Home() {
  return (
    <PageTransition>
      {/* Hero 区域 */}
      <section className="hero">
        <div className="container hero-inner">
          <motion.div
            className="hero-text"
            variants={stagger}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={childVariants} className="hero-greeting">
              <span className="hero-dot"></span>
              你好，我是
            </motion.div>
            <motion.h1 variants={childVariants} className="hero-name">
              <span className="gradient-text">{profile.name}</span>
            </motion.h1>
            <motion.p variants={childVariants} className="hero-name-en">
              {profile.nameEn}
            </motion.p>
            <motion.p variants={childVariants} className="hero-title">
              {profile.title}
            </motion.p>
            <motion.p variants={childVariants} className="hero-tagline">
              {profile.tagline}
            </motion.p>
            <motion.div variants={childVariants} className="hero-actions">
              <Link to="/hobbies" className="btn-primary">
                探索我的世界
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
              <a href={`mailto:${profile.email}`} className="btn-ghost">
                联系我
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-avatar"
            initial={{ opacity: 0, scale: 0.8, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="avatar-ring">
              <img src={avatar} alt={profile.name} className="avatar-img" />
              <div className="avatar-glow"></div>
            </div>
            <motion.div
              className="floating-tag tag-1"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              📷 摄影
            </motion.div>
            <motion.div
              className="floating-tag tag-2"
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              🎵 音乐
            </motion.div>
            <motion.div
              className="floating-tag tag-3"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              💻 代码
            </motion.div>
          </motion.div>
        </div>

        {/* 向下滚动提示 */}
        <motion.div
          className="scroll-hint"
          animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span>向下滚动</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </section>

      {/* 统计数据 */}
      <section className="stats-section">
        <div className="container">
          <motion.div
            className="stats-grid"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
          >
            {profile.stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={childVariants}
                className="stat-card"
              >
                <span className="stat-value gradient-text">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 关于我 */}
      <section className="about-section">
        <div className="container about-inner">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="section-title">
              关于<span className="gradient-text">我</span>
            </h2>
            <p className="about-bio">{profile.bio}</p>
            <div className="about-info">
              <div className="info-item">
                <span className="info-label">所在地</span>
                <span className="info-value">{profile.location}</span>
              </div>
              <div className="info-item">
                <span className="info-label">邮箱</span>
                <span className="info-value">{profile.email}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="about-skills"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="skills-title">技能与兴趣</h3>
            <div className="skills-list">
              {profile.skills.map((skill, i) => (
                <motion.div
                  key={i}
                  className="skill-item"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                >
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-level">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <motion.div
                      className="skill-fill"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1,
                        delay: 0.3 + i * 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            className="cta-card"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="cta-title">
              想了解更多？
              <br />
              来看看我的<span className="gradient-text">兴趣爱好</span>
            </h2>
            <Link to="/hobbies" className="btn-primary cta-btn">
              进入兴趣世界
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="footer">
        <div className="container footer-inner">
          <span className="footer-logo">
            Ruan<span className="logo-dot">.</span>
          </span>
          <div className="footer-socials">
            {profile.socials.map((s) => (
              <a
                key={s.name}
                href={s.url}
                className="footer-social"
                title={s.name}
              >
                {s.name[0]}
              </a>
            ))}
          </div>
          <p className="footer-copy">
            © {new Date().getFullYear()} {profile.name} · 用心创造
          </p>
        </div>
      </footer>
    </PageTransition>
  );
}
