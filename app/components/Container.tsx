'use client'

export default function Container ({
    children,
  }: {
    children: React.ReactNode
  }) {
  return (
    <div className="max-w-[2520px] mx-auto px-2 sm:px-4 md:px-10 xl:px-20 ">{children}</div>
  )
}
