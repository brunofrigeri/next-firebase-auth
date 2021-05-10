import React from 'react'

export default function Auth({ title, description, children }) {
  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-r from-yellow-400 via-red-500 to-pink-300">
      <div className="flex flex-col w-96 p-10 rounded-xl justify-center self-center items-center bg-gray-50">
        {title && <h1 className="font-bold text-2xl pb-2">{title}</h1>}
        {description && <h2>{description}</h2>}
        <div className="flex flex-col w-full">{children}</div>
      </div>
    </div>
  )
}
