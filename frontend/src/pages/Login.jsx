import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-indigo-900 mb-6">Login</h1>
        <p className="text-gray-600 mb-8">Sign in with your university email</p>
        <button className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition mb-4">
          Sign in with Google
        </button>
        <Link to="/" className="block text-center text-indigo-600 hover:text-indigo-800">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
