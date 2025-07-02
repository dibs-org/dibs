import { Link } from "@tanstack/react-router";

import { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Field from "../../components/Field";
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
          <Heading as="h2" size="3xl" className="mt-6 text-center fade-in-up">
            Create your account
          </Heading>
          <p
            className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400 fade-in-up"
            style={{ animationDelay: "0.05s" }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Log in
            </Link>
          </p>
        </div>
        <form
          className="mt-8 space-y-6 w-full fade-in-up"
          style={{ animationDelay: "0.1s" }}
          onSubmit={handleSubmit}
        >
          <div className="space-y-4">
            <Field
              label="Full name"
              className="fade-in-up"
              style={{ animationDelay: "0.15s" }}
            >
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
            <Field
              label="Email address"
              className="fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
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
            <Field
              label="Password"
              className="fade-in-up"
              style={{ animationDelay: "0.25s" }}
            >
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
            <Field
              label="Confirm Password"
              className="fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
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
          <Button
            type="submit"
            variant="primary"
            className="w-full fade-in-up"
            style={{ animationDelay: "0.35s" }}
          >
            Sign up
          </Button>
        </form>
      </div>
    </div>
  );
};
