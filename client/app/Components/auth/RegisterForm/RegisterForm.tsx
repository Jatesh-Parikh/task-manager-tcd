"use client";
import { useUserContext } from "@/context/userContext";
import React, { useState } from "react";

function RegisterForm() {
  const { registerUser, userState, handleUserInput } = useUserContext();
  const { name, email, password } = userState;
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <form className="relative m-[2rem] px-10 py-14 rounded-lg bg-white w-full max-w-[520px]">
      <div className="relative z-10">
        <h1 className="mb-2 text-center text-[1.35rem] font-medium">
          Register for an account
        </h1>
        <p className="mb-8 px-[2rem] text-center text-[#999] text-[14px]">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-bold text-[#2ECC71] hover:text-[#7263F3] transition-all duration-300"
          >
            Login
          </a>
        </p>
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 text-[#999]">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => handleUserInput("name")(e)}
            name="name"
            placeholder="John Doe"
            className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-gray-800"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 text-[#999]">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => handleUserInput("email")(e)}
            name="email"
            placeholder="johndoe@email.com"
            className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-gray-800"
          />
        </div>
        <div className="relative flex flex-col">
          <label htmlFor="password" className="mb-1 text-[#999]">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => handleUserInput("password")(e)}
            name="password"
            placeholder="********"
            className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-gray-800"
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute p-1 right-4 top-[43%] text-[22px] text-[#999] opacity-45"
          >
            {showPassword ? (
              <i className="fas fa-eye-slash"></i>
            ) : (
              <i className="fas fa-eye"></i>
            )}
          </button>
        </div>

        <div className="flex">
          <button
            type="submit"
            disabled={!name || !email || !password}
            onClick={registerUser}
            className="mt-[1.5rem] flex-1 px-4 py-3 font-bold bg-[#2ECC71] text-white rounded-md 
            hover:bg-[#1abc9c] transition-colors duration-300"
          >
            Register
          </button>
        </div>
      </div>
      <img src="/flurry.png" alt="background" />
    </form>
  );
}

export default RegisterForm;
