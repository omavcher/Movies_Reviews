import movies from "../movies";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-purple-50 to-blue-50 p-8">
      <h1 className="text-3xl font-bold text-purple-800 mb-8 text-center">Admin Dashboard</h1>
      <section className="mb-12 max-w-2xl mx-auto bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-pink-700">Add New Movie</h2>
        <form className="flex flex-col gap-4">
          <input type="text" placeholder="Title" className="border rounded p-2" />
          <input type="text" placeholder="Poster URL" className="border rounded p-2" />
          <input type="text" placeholder="Category" className="border rounded p-2" />
          <input type="text" placeholder="Short Review" className="border rounded p-2" />
          <input type="text" placeholder="Download Link" className="border rounded p-2" />
          <button type="submit" className="bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-pink-700 transition">Add Movie</button>
        </form>
      </section>
      <section className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-purple-700">All Movies</h2>
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="py-2">Title</th>
              <th className="py-2">Category</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.id} className="border-t">
                <td className="py-2">{movie.title}</td>
                <td className="py-2">{movie.category || "-"}</td>
                <td className="py-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Edit</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
} 