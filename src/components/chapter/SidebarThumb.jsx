'use client'
import { useState } from 'react'

export default function SidebarThumb({ id, base }) {
  const [ext, setExt] = useState('svg')
  return (
    <img
      src={`${base}/diagrams/${id}.${ext}`}
      alt=""
      className="w-full h-full object-cover"
      onError={() => { if (ext === 'svg') setExt('png') }}
    />
  )
}
