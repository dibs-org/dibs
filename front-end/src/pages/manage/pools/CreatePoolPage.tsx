import { useState } from "react";
import { Link } from "@tanstack/react-router";
import Button from "../../../components/Button";
import Field from "../../../components/Field";
import Input from "../../../components/Input";
import { PoolForm } from "../../../types";

const DISPLAY_MODE: string = "stacked"; // Change to "stacked" for stacked display

// const AMENITIES = [
//   "Towels Provided",
//   "Pool Floats",
//   "Pool Noodles",
//   "Parking Available",
//   "Bathroom Access",
//   "Changing Room",
//   "Outdoor Shower",
//   "Refrigerator Access",
// ];

export const CreatePoolPage = () => {
  const [formData, setFormData] = useState<PoolForm>({
    name: "",
    description: "",
    address: "",
    // amenities: [],
    // rules: "",
    // wifiPassword: "",
    // contactInstructions: "",
    // availability: {
    //   monday: { available: false, startTime: "09:00", endTime: "18:00" },
    //   tuesday: { available: false, startTime: "09:00", endTime: "18:00" },
    //   wednesday: { available: false, startTime: "09:00", endTime: "18:00" },
    //   thursday: { available: false, startTime: "09:00", endTime: "18:00" },
    //   friday: { available: false, startTime: "09:00", endTime: "18:00" },
    //   saturday: { available: false, startTime: "09:00", endTime: "18:00" },
    //   sunday: { available: false, startTime: "09:00", endTime: "18:00" },
    // },
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  // const handleAmenityToggle = (amenity: string) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     amenities: prev.amenities.includes(amenity)
  //       ? prev.amenities.filter((a) => a !== amenity)
  //       : [...prev.amenities, amenity],
  //   }));
  // };

  // const handleAvailabilityChange = (
  //   day: keyof PoolForm["availability"],
  //   field: string,
  //   value: string | boolean
  // ) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     availability: {
  //       ...prev.availability,
  //       [day]: {
  //         ...prev.availability[day],
  //         [field]: value,
  //       },
  //     },
  //   }));
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement create pool logic
    console.log("Create pool:", formData);
  };

  const steps = [
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100">
        Basic Information
      </h2>

      <Field label="Pool Name">
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="e.g., Beautiful Backyard Oasis"
        />
      </Field>

      <Field label="Description">
        <textarea
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleInputChange}
          className="w-full border border-gray-200 dark:border-gray-900 rounded-2xl p-4 bg-surface text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus-visible:border-blue-500 focus-visible:ring-blue-500/50 focus-visible:ring-[3px] focus:outline-none resize-none"
          placeholder="Describe your pool and what makes it special..."
        />
      </Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Street Address">
          <Input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </Field>
        {/* <Field label="City">
          <Input
            type="text"
            name="city"
            value={formData.address.city}
            onChange={handleInputChange}
          />
        </Field>
        <Field label="State">
          <Input
            type="text"
            name="state"
            value={formData.address.state}
            onChange={handleInputChange}
          />
        </Field>
        <Field label="ZIP Code">
          <Input
            type="text"
            name="zipCode"
            value={formData.address.zipCode}
            onChange={handleInputChange}
          />
        </Field> */}
      </div>
    </div>,

    // <div className="flex flex-col gap-6">
    //   <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100">
    //     Amenities
    //   </h2>

    //   <div className="flex flex-col gap-3">
    //     <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
    //       Amenities
    //     </label>
    //     <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
    //       {AMENITIES.map((amenity) => (
    //         <label
    //           key={amenity}
    //           className="flex items-center gap-2 cursor-pointer"
    //         >
    //           <input
    //             type="checkbox"
    //             checked={formData.amenities.includes(amenity)}
    //             onChange={() => handleAmenityToggle(amenity)}
    //             className="rounded border-gray-300 dark:border-gray-700 text-blue-600 focus:ring-blue-500 dark:bg-gray-800"
    //           />
    //           <span className="text-sm text-gray-700 dark:text-gray-300">
    //             {amenity}
    //           </span>
    //         </label>
    //       ))}
    //     </div>
    //   </div>

    //   <Field label="Pool Rules">
    //     <textarea
    //       name="rules"
    //       rows={4}
    //       value={formData.rules}
    //       onChange={handleInputChange}
    //       className="w-full border border-gray-200 dark:border-gray-900 rounded-2xl p-4 bg-surface text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus-visible:border-blue-500 focus-visible:ring-blue-500/50 focus-visible:ring-[3px] focus:outline-none resize-none"
    //       placeholder="List any rules or restrictions for pool use..."
    //     />
    //   </Field>
    // </div>,

    // <div className="flex flex-col gap-6">
    //   <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100">
    //     Availability
    //   </h2>

    //   <div className="flex flex-col gap-4">
    //     {Object.entries(formData.availability).map(([day, schedule]) => (
    //       <div
    //         key={day}
    //         className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-900 rounded-2xl bg-surface"
    //       >
    //         <div className="flex-1">
    //           <label className="flex items-center gap-2 cursor-pointer">
    //             <input
    //               type="checkbox"
    //               checked={schedule.available}
    //               onChange={(e) =>
    //                 handleAvailabilityChange(
    //                   day as keyof PoolForm["availability"],
    //                   "available",
    //                   e.target.checked
    //                 )
    //               }
    //               className="rounded border-gray-300 dark:border-gray-700 text-blue-600 focus:ring-blue-500 dark:bg-gray-800"
    //             />
    //             <span className="text-sm font-medium capitalize text-gray-900 dark:text-gray-100">
    //               {day}
    //             </span>
    //           </label>
    //         </div>

    //         {schedule.available && (
    //           <div className="flex items-center gap-2">
    //             <input
    //               type="time"
    //               value={schedule.startTime}
    //               onChange={(e) =>
    //                 handleAvailabilityChange(
    //                   day as keyof PoolForm["availability"],
    //                   "startTime",
    //                   e.target.value
    //                 )
    //               }
    //               className="border border-gray-200 dark:border-gray-900 rounded-xl px-3 py-2 bg-surface text-gray-900 dark:text-gray-100 focus-visible:border-blue-500 focus-visible:ring-blue-500/50 focus-visible:ring-[3px] focus:outline-none"
    //             />
    //             <span className="text-gray-500 dark:text-gray-400">to</span>
    //             <input
    //               type="time"
    //               value={schedule.endTime}
    //               onChange={(e) =>
    //                 handleAvailabilityChange(
    //                   day as keyof PoolForm["availability"],
    //                   "endTime",
    //                   e.target.value
    //                 )
    //               }
    //               className="border border-gray-200 dark:border-gray-900 rounded-xl px-3 py-2 bg-surface text-gray-900 dark:text-gray-100 focus-visible:border-blue-500 focus-visible:ring-blue-500/50 focus-visible:ring-[3px] focus:outline-none"
    //             />
    //           </div>
    //         )}
    //       </div>
    //     ))}
    //   </div>
    // </div>,

    // <div className="flex flex-col gap-6">
    //   <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100">
    //     Additional Information
    //   </h2>

    //   <Field label="WiFi Password">
    //     <Input
    //       type="text"
    //       name="wifiPassword"
    //       value={formData.wifiPassword}
    //       onChange={handleInputChange}
    //       placeholder="WiFi password to share with guests"
    //     />
    //   </Field>

    //   <Field label="Contact Instructions">
    //     <textarea
    //       name="contactInstructions"
    //       rows={4}
    //       value={formData.contactInstructions}
    //       onChange={handleInputChange}
    //       className="w-full border border-gray-200 dark:border-gray-900 rounded-2xl p-4 bg-surface text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus-visible:border-blue-500 focus-visible:ring-blue-500/50 focus-visible:ring-[3px] focus:outline-none resize-none"
    //       placeholder="How should guests contact you? Any special instructions for arrival, parking, etc."
    //     />
    //   </Field>
    // </div>,
  ];

  const renderStep = () => {
    if (DISPLAY_MODE === "stacked") {
      return steps;
    }
    return steps[currentStep - 1] || null;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Create new pool
            </h1>
            {DISPLAY_MODE === "stepped" && (
              <p className="text-gray-600 dark:text-gray-400">
                Step {currentStep} of {totalSteps}
              </p>
            )}
          </div>
          <Link
            to="/manage/pools"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            Cancel
          </Link>
        </div>

        {DISPLAY_MODE === "stepped" && (
          <div className="bg-gray-200 dark:bg-gray-800 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-surface border border-gray-200 dark:border-gray-900 rounded-2xl"
        >
          <div className="p-6">{renderStep()}</div>

          <div className="flex justify-between items-center p-6 border-t border-gray-200 dark:border-gray-800">
            {DISPLAY_MODE === "stepped" && (
              <Button
                type="button"
                variant="secondary"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
            )}

            <Button type="submit" variant="primary">
              {DISPLAY_MODE === "stepped" && currentStep !== totalSteps
                ? "Next"
                : "Create pool"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
