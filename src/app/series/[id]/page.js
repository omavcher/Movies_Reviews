"use client";
import movies from "../../movies";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SeriesDetailsPage({ params }) {
  // Only find series
  const series = movies.find((m) => m.id === params.id && m.type === "series");
  const [tab, setTab] = useState("Episodes");
  const [selectedSeason, setSelectedSeason] = useState(1);

  if (!series) {
    return <div className="p-8 text-center text-gray-300">Series not found.</div>;
  }

  const seasons = series.seasons || [1];
  const episodes = series.episodes && series.episodes[selectedSeason - 1] ? series.episodes[selectedSeason - 1] : [];

  return (
    <div className="min-h-screen bg-black text-gray-300 p-8">
      {/* Series Details Header */}
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* Poster */}
        <div className="flex-shrink-0 w-full lg:w-1/3">
          <Image
            src={series.poster}
            alt={series.title}
            width={400}
            height={600}
            className="rounded-lg object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-white mb-2">{series.title}</h1>
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-gray-800 px-3 py-1 rounded text-sm">{series.genre || "Genre"}</span>
            <span className="bg-gray-800 px-3 py-1 rounded text-sm">{series.year || "Year"}</span>
            <span className="bg-gray-800 px-3 py-1 rounded text-sm">{series.rating || "No Rating"}</span>
          </div>
          <p className="text-gray-400 mb-6">{series.plot || series.description || series.shortReview}</p>

          <div className="mb-6">
            <label className="font-semibold mr-2">Season:</label>
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(Number(e.target.value))}
              className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-gray-300"
            >
              {seasons.map((season) => (
                <option key={season} value={season}>
                  Season {season}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-4">
            <a
              href={series.download || "#"}
              download
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg font-semibold shadow"
            >
              Download
            </a>
            <Link
              href="/"
              className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-6 py-2 rounded-lg font-semibold shadow"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="max-w-6xl mx-auto mt-8">
        {/* Tab Navigation */}
        <div className="flex items-center gap-8 border-b border-gray-700 pb-2 mb-4">
          {["Episodes", "Related", "Details"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-2 ${
                tab === t
                  ? "text-white border-b-2 border-pink-600"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {tab === "Episodes" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Episodes</h2>
              {episodes.length === 0 ? (
                <p>No episodes available.</p>
              ) : (
                <ul className="space-y-2">
                  {episodes.map((episode, idx) => (
                    <li
                      key={idx}
                      className="bg-gray-800 rounded p-4 shadow hover:bg-gray-700 transition"
                    >
                      {episode}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          {tab === "Related" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Related Series</h2>
              <p>Related series will be displayed here.</p>
            </div>
          )}
          {tab === "Details" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Details</h2>
              <ul className="space-y-2">
                <li>
                  <strong>Title:</strong> {series.title}
                </li>
                <li>
                  <strong>Year:</strong> {series.year || "N/A"}
                </li>
                <li>
                  <strong>Genre:</strong> {series.genre || "N/A"}
                </li>
                <li>
                  <strong>Rating:</strong> {series.rating || "N/A"}
                </li>
                <li>
                  <strong>Type:</strong> Series
                </li>
                <li><strong>Seasons:</strong> {seasons.length}</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 