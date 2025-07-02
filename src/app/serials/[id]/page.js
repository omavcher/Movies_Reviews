"use client";
import tvserials from "../../tvserials";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function TVSerialDetailsPage({ params }) {
  const serial = tvserials.find((s) => s.id === params.id);
  const [tab, setTab] = useState("Episodes");

  if (!serial) {
    return <div className="p-8 text-center text-gray-300">TV Serial not found.</div>;
  }

  // Assume serial.episodes is an array of episode objects
  // Example: { number: 1, title: "Episode Title", thumbnail: "url", time: "22 min", publishDate: "2 Jul 2024", about: "Description..." }
  const episodes = serial.episodes || [];
  const latestEp = episodes[episodes.length - 1];

  return (
    <div className="min-h-screen bg-black text-gray-300 p-8">
      {/* Top Section with Poster and Watch Latest Episode Button */}
      <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-6 mb-8">
        {/* Poster */}
        <div className="flex-shrink-0 w-full lg:w-1/3">
          <Image
            src={serial.poster}
            alt={serial.title}
            width={400}
            height={600}
            className="rounded-lg object-cover"
          />
        </div>
        {/* Details and Watch Latest Episode */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">{serial.title}</h1>
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-gray-800 px-3 py-1 rounded text-sm">{serial.genre || "TV Serial"}</span>
              <span className="bg-gray-800 px-3 py-1 rounded text-sm">{serial.year || "Year"}</span>
              <span className="bg-gray-800 px-3 py-1 rounded text-sm">{serial.rating || "No Rating"}</span>
            </div>
            <p className="text-gray-400 mb-6">{serial.fullReview || serial.shortReview}</p>
          </div>
          {latestEp && (
            <a
              href={latestEp.watchUrl || "#"}
              className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg font-semibold shadow mt-4"
            >
              Watch Latest Episode
              <span className="ml-2 text-xs text-gray-200">({latestEp.publishDate || "2 Jul"})</span>
            </a>
          )}
        </div>
      </div>

      {/* Tabs Section */}
      <div className="max-w-4xl mx-auto">
        {/* Tab Navigation */}
        <div className="flex items-center gap-8 border-b border-gray-700 pb-2 mb-4">
          {["Episodes", "Details"].map((t) => (
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
                <ul className="space-y-4">
                  {episodes.map((ep, idx) => (
                    <li key={idx} className="flex bg-gray-800 rounded-lg overflow-hidden shadow">
                      <div className="w-32 h-20 relative flex-shrink-0">
                        <Image
                          src={ep.thumbnail || serial.poster}
                          alt={ep.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 p-3 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-pink-400 font-bold">EP {ep.number}</span>
                          <span className="text-xs text-gray-400">{ep.time}</span>
                          <span className="text-xs text-gray-400">{ep.publishDate}</span>
                        </div>
                        <div className="font-semibold text-white">{ep.title}</div>
                        <div className="text-xs text-gray-300">{ep.about}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          {tab === "Details" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Details</h2>
              <ul className="space-y-2">
                <li>
                  <strong>Title:</strong> {serial.title}
                </li>
                <li>
                  <strong>Type:</strong> TV Serial
                </li>
                <li>
                  <strong>Review:</strong> {serial.fullReview}
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 