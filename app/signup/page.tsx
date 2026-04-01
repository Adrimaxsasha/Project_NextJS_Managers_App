"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signupSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    console.log("signup submit!", data);
    alert("Signup submitted! Your data was sent (fake API).");
    // Aquí iría fetch a tu API
    // await fetch("/api/signup", { method: "POST", body: JSON.stringify(data) });

    // Ejemplo: redirigir a signin después del signup
    // router.push("/signin");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="flex bg-white/80 rounded-lg shadow-lg overflow-hidden max-w-4xl w-full">
        <div className="hidden md:block w-1/2 relative min-h-[650px]">
          <img src="coding.png" alt="coding" className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col p-10 justify-center bg-gray-200 w-full md:w-1/2">
          <div className="h-fit flex flex-col p-10 justify-center bg-white rounded-lg">
            <h1 className="text-center text-indigo-600 text-xl mb-4 font-semibold">
              Join Now!
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
              <input
                type="text"
                placeholder="First Name"
                {...register("firstName")}
                className="bg-purple-700 text-white rounded-md px-3 py-2 mb-1 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mb-3">
                  {errors.firstName.message}
                </p>
              )}

              <input
                type="text"
                placeholder="Last Name"
                {...register("lastName")}
                className="bg-purple-700 text-white rounded-md px-3 py-2 mb-1 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mb-3">
                  {errors.lastName.message}
                </p>
              )}

              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="bg-purple-700 text-white rounded-md px-3 py-2 mb-1 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mb-3">
                  {errors.email.message}
                </p>
              )}

              <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className="bg-purple-700 text-white rounded-md px-3 py-2 mb-1 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mb-4">
                  {errors.password.message}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-sky-600 hover:bg-indigo-700 text-white rounded-md py-2 transition-colors disabled:opacity-70"
              >
                {isSubmitting ? "Signing up..." : "Sign up"}
              </button>
            </form>

            <div className="text-center mt-3">
              <span className="text-xs text-gray-600">
                Already have an account?
              </span>
              <Link
                href="/signin"
                className="text-sky-500 hover:text-indigo-700 text-xs font-semibold ml-1"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}