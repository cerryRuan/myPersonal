import { useEffect, useRef } from 'react'

/**
 * 鼠标跟随光晕：使用 rAF 平滑跟随，低开销
 */
export default function CursorGlow() {
  const glowRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // 初始定位到中心
    pos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    target.current = { ...pos.current }

    const onMove = (e) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
    }

    let raf
    const loop = () => {
      // 缓动插值
      pos.current.x += (target.current.x - pos.current.x) * 0.12
      pos.current.y += (target.current.y - pos.current.y) * 0.12
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`
      }
      raf = requestAnimationFrame(loop)
    }
    loop()

    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      style={{
        position: 'fixed',
        top: -150,
        left: -150,
        width: 300,
        height: 300,
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(124,58,237,0.12) 0%, rgba(236,72,153,0.06) 40%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 1,
        willChange: 'transform',
        mixBlendMode: 'screen',
      }}
    />
  )
}
