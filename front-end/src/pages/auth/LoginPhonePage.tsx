import { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Field from "../../components/Field";
import LinkButton from "../../components/LinkButton";
import Heading from "../../components/Heading";
import { Link } from "@tanstack/react-router";

export const LoginPhonePage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    phone: "",
    code: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const steps = [
    {
      render: () => (
        <div className="flex flex-col items-center gap-8 max-w-md w-full px-4">
          <Heading as="h2" size="3xl">
            Log in to your account
          </Heading>
          <div className="flex flex-col gap-4 w-full">
            <div className="space-y-4">
              <Field label="Phone number">
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className="w-full"
                />
              </Field>
            </div>
            <Button
              variant="primary"
              className="w-full"
              onClick={() => setCurrentStep(1)}
            >
              Continue with phone number
            </Button>
          </div>
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
      ),
    },
    {
      render: () => (
        <div className="flex flex-col items-center gap-8 max-w-md w-full px-4">
          <div className="flex flex-col">
            <Heading as="h2" size="3xl">
              Enter the code, silly
            </Heading>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              We sent a code to {formData.phone}
            </p>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <div className="space-y-4">
              <Field label="Code">
                <Input
                  id="code"
                  name="code"
                  type="text"
                  required
                  value={formData.code}
                  onChange={handleInputChange}
                  placeholder="Enter the code"
                  className="w-full"
                />
              </Field>
            </div>
            <Button
              variant="primary"
              className="w-full"
              onClick={() => setCurrentStep(1)}
            >
              Continue with phone number
            </Button>
          </div>
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
      ),
    },
  ];

  const currentStepComponent = steps[currentStep].render();

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
      {currentStepComponent}
    </div>
  );
};
