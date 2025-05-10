import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const registerSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .nonempty("Email is required")
    .email("Invalid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") router.replace("/");
  }, [status]);

  if (status === "loading") return null;

  const onSubmit = async (data) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const result = await res.json();
    if (result.status === "success") {
      router.push("/login");
    } else {
      setError("root", {
        type: "manual",
        message: result.message || "Registration failed!",
      });
    }
  };

  return (
    <div className="flex flex-col max-w-75 items-center m-auto mt-10 p-12 bg-white rounded-[20px] shadow-lg">
      <h3 className="mb-12 text-[#494a52] font-medium">Registration Form</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col items-center"
      >
        <input
          type="text"
          placeholder="Email"
          {...register("email")}
          className="mb-5"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-5">{errors.email.message}</p>
        )}
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="mb-5"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-5">{errors.password.message}</p>
        )}
        <button
          type="submit"
          className="border-none text-xl flex items-center text-[#727272] py-[5px] px-5 rounded-[10px] cursor-pointer bg-gray-300"
        >
          Register
        </button>
      </form>
      <div className="mt-8 flex text-lightGray">
        <p>Have an account? </p>
        <Link href="/login" className="text-primary">
          Sign in
        </Link>
      </div>
    </div>
  );
}

export default RegisterPage;
