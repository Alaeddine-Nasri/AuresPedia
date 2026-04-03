'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function FadingImage({ images, alt, sizes }) {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (images.length < 2) return
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setCurrent(i => (i + 1) % images.length)
        setVisible(true)
      }, 700)
    }, 8000)
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <Image
      src={images[current]}
      alt={alt}
      fill
      className={`object-cover transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}
      sizes={sizes || '30vw'}
    />
  )
}
