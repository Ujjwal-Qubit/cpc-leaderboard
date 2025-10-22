import { Link } from 'react-router-dom';

export default function Profile() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-900 mb-8">Profile Setup</h1>
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <p className="text-gray-600 mb-4">Complete your profile to join the leaderboard</p>
          <form className="space-y-4">
            <input type="text" placeholder="Full Name" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            <input type="text" placeholder="Branch" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            <input type="text" placeholder="Year" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            <input type="text" placeholder="LeetCode Username" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            <input type="text" placeholder="Codeforces Handle" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            <button type="submit" className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
              Save Profile
            </button>
          </form>
          <Link to="/" className="block mt-4 text-center text-purple-600 hover:text-purple-800">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
