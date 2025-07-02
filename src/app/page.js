"use client";
import movies from "./movies";
import series from "./series";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

const categories = [
  { name: "Action", image: "/action.svg" },
  { name: "Comedy", image: "/comedy.svg" },
  { name: "Drama", image: "/drama.svg" },
  { name: "Romance", image: "/romance.svg" },
];

const allContent = [...movies, ...series];

export default function Home() {
  const [search, setSearch] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);
  const searchResultsRef = useRef(null);

  const searchResults = search.trim()
    ? allContent.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current && 
        !searchRef.current.contains(event.target) &&
        searchResultsRef.current && 
        !searchResultsRef.current.contains(event.target)
      ) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      {/* Header with Logo */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <Link href="/" className="w-full md:w-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-violet-600 font-mono text-center md:text-left">
            hdmoviez.fun
          </h1>
        </Link>
        
        {/* Search Bar */}
        <div className="w-full md:w-1/3 relative" ref={searchRef}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            placeholder="Search movies..."
            className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:border-violet-500 text-white"
          />
          
          {/* Search Results Dropdown */}
          {isSearchFocused && search && (
            <div 
              ref={searchResultsRef}
              className="absolute z-50 w-full mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-lg max-h-96 overflow-y-auto"
            >
              {searchResults.length === 0 ? (
                <div className="p-4 text-gray-400">No movies found</div>
              ) : (
                <ul className="divide-y divide-gray-700">
                  {searchResults.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={`/${item.type === "series" ? "series" : "movies"}/${item.id}`}
                        className="flex items-center gap-3 p-3 hover:bg-violet-900 transition-colors"
                        onClick={() => setIsSearchFocused(false)}
                      >
                        {console.log(item)}
                        <div className="flex-shrink-0 w-12 h-16 relative">
                          <Image
                            src={item.poster}
                            alt={item.title}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div>
                          <h3 className="text-white font-medium">{item.title}</h3>
                          <p className="text-violet-400 text-sm">{item.year}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Hero Banner - Hidden on mobile */}
      <div className="relative hidden md:block h-64 lg:h-96 rounded-xl overflow-hidden mb-8 lg:mb-12">
        <Image
          src="/banner.jpg"
          alt="Featured Movie"
          fill
          className="object-cover opacity-70"
        />
        <div className="absolute bottom-0 left-0 p-6 lg:p-8 bg-gradient-to-t from-black to-transparent w-full">
          <h2 className="text-2xl lg:text-4xl font-bold text-white mb-2">Featured Movie</h2>
          <p className="text-violet-300 mb-4">Now Streaming</p>
          <button className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-1 lg:px-6 lg:py-2 rounded-md font-medium text-sm lg:text-base">
            Watch Now
          </button>
        </div>
      </div>

      {/* Trending Section */}
      <section className="mb-8 lg:mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-white">Trending Now</h2>
          <Link href="/trending" className="text-violet-400 hover:underline text-sm md:text-base">
            See All
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {movies.slice(0, 6).map((movie) => (
            <Link
              key={movie.id}
              href={`/movies/${movie.id}`}
              className="group relative rounded-lg overflow-hidden transition-transform duration-200 hover:scale-105 hover:z-10"
            >
              <div className="relative w-full aspect-[2/3]">
                <Image
                  src={movie.poster}
                  alt={movie.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-all duration-300 flex items-center justify-center">
                  <button className="opacity-0 group-hover:opacity-100 bg-violet-600 text-white px-3 py-1 md:px-4 md:py-2 rounded-full font-medium text-xs md:text-sm transition-opacity duration-300">
                    Play
                  </button>
                </div>
              </div>
              <div className="p-1 md:p-2">
                <h3 className="text-white font-medium text-sm md:text-base truncate">{movie.title}</h3>
                <p className="text-violet-400 text-xs md:text-sm">{movie.year}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="mb-8 lg:mb-12">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/category/${cat.name.toLowerCase()}`}
              className="bg-gray-900 rounded-lg overflow-hidden hover:bg-violet-900 transition-colors duration-200"
            >
              <div className="p-3 md:p-4 flex flex-col items-center">
                <div className="w-10 h-10 md:w-16 md:h-16 mb-1 md:mb-2 flex items-center justify-center">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <span className="text-violet-400 font-medium text-sm md:text-base">{cat.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* All Movies Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-white">All Movies</h2>
          <Link href="/movies" className="text-violet-400 hover:underline text-sm md:text-base">
            Browse All
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {movies.map((movie) => (
            <Link
              key={movie.id}
              href={`/movies/${movie.id}`}
              className="group relative rounded-lg overflow-hidden transition-transform duration-200 hover:scale-105 hover:z-10"
            >
              <div className="relative w-full aspect-[2/3]">
                <Image
                  src={movie.poster}
                  alt={movie.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-all duration-300 flex items-center justify-center">
                  <button className="opacity-0 group-hover:opacity-100 bg-violet-600 text-white px-3 py-1 md:px-4 md:py-2 rounded-full font-medium text-xs md:text-sm transition-opacity duration-300">
                    View
                  </button>
                </div>
              </div>
              <div className="p-1 md:p-2">
                <h3 className="text-white font-medium text-sm md:text-base truncate">{movie.title}</h3>
                <p className="text-violet-400 text-xs md:text-sm">{movie.year}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}