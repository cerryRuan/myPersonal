import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * 顶部滚动进度条
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background:
          'linear-gradient(90deg, var(--accent-3), var(--accent-1), var(--accent-2))',
        transformOrigin: '0%',
        scaleX,
        zIndex: 1000,
      }}
    />
  )
}
