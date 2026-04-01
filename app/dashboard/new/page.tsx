"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ChallengeForm from "@/components/ChallengeForm";

export default function NewChallengePage() {
  const router = useRouter();

  const [description, setDescription] = useState("");
  const [functionName, setFunctionName] = useState("");
  const [code, setCode] = useState(
    "// code...\nfunction suma(a, b) {\n  return parseInt(a) + parseInt(b);\n}\n"
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [showEditor, setShowEditor] = useState(false);

  const handleCreate = async (formData: any) => {
    setSaving(true);
    setMessage("");

    const fullData = {
      title: formData.title,
      category: formData.category,
      level: formData.level,
      cost: Number(formData.cost) || 0,
      description,
      functionName,
      solutionCode: code,
      tests: [],
      code: {},
      createdAt: new Date().toISOString().slice(0, 10),
    };

    try {
      const response = await fetch("http://localhost:3000/challenges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullData),
      });

      if (!response.ok) throw new Error(`Error ${response.status}`);

      alert("¡Nuevo challenge creado!");
      router.push("/dashboard");
    } catch (error: any) {
      alert("Error: " + error.message);
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 py-12 px-4">
      <div>
        <div className="flex items-center mb-12">
          <Link
            href="/dashboard"
            className="inline-flex px-2 py-1 bg-white border border-indigo-300 rounded-lg text-indigo-600 hover:bg-indigo-50"
          >
            ←
          </Link>

          <h1 className="ml-6 text-3xl font-bold text-gray-900">
            New Challenge
          </h1>
        </div>

        {message && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800">
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              New Challenge
            </h2>

            <ChallengeForm
              initialData={{
                title: "",
                category: "",
                level: "Moderate",
                cost: 0,
              }}
              onSubmit={(formData) => {
                void handleCreate(formData);
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

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-8 border">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Function name
              </label>

              <input
                value={functionName}
                onChange={(e) => setFunctionName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
                placeholder="isPalindrome"
              />

              <div className="bg-white rounded-2xl shadow-xl border mt-6">
                <div className="border-t border-gray-200 p-6">
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-64 bg-gray-100 placeholder-gray-500 p-4 rounded-lg font-mono text-sm resize-vertical focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="// edit code..."
                  />
                </div>

                <div className="py-3 flex flex-row justify-between items-center px-4">
                  <h4 className="font-semibold">Tests</h4>
                  <button
                    type="button"
                    onClick={() => setShowEditor(!showEditor)}
                    className="bg-indigo-500 text-white w-7 h-7 rounded-xl"
                  >
                    +
                  </button>
                </div>

                {showEditor && (
                  <div className="p-4 border-t">
                    <p className="text-sm text-gray-500">
                      Aquí después agregas los test cases.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                const form = document.getElementById("challenge-form");
                if (form instanceof HTMLFormElement) {
                  form.requestSubmit();
                }
              }}
              disabled={saving}
              className="bg-indigo-600 text-white py-2 px-4 rounded-lg transition-colors"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}