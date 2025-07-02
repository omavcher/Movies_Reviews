import movies from "../../movies";
import Link from "next/link";
import Image from "next/image";

export default function CategoryPage({ params }) {
  const category = params.name;
  const filtered = movies.filter((m) => (m.category || "").toLowerCase() === category.toLowerCase());
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-8">
      <h1 className="text-3xl font-bold text-purple-800 mb-8 text-center">{category.charAt(0).toUpperCase() + category.slice(1)} Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {filtered.length === 0 && <div className="col-span-full text-center text-gray-500">No movies found in this category.</div>}
        {filtered.map((movie) => (
          <Link key={movie.id} href={`/movies/${movie.id}`} className="block rounded-xl shadow-lg bg-white hover:scale-105 transition-transform duration-200 overflow-hidden">
            <div className="relative w-full h-64">
              <Image src={movie.poster} alt={movie.title} fill className="object-cover" />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-purple-800 mb-2">{movie.title}</h2>
              <p className="text-gray-600">{movie.shortReview}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 