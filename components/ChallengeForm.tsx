"use client";

import { useState, useEffect } from "react";

interface ChallengeData {
  id?: number;
  title: string;
  category: string;
  level: "Easy" | "Moderate" | "Hard";
  cost: number;
}

interface Props {
  challengeId?: number;
  initialData?: Partial<ChallengeData>;
  onSuccess?: () => void;
  onSubmit?: (data: ChallengeData) => void;
  saving?: boolean;
}

export default function ChallengeForm({
  challengeId,
  initialData,
  onSuccess,
  onSubmit,
  saving = false,
}: Props) {
  const [formData, setFormData] = useState<ChallengeData>({
    title: "",
    category: "",
    level: "Moderate",
    cost: 0,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        category: initialData.category || "",
        level: (initialData.level as ChallengeData["level"]) || "Moderate",
        cost: Number(initialData.cost) || 0,
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "cost" ? Number(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit(formData);
      return;
    }

    const method = challengeId ? "PUT" : "POST";
    const url = challengeId
      ? `http://localhost:3000/challenges/${challengeId}`
      : "http://localhost:3000/challenges";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        if (onSuccess) onSuccess();
        if (!challengeId) {
          setFormData({
            title: "",
            category: "",
            level: "Moderate",
            cost: 0,
          });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      id="edit-challenge-form"
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Title
        </label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          disabled={saving}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          disabled={saving}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Difficulity
          </label>
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            disabled={saving}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="Easy">Easy</option>
            <option value="Moderate">Moderate</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>
    </form>
  );
}