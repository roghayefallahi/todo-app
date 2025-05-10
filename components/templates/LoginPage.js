import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .nonempty("Email is required")
    .email("Invalid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") router.replace("/");
  }, [status]);

  const onSubmit = async (data) => {
    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });
    if (res.error) {
      toast.error("Email or password is incorrect.", {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col max-w-75 items-center m-auto mt-10 p-12 bg-white rounded-[20px] shadow-lg">
      <h3 className="mb-12 text-[#494a52] font-medium">Login Form</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col items-center"
      >
        <input
          type="text"
          placeholder="Email"
          {...register("email")}
          className="mb-8"
        />
        {errors.email && (
          <span className="text-red-500 text-sm mb-3">{errors.email.message}</span>
        )}
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="mb-8"
        />
          {errors.password && (
          <span className="text-red-500 text-sm mb-3">{errors.password.message}</span>
        )}
        <button
          type="submit"
          className="border-none text-xl flex items-center text-[#727272] py-[5px] px-5 rounded-[10px] cursor-pointer bg-gray-300"
        >
          Login
        </button>
      </form>
      <div className="mt-8 flex text-lightGray">
        <p>Create an account?</p>
        <Link href="/register" className="text-primary">
          Register
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
