"use client";

import * as React from "react";
import Button from "../../components/Button";
import Field from "../../components/Field";
import LinkButton from "../../components/LinkButton";
import Heading from "../../components/Heading";
import { Link, useNavigate } from "@tanstack/react-router";
import { useSendOTP } from "../../services/auth/useSendOTP";
import Input from "../../components/Input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../../components/InputOTP";
import { useConfirmOTP } from "../../services/auth/useConfirmOTP";
import { useCallback, useEffect } from "react";

const formatPhoneNumber = (phone: string) => {
  if (phone.startsWith("+1")) {
    return phone;
  }
  return `+1${phone}`;
};

export const LoginPhonePage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = React.useState(0);
  const [formData, setFormData] = React.useState({
    phone: "",
    code: "",
  });
  const {
    mutate: sendOTP,
    isPending: isSendingOTP,
    isSuccess: successfullySentOTP,
  } = useSendOTP();

  const {
    mutate: confirmOTP,
    isPending: isConfirmingOTP,
    isSuccess: successfullyConfirmedOTP,
  } = useConfirmOTP();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendOTP = () => {
    sendOTP(formatPhoneNumber(formData.phone));
  };

  const handleConfirmOTP = useCallback(() => {
    confirmOTP({
      phone: formatPhoneNumber(formData.phone),
      code: formData.code,
    });
  }, [confirmOTP, formData.phone, formData.code]);

  useEffect(() => {
    if (formData.code.length === 6) {
      handleConfirmOTP();
    }
  }, [formData.code, handleConfirmOTP]);

  if (successfullySentOTP && currentStep === 0) {
    setCurrentStep(1);
    return;
  } else if (successfullyConfirmedOTP && currentStep === 1) {
    setCurrentStep(2);
    setTimeout(() => {
      navigate({ to: "/reservations" });
    }, 100);
    return;
  }

  const steps = [
    {
      render: () => (
        <div className="flex flex-col items-center gap-8 max-w-md w-full px-4">
          <div className="flex flex-col items-center">
            <Heading as="h2" size="3xl" className="fade-in-up">
              Log in
            </Heading>
            <p
              className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400 fade-in-up"
              style={{ animationDelay: "0.05s" }}
            >
              We'll send a code to your phone to log in.
            </p>
          </div>
          <div
            className="flex flex-col gap-4 w-full fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="space-y-4">
              <Field label="Phone number">
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel-national"
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
              onClick={handleSendOTP}
              disabled={isSendingOTP}
            >
              {isSendingOTP ? "Sending" : "Continue with phone number"}
            </Button>
          </div>
          <p
            className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400 fade-in-up"
            style={{ animationDelay: "0.15s" }}
          >
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
          <div className="flex flex-col items-center gap-2">
            <Heading as="h2" size="3xl" className="fade-in-up">
              Enter the code, silly
            </Heading>
            <p
              className="text-center text-sm text-gray-600 dark:text-gray-400 fade-in-up"
              style={{ animationDelay: "0.05s" }}
            >
              We sent a code to {formData.phone}. Didn't get it?{" "}
              <button
                onClick={handleSendOTP}
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                disabled={isSendingOTP}
              >
                {isSendingOTP ? "Resending" : "Resend"}
              </button>
            </p>
          </div>
          <div
            className="flex flex-col gap-4 w-full fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="space-y-4">
              <Field label="Code">
                <InputOTP
                  maxLength={6}
                  value={formData.code}
                  onChange={(value) => {
                    setFormData((prev) => ({ ...prev, code: value }));
                  }}
                  autoFocus
                  autoComplete="one-time-code"
                >
                  <InputOTPGroup className="w-full">
                    <InputOTPSlot
                      index={0}
                      size="large"
                      className="w-full !h-[64px] !rounded-l-xl"
                    />
                    <InputOTPSlot
                      index={1}
                      size="large"
                      className="w-full !h-[64px]"
                    />
                    <InputOTPSlot
                      index={2}
                      size="large"
                      className="w-full !h-[64px] !rounded-r-xl"
                    />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup className="w-full">
                    <InputOTPSlot
                      index={3}
                      size="large"
                      className="w-full !h-[64px] !rounded-l-xl"
                    />
                    <InputOTPSlot
                      index={4}
                      size="large"
                      className="w-full !h-[64px]"
                    />
                    <InputOTPSlot
                      index={5}
                      size="large"
                      className="w-full !h-[64px] !rounded-r-xl"
                    />
                  </InputOTPGroup>
                </InputOTP>
              </Field>
            </div>
            <Button
              variant="primary"
              className="w-full"
              onClick={handleConfirmOTP}
              disabled={isConfirmingOTP}
            >
              {isConfirmingOTP ? "Submitting" : "Submit"}
            </Button>
          </div>
          <p
            className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400 fade-in-up"
            style={{ animationDelay: "0.15s" }}
          >
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
          <p
            className="text-center text-sm text-gray-600 dark:text-gray-400 fade-in-up"
            style={{ animationDelay: "0.05s" }}
          >
            Redirecting to home...
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
