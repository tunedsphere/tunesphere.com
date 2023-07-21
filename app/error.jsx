"use client";
import React from 'react';

const error = () => {
  return (
    <main className="grid min-h-full h-screen bg-white px-6 lg:px-8">
      <section className="section-max-width top-1/4">
  <div className="text-center">
    <p className="text-base font-semibold text-colortheme">error 404</p>
    <h1 className="mt-4 text-3xl font-bold tracking-tight text-textdark sm:text-5xl">Page not found</h1>
    <p className="mt-6 text-base leading-7 text-textlow">Sorry, we couldn’t find the page you’re looking for.</p>
    <div className="mt-10 flex items-center justify-center gap-x-6">
      <a href="#" className="rounded-md bg-colortheme px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Go back home</a>
      <a href="#" className="text-sm font-semibold text-gray-900">Contact support <span>&rarr</span></a>
    </div>
  </div>
  </section>
</main>
  )
}

export default error;