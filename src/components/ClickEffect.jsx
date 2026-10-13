import { useEffect, useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * 全局点击特效：每次点击在点击处生成扩散的涟漪 + 粒子
 */
export default function ClickEffect() {
  const [bursts, setBursts] = useState([])

  const handleClick = useCallback((e) => {
    // 排除输入框等场景
    const tag = e.target.tagName
    if (tag === 'INPUT' || tag === 'TEXTAREA') return

    const id = Date.now() + Math.random()
    const x = e.clientX
    const y = e.clientY

    // 生成随机粒子方向
    const particles = Array.from({ length: 6 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 6 + Math.random() * 0.5
      const dist = 40 + Math.random() * 50
      return {
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist,
        delay: Math.random() * 0.05,
      }
    })

    setBursts((prev) => [...prev, { id, x, y, particles }])

    // 自动清理
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== id))
    }, 900)
  }, [])

  useEffect(() => {
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [handleClick])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      <AnimatePresence>
        {bursts.map((burst) => (
          <div
            key={burst.id}
            style={{
              position: 'absolute',
              left: burst.x,
              top: burst.y,
            }}
          >
            {/* 涟漪圆环 */}
            <motion.div
              initial={{ scale: 0, opacity: 0.6 }}
              animate={{ scale: 4, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                width: 30,
                height: 30,
                marginLeft: -15,
                marginTop: -15,
                borderRadius: '50%',
                border: '2px solid var(--accent-1)',
              }}
            />
            {/* 第二层涟漪 */}
            <motion.div
              initial={{ scale: 0, opacity: 0.4 }}
              animate={{ scale: 6, opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.05 }}
              style={{
                position: 'absolute',
                width: 30,
                height: 30,
                marginLeft: -15,
                marginTop: -15,
                borderRadius: '50%',
                border: '1.5px solid var(--accent-2)',
              }}
            />
            {/* 中心闪光 */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0.8 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute',
                width: 20,
                height: 20,
                marginLeft: -10,
                marginTop: -10,
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, var(--accent-3) 0%, transparent 70%)',
              }}
            />
            {/* 飞溅粒子 */}
            {burst.particles.map((p, i) => (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: p.dx,
                  y: p.dy,
                  opacity: 0,
                  scale: 0.3,
                }}
                transition={{
                  duration: 0.6,
                  ease: 'easeOut',
                  delay: p.delay,
                }}
                style={{
                  position: 'absolute',
                  width: 6,
                  height: 6,
                  marginLeft: -3,
                  marginTop: -3,
                  borderRadius: '50%',
                  background:
                    i % 2 === 0
                      ? 'var(--accent-1)'
                      : i % 3 === 0
                        ? 'var(--accent-2)'
                        : 'var(--accent-3)',
                  boxShadow: '0 0 8px currentColor',
                }}
              />
            ))}
          </div>
        ))}
      </AnimatePresence>
    </div>
  )
}
