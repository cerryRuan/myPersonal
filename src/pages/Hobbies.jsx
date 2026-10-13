import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition, { childVariants } from "../components/PageTransition";
import { videos, photos, music } from "../data/content";
import "../styles/hobbies.css";

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
};

/* ===== 视频卡片组件 ===== */
function VideoCard({ video }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <motion.div
      className="video-card"
      variants={childVariants}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="video-wrapper" onClick={togglePlay}>
        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          preload="metadata"
          onEnded={() => setPlaying(false)}
        />
        <div className={`video-overlay ${playing ? "hidden" : ""}`}>
          <div className="play-button">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="video-info">
        <h3 className="video-title">{video.title}</h3>
        <p className="video-desc">{video.desc}</p>
      </div>
    </motion.div>
  );
}

/* ===== 照片墙组件 ===== */
function PhotoCard({ photo, index, onOpen }) {
  return (
    <motion.div
      className={`photo-card photo-${index % 3}`}
      layoutId={`photo-${index}`}
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: (index % 3) * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -8 }}
      onClick={() => onOpen(index)}
    >
      <div className="photo-img-wrapper">
        <img src={photo.src} alt={photo.title} loading="lazy" />
        <div className="photo-hover">
          <span className="photo-category">{photo.category}</span>
          <span className="photo-zoom-hint">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
            </svg>
          </span>
        </div>
      </div>
      <p className="photo-title">{photo.title}</p>
    </motion.div>
  );
}

