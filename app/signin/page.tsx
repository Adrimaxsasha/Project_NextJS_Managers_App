"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signinSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SigninFormData = z.infer<typeof signinSchema>;

export default function SigninPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SigninFormData) => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      alert("Invalid credentials");
      return;
    }

    alert("Login submitted");
    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="flex bg-white/80 rounded-lg shadow-lg overflow-hidden max-w-4xl w-full">
        <div className="hidden md:block w-1/2 relative min-h-[600px]">
          <img src="coding.png" alt="" className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col p-10 justify-center bg-gray-200 w-full md:w-1/2">
          <div className="h-fit flex flex-col p-10 justify-center bg-white rounded-lg">
            <h1 className="text-center text-indigo-600 text-xl mb-4 font-semibold">
              Join Now!
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="bg-purple-700 text-white rounded-md px-3 py-2 mb-1 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mb-3">{errors.email.message}</p>
              )}

              <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className="bg-purple-700 text-white rounded-md px-3 py-2 mb-1 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mb-4">{errors.password.message}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-sky-600 hover:bg-indigo-700 text-white rounded-md py-2 transition-colors disabled:opacity-70"
              >
                {isSubmitting ? "Logging in..." : "Log in"}
              </button>
            </form>

            <div className="text-center mt-3">
              <span className="text-xs text-gray-600">New to codeCLA?</span>
              <Link
                href="/signup"
                className="text-sky-500 hover:text-indigo-700 text-xs font-semibold ml-1"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}