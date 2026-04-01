"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import ChallengeForm from "@/components/ChallengeForm";

interface Challenge {
  id: number;
  title: string;
  description: string;
  category: string;
  level: "Easy" | "Moderate" | "Hard";
  cost: number;
  functionName?: string;
  solutionCode?: string;
  createdAt?: string;
}

export default function EditChallengePage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [description, setDescription] = useState("");
  const [functionName, setFunctionName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const [code, setCode] = useState(
    "// code...\nfunction test() {\n  return null;\n}",
  );

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:3001/challenges/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        setChallenge(data);
        setDescription(data.description || "");
        setFunctionName(data.functionName || "");
        setCode(
          data.solutionCode ||
            "// code...\nfunction test() {\n  return null;\n}",
        );
      })
      .catch((err) => setMessage(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleUpdate = async (formData: any) => {
    if (!challenge) return;

    setSaving(true);
    setMessage("");

    const fullData = {
      ...challenge,
      id,
      title: formData.title,
      description,
      category: formData.category,
      level: formData.level,
      cost: Number(formData.cost) || 0,
      functionName,
      solutionCode: code,
    };

    try {
      const response = await fetch(`http://localhost:3001/challenges/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullData),
      });

      if (!response.ok) throw new Error(`Error ${response.status}`);

      alert("¡Challenge updated!");
      router.push("/dashboard");
    } catch (error: any) {
      alert("Error: " + error.message);
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        loading...
      </div>
    );

  if (!challenge)
    return <div className="p-12 text-red-600 text-xl">{message}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 py-12 px-4">
      <div className="mx-auto">
        <div className="flex items-center mb-12">
          <Link
            href="/dashboard"
            className="inline-flex px-2 py-1 bg-white border border-indigo-300 rounded-lg text-indigo-600 hover:bg-indigo-50"
          >
            ←
          </Link>

          <h1 className="ml-6 text-3xl font-bold text-gray-900">Edit {id}</h1>

          <button
            type="button"
            onClick={() => {
              const form = document.querySelector(
                "form[id='edit-challenge-form']",
              );
              if (form) {
                (form as HTMLFormElement).requestSubmit();
              }
            }}
            disabled={saving}
            className="mt-2 ml-6 bg-indigo-600 text-white py-1 px-2 rounded-lg transition-colors mb-2"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Edit Challenge
            </h2>

            {message && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800">
                {message}
              </div>
            )}

            <ChallengeForm
              initialData={{
                title: challenge.title,
                category: challenge.category,
                level: challenge.level,
                cost: challenge.cost || 0,
              }}
              onSubmit={(formData) => {
                void handleUpdate(formData);
              }}
              saving={saving}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-vertical h-32 placeholder-gray-400"
                placeholder="New description..."
              />
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl shadow-xl p-8 border">
              <label className="block text-sm font-medium text-gray-700">
                Function name
              </label>

              <input
                value={functionName}
                onChange={(e) => setFunctionName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
                placeholder="isPalindrome"
              />

              <div className="bg-white rounded-2xl shadow-xl border mt-4">
                <div className="border-t border-gray-700 p-6">
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-64 bg-gray-100 placeholder-gray-500 p-4 rounded-lg font-mono text-sm resize-vertical focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="// edit code..."
                  />
                </div>

                <div className="py-3 flex flex-row">
                  <div>
                    <h4 className="font-semibold mr-80 ml-3 mt-0.5 px-5">
                      Tests
                    </h4>
                  </div>

                  <div className="ml-60">
                    <button
                      type="button"
                      onClick={() => setShowEditor(!showEditor)}
                      className="bg-indigo-500 text-white w-7 h-7 rounded-xl"
                    >
                      +
                    </button>
                  </div>
                </div>

                {showEditor && (
                  <div className="p-4 border-t text-sm text-gray-500">
                    Aquí después agregas los test cases.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