/* ===== 照片灯箱 ===== */
function Lightbox({ photos, index, onClose, onNav }) {
  const photo = photos[index];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNav(-1);
      if (e.key === "ArrowRight") onNav(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onNav]);

  return (
    <motion.div
      className="lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button className="lightbox-close" onClick={onClose}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
      <button
        className="lightbox-nav lightbox-prev"
        onClick={(e) => {
          e.stopPropagation();
          onNav(-1);
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <motion.div
        className="lightbox-content"
        key={index}
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <img src={photo.src} alt={photo.title} />
        <div className="lightbox-info">
          <h3>{photo.title}</h3>
          <span>{photo.category}</span>
        </div>
      </motion.div>
      <button
        className="lightbox-nav lightbox-next"
        onClick={(e) => {
          e.stopPropagation();
          onNav(1);
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </motion.div>
  );
}

/* ===== 音乐播放器 ===== */
function MusicPlayer({ tracks }) {
  const audioRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const track = tracks[current];

  const loadTrack = (i) => {
    setCurrent(i);
    setProgress(0);
    setCurrentTime(0);
    // 加载后自动播放
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.load();
        audioRef.current
          .play()
          .then(() => setPlaying(true))
          .catch(() => {});
      }
    }, 50);
  };

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play()
        .then(() => setPlaying(true))
        .catch(() => {});
    } else {
      a.pause();
      setPlaying(false);
    }
  };

  const onTimeUpdate = () => {
    const a = audioRef.current;
    if (!a || !a.duration) return;
    setProgress((a.currentTime / a.duration) * 100);
    setCurrentTime(a.currentTime);
  };

  const onLoaded = () => {
    const a = audioRef.current;
    if (a && a.duration) setDuration(a.duration);
  };

  const seek = (e) => {
    const a = audioRef.current;
    if (!a || !a.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    a.currentTime = pct * a.duration;
    setProgress(pct * 100);
  };

  const fmtTime = (s) => {
    if (!s || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const next = () => loadTrack((current + 1) % tracks.length);
  const prev = () => loadTrack((current - 1 + tracks.length) % tracks.length);

  return (
    <div className="music-player">
      <audio
        ref={audioRef}
        src={track.src}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoaded}
        onEnded={next}
      />
      {/* 当前播放信息 */}
      <div className="now-playing">
        <motion.div
          className="now-playing-cover"
          key={current}
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img src={track.cover} alt={track.title} />
          <div className={`vinyl ${playing ? "spinning" : ""}`}></div>
        </motion.div>
        <div className="now-playing-info">
          <h3 className="now-playing-title">{track.title}</h3>
          <p className="now-playing-artist">{track.artist}</p>
        </div>
      </div>

      {/* 进度条 */}
      <div className="player-progress" onClick={seek}>
        <div
          className="player-progress-fill"
          style={{ width: `${progress}%` }}
        />
        <div
          className="player-progress-handle"
          style={{ left: `${progress}%` }}
        />
      </div>
      <div className="player-time">
        <span>{fmtTime(currentTime)}</span>
        <span>{fmtTime(duration)}</span>
      </div>

      {/* 控制按钮 */}
      <div className="player-controls">
        <button className="player-btn" onClick={prev} title="上一首">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
          </svg>
        </button>
        <button
          className="player-btn player-play"
          onClick={togglePlay}
          title="播放/暂停"
        >
          {playing ? (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6zm8-14v14h4V5z" />
            </svg>
          ) : (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <button className="player-btn" onClick={next} title="下一首">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 18l8.5-6L6 6v12zM16 6h2v12h-2z" />
          </svg>
        </button>
      </div>

      {/* 播放列表 */}
      <div className="playlist">
        <h4 className="playlist-title">播放列表</h4>
        <ul className="playlist-items">
          {tracks.map((t, i) => (
            <li
              key={i}
              className={`playlist-item ${i === current ? "active" : ""}`}
              onClick={() => loadTrack(i)}
            >
              <div className="playlist-item-cover">
                <img src={t.cover} alt={t.title} />
                {i === current && playing && (
                  <div className="playing-bars">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                )}
              </div>
              <div className="playlist-item-info">
                <span className="playlist-item-title">{t.title}</span>
                <span className="playlist-item-artist">{t.artist}</span>
              </div>
              <span className="playlist-item-duration">{t.duration}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ===== Tab 配置 ===== */
const TABS = [
  {
    key: "video",
    label: "视频",
    labelEn: "Video",
    icon: "🎬",
    desc: "用镜头记录流动的时光",
  },
  {
    key: "photo",
    label: "照片墙",
    labelEn: "Photos",
    icon: "📸",
    desc: "定格每一帧值得记住的瞬间",
  },
  {
    key: "music",
    label: "音乐",
    labelEn: "Music",
    icon: "🎵",
    desc: "戴上耳机，进入我的旋律世界",
  },
];

/* ===== 主页面 ===== */
export default function Hobbies() {
  const [activeTab, setActiveTab] = useState("video");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (i) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const navLightbox = (dir) => {
    setLightboxIndex((prev) => {
      if (prev === null) return prev;
      const n = (prev + dir + photos.length) % photos.length;
      return n;
    });
  };

  return (
    <PageTransition>
      {/* 页面标题 */}
      <section className="hobbies-hero">
        <div className="container">
          <motion.div variants={stagger} initial="initial" animate="animate">
            <motion.p variants={childVariants} className="section-eyebrow">
              My Hobbies & Interests
            </motion.p>
            <motion.h1 variants={childVariants} className="hobbies-title">
              我的<span className="gradient-text">兴趣世界</span>
            </motion.h1>
            <motion.p variants={childVariants} className="hobbies-subtitle">
              影像、旋律、光影——这些是我与世界对话的方式
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Tab 导航 */}
      <section className="tabs-section">
        <div className="container">
          <div className="tabs-bar">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                className={`tab-item ${activeTab === tab.key ? "active" : ""}`}
                onClick={() => setActiveTab(tab.key)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
                <span className="tab-label-en">{tab.labelEn}</span>
                {activeTab === tab.key && (
                  <motion.span
                    layoutId="tab-active-bg"
                    className="tab-active-bg"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab 内容 */}
      <section className="tab-content-section">
        <div className="container">
          <AnimatePresence mode="wait">
            {activeTab === "video" && (
              <motion.div
                key="video"
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  className="section-header tab-section-header"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                >
                  <span className="section-icon">🎬</span>
                  <h2 className="section-h2">视频作品</h2>
                  <p className="section-desc">{TABS[0].desc}</p>
                </motion.div>
                <motion.div
                  className="video-grid"
                  variants={stagger}
                  initial="initial"
                  animate="animate"
                >
                  {videos.map((v, i) => (
                    <VideoCard key={i} video={v} />
                  ))}
                </motion.div>
              </motion.div>
            )}

            {activeTab === "photo" && (
              <motion.div
                key="photo"
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  className="section-header tab-section-header"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                >
                  <span className="section-icon">📸</span>
                  <h2 className="section-h2">照片墙</h2>
                  <p className="section-desc">{TABS[1].desc}</p>
                </motion.div>
                <div className="photo-grid">
                  {photos.map((p, i) => (
                    <PhotoCard
                      key={i}
                      photo={p}
                      index={i}
                      onOpen={openLightbox}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "music" && (
              <motion.div
                key="music"
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  className="section-header tab-section-header"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                >
                  <span className="section-icon">🎵</span>
                  <h2 className="section-h2">音乐角落</h2>
                  <p className="section-desc">{TABS[2].desc}</p>
                </motion.div>
                <div className="music-wrapper">
                  <MusicPlayer tracks={music} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 灯箱 */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            photos={photos}
            index={lightboxIndex}
            onClose={closeLightbox}
            onNav={navLightbox}
          />
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
