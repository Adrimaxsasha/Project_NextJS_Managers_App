import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md border border-gray-200 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Welcome to Manager Dashboard
        </h1>

        <p className="text-sm text-gray-600 mb-8">
          Log in to manage your challenges or create an account.
        </p>

        <div className="flex flex-col gap-4">
          <Link
            href="/signin"
            className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-5 py-3 text-white font-medium hover:bg-indigo-700 transition-colors"
          >
            Sign in
          </Link>

          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-5 py-3 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}