import { Link } from "@tanstack/react-router";
import { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Field from "../../components/Field";
import Heading from "../../components/Heading";

export const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log("Login submit:", formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center">
      <Link
        to="/"
        className="absolute top-4 left-4 text-sm text-gray-500 dark:text-gray-400"
      >
        Back to home
      </Link>
      <div className="flex flex-col items-start gap-4 max-w-md w-full px-4">
        <div className="w-full">
          <Heading as="h2" size="3xl" className="mt-6 text-center">
            Log in to your account
          </Heading>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Sign up
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6 w-full" onSubmit={handleSubmit}>
          <div className="space-y-4">
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
          </div>
          <Button type="submit" variant="primary" className="w-full">
            Log in
          </Button>
        </form>
      </div>
    </div>
  );
};
