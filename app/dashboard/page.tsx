"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Challenge {
  id: string;
  title: string;
  category: string;
  level: string;
  createdAt?: string;
  cost?: number;
}

export default function DashboardPage() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      const res = await fetch("http://localhost:3001/challenges");
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();
      setChallenges(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteChallenge = async (id: string) => {
    if (!confirm("¿Eliminar este challenge?")) return;

    try {
      const res = await fetch(`http://localhost:3001/challenges/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error(`Error ${res.status}`);
      await fetchChallenges();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">loading challenges...</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-col items-start gap-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Your Challenges</h1>

        <Link
          href="/dashboard/new"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 font-medium transition-colors"
        >
          + New Challenge
        </Link>
      </div>

      <div className="bg-white shadow overflow-hidden w-full sm:rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Difficulity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created at
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {challenges.map((challenge) => (
                <tr key={challenge.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {challenge.title}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {challenge.category}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        challenge.level === "Easy"
                          ? "bg-green-100 text-green-800"
                          : challenge.level === "Moderate"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {challenge.level}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {challenge.createdAt
                      ? new Date(challenge.createdAt).toLocaleDateString("es-ES")
                      : "-"}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <Link
                      href={`/dashboard/${challenge.id}/edit`}
                      className="inline-flex items-center gap-1.5 bg-indigo-500 hover:bg-indigo-400 text-white px-3 py-1.5 rounded-md text-sm font-medium border border-indigo-200 hover:border-indigo-300 transition-all"
                      title="Edit"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => deleteChallenge(challenge.id)}
                      className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-400 text-white px-3 py-1.5 rounded-md text-sm font-medium border border-red-200 hover:border-red-300 transition-all"
                      title="Delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="w-full p-2 border">
            <p className="text-xs text-center text-gray-400">
              Your Challenges List
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}