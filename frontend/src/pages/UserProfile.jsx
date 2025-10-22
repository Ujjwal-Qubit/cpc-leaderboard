import { useParams, Link } from 'react-router-dom';

export default function UserProfile() {
  const { username } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-orange-900 mb-8">User Profile: {username}</h1>
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-4">
            <p className="text-gray-600">Branch: CSE</p>
            <p className="text-gray-600">Year: 3rd</p>
            <p className="text-gray-600">LeetCode: {username}</p>
            <p className="text-gray-600">Codeforces: {username}</p>
            <p className="text-xl font-bold text-orange-900">Total Score: 950</p>
          </div>
          <Link to="/leaderboard" className="block mt-8 text-center text-orange-600 hover:text-orange-800">
            Back to Leaderboard
          </Link>
        </div>
      </div>
    </div>
  );
}
