import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Field from "../../components/Field";
import Heading from "../../components/Heading";
import LinkButton from "../../components/LinkButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../services/supabase";
import { makeAuthUserKey } from "../../services/auth/useAuthUserQuery";

export const LoginPage = () => {
  const queryClient = useQueryClient();
  const search = useSearch({ from: "/login" });
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { mutate: handleLogin, isPending: isLoggingIn } = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        throw error;
      }
      queryClient.setQueryData(makeAuthUserKey(), data.user);
    },
    onSuccess: () => {
      const redirectUrl = search?.redirect || "/reservations";
      navigate({ to: redirectUrl });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            Log in
          </Heading>
          <p
            className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400 fade-in-up"
            style={{ animationDelay: "0.05s" }}
          >
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-fg-link hover:text-fg-link/80"
            >
              Sign up
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
              label="Email address"
              className="fade-in-up"
              style={{ animationDelay: "0.15s" }}
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
              style={{ animationDelay: "0.2s" }}
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
          </div>
          <Button
            type="submit"
            variant="primary"
            className="w-full fade-in-up"
            style={{ animationDelay: "0.25s" }}
            disabled={isLoggingIn}
          >
            {isLoggingIn ? "Logging in..." : "Log in"}
          </Button>
        </form>
      </div>
    </div>
  );
};
