'use client'

import Image from "next/image";


export default function Avatar() {
  return (
    <Image
    className="rounded-full"
    alt="avatar"
    src='/images/placeholder.jpeg'
    height='30'
    width='30' 
    />
  )
}
