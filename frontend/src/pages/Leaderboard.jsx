import { Link } from 'react-router-dom';

export default function Leaderboard() {
  const mockData = [
    { rank: 1, name: 'Student 1', branch: 'CSE', year: '3rd', score: 950 },
    { rank: 2, name: 'Student 2', branch: 'IT', year: '2nd', score: 890 },
    { rank: 3, name: 'Student 3', branch: 'CSE', year: '4th', score: 850 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-green-900 mb-8">Leaderboard</h1>
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 px-4">Rank</th>
                <th className="text-left py-4 px-4">Name</th>
                <th className="text-left py-4 px-4">Branch</th>
                <th className="text-left py-4 px-4">Year</th>
                <th className="text-left py-4 px-4">Score</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((student) => (
                <tr key={student.rank} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">{student.rank}</td>
                  <td className="py-4 px-4">
                    <Link to={`/profile/${student.name.toLowerCase().replace(' ', '-')}`} className="text-green-600 hover:text-green-800">
                      {student.name}
                    </Link>
                  </td>
                  <td className="py-4 px-4">{student.branch}</td>
                  <td className="py-4 px-4">{student.year}</td>
                  <td className="py-4 px-4 font-bold">{student.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link to="/" className="block mt-8 text-center text-green-600 hover:text-green-800">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
