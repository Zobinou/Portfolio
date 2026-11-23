'use client'

import { motion, type Variants } from 'framer-motion'

type Direction = 'up' | 'down' | 'left' | 'right'

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  direction?: Direction
  className?: string
  once?: boolean
}

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  direction = 'up',
  className,
  once = true,
}: FadeInProps) {
  const offset = { up: 40, down: -40, left: 40, right: -40 }
  const axis: 'x' | 'y' = direction === 'up' || direction === 'down' ? 'y' : 'x'

  const variants: Variants = {
    hidden: { opacity: 0, [axis]: offset[direction] },
    visible: { opacity: 1, [axis]: 0 },
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-80px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}