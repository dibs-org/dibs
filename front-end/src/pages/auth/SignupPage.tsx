import { Link } from "@tanstack/react-router";

import { useState } from "react";
import Button from "../../components/Button";
import Input, { makeInputClasses } from "../../components/Input";
import Field from "../../components/Field";
import { twMerge } from "tailwind-merge";
import Heading from "../../components/Heading";
import LinkButton from "../../components/LinkButton";

export const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    userType: "renter" as "renter" | "owner",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement signup logic
    console.log("Signup submit:", formData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center">
      <LinkButton
        to="/"
        size="small"
        variant="tertiary"
        className="absolute top-4 left-4"
      >
        Back to home
      </LinkButton>
      <div className="flex flex-col items-start gap-4 max-w-md w-full px-4">
        <div className="w-full">
          <Heading as="h2" size="3xl" className="mt-6 text-center">
            Create your account
          </Heading>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Log in
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6 w-full" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Field label="Full Name">
              <Input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="w-full"
              />
            </Field>
            <Field label="I am a">
              <div className="relative">
                <select
                  id="userType"
                  name="userType"
                  value={formData.userType}
                  onChange={handleInputChange}
                  className={twMerge(
                    makeInputClasses(),
                    "w-full appearance-none"
                  )}
                >
                  <option value="renter">Pool Renter</option>
                  <option value="owner">Pool Owner</option>
                </select>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
            </Field>
            <Field label="Email address">
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full"
              />
            </Field>
            <Field label="Password">
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="w-full"
              />
            </Field>
            <Field label="Confirm Password">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                className="w-full"
              />
            </Field>
          </div>
          <Button type="submit" variant="primary" className="w-full">
            Sign up
          </Button>
        </form>
      </div>
    </div>
  );
};
