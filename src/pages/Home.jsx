import React from 'react'
import SearchBar from '../components/SearchBar'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div className="space-y-10">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-white to-gray-100 p-6 rounded-lg shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900">Find the best stays, deals & experiences by us</h1>
          <p className="text-gray-600 mt-2 text-lg">Search hotels, compare prices, and book instantly..</p>
          <div className="mt-6">
            <SearchBar initialCity="Mumbai"/>
          </div>
        </div>
      </section>

      {/* Promo Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PromoCard title="Top Deals" desc="Handpicked discounts for you" />
        <PromoCard title="Trending Hotels" desc="Popular stays this week" />
        <PromoCard title="Local Experiences" desc="Tours & activities" />
      </section>

      {/* Popular Destinations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold mb-4">Popular Destinations</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {['Goa','Manali','Mumbai','Delhi','Bengaluru','Kerala'].map(d=> (
            <Link key={d} to={`/search?city=${encodeURIComponent(d)}`} className="block rounded overflow-hidden shadow-sm hover:shadow-lg transition">
              <div className="h-28 bg-gray-200 flex items-center justify-center font-semibold text-gray-700">{d}</div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  )
}

function PromoCard({title, desc}){
  return (
    <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-gray-500 mt-2">{desc}</p>
      <div className="mt-4">
        <button className="px-4 py-2 bg-primary text-white rounded hover:bg-accent">Explore</button>
      </div>
    </div>
  )
}
