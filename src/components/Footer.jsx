import React from 'react'

export default function Footer(){
  return (
    <footer className="bg-white border-t py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Travelly — made with Love ❤️
      </div>
    </footer>
  )
}
