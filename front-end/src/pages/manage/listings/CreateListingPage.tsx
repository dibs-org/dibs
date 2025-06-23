import { useState } from "react";
import { Link } from "@tanstack/react-router";

interface ListingFormData {
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  pricePerHour: number;
  features: string[];
  amenities: string[];
  rules: string;
  wifiPassword: string;
  contactInstructions: string;
  availability: {
    monday: { available: boolean; startTime: string; endTime: string };
    tuesday: { available: boolean; startTime: string; endTime: string };
    wednesday: { available: boolean; startTime: string; endTime: string };
    thursday: { available: boolean; startTime: string; endTime: string };
    friday: { available: boolean; startTime: string; endTime: string };
    saturday: { available: boolean; startTime: string; endTime: string };
    sunday: { available: boolean; startTime: string; endTime: string };
  };
}

const POOL_FEATURES = [
  "Heated Pool",
  "Hot Tub/Spa",
  "Pool Bar",
  "Outdoor Kitchen",
  "BBQ Grill",
  "Poolside Seating",
  "Shade Structure",
  "Pool Lights",
  "Sound System",
  "Waterfall",
];

const AMENITIES = [
  "Towels Provided",
  "Pool Floats",
  "Pool Noodles",
  "Parking Available",
  "Bathroom Access",
  "Changing Room",
  "Outdoor Shower",
  "Refrigerator Access",
];

export const CreateListingPage = () => {
  const [formData, setFormData] = useState<ListingFormData>({
    name: "",
    description: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    pricePerHour: 25,
    features: [],
    amenities: [],
    rules: "",
    wifiPassword: "",
    contactInstructions: "",
    availability: {
      monday: { available: false, startTime: "09:00", endTime: "18:00" },
      tuesday: { available: false, startTime: "09:00", endTime: "18:00" },
      wednesday: { available: false, startTime: "09:00", endTime: "18:00" },
      thursday: { available: false, startTime: "09:00", endTime: "18:00" },
      friday: { available: false, startTime: "09:00", endTime: "18:00" },
      saturday: { available: false, startTime: "09:00", endTime: "18:00" },
      sunday: { available: false, startTime: "09:00", endTime: "18:00" },
    },
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

  const handleFeatureToggle = (
    feature: string,
    category: "features" | "amenities"
  ) => {
    setFormData((prev) => ({
      ...prev,
      [category]: prev[category].includes(feature)
        ? prev[category].filter((f) => f !== feature)
        : [...prev[category], feature],
    }));
  };

  const handleAvailabilityChange = (
    day: keyof ListingFormData["availability"],
    field: string,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: {
          ...prev.availability[day],
          [field]: value,
        },
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement create listing logic
    console.log("Create listing:", formData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Basic Information</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pool Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Beautiful Backyard Oasis"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe your pool and what makes it special..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Street Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  ZIP Code
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price per Hour ($)
              </label>
              <input
                type="number"
                name="pricePerHour"
                value={formData.pricePerHour}
                onChange={handleInputChange}
                min="1"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Features & Amenities</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Pool Features
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {POOL_FEATURES.map((feature) => (
                  <label key={feature} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.features.includes(feature)}
                      onChange={() => handleFeatureToggle(feature, "features")}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {feature}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Amenities
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {AMENITIES.map((amenity) => (
                  <label key={amenity} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={() => handleFeatureToggle(amenity, "amenities")}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {amenity}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pool Rules
              </label>
              <textarea
                name="rules"
                rows={4}
                value={formData.rules}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="List any rules or restrictions for pool use..."
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Availability</h2>

            <div className="space-y-4">
              {Object.entries(formData.availability).map(([day, schedule]) => (
                <div
                  key={day}
                  className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex-1">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={schedule.available}
                        onChange={(e) =>
                          handleAvailabilityChange(
                            day as keyof ListingFormData["availability"],
                            "available",
                            e.target.checked
                          )
                        }
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm font-medium capitalize">
                        {day}
                      </span>
                    </label>
                  </div>

                  {schedule.available && (
                    <div className="flex items-center space-x-2">
                      <input
                        type="time"
                        value={schedule.startTime}
                        onChange={(e) =>
                          handleAvailabilityChange(
                            day as keyof ListingFormData["availability"],
                            "startTime",
                            e.target.value
                          )
                        }
                        className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                      <span className="text-gray-500">to</span>
                      <input
                        type="time"
                        value={schedule.endTime}
                        onChange={(e) =>
                          handleAvailabilityChange(
                            day as keyof ListingFormData["availability"],
                            "endTime",
                            e.target.value
                          )
                        }
                        className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Additional Information</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                WiFi Password
              </label>
              <input
                type="text"
                name="wifiPassword"
                value={formData.wifiPassword}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="WiFi password to share with guests"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contact Instructions
              </label>
              <textarea
                name="contactInstructions"
                rows={4}
                value={formData.contactInstructions}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="How should guests contact you? Any special instructions for arrival, parking, etc."
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-medium">Create New Listing</h1>
            <p className="text-gray-600">
              Step {currentStep} of {totalSteps}
            </p>
          </div>
          <Link
            to="/manage/listings"
            className="text-gray-600 hover:text-gray-900"
          >
            Cancel
          </Link>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-surface shadow rounded-lg p-6"
      >
        {renderStep()}

        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className={`px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
              currentStep === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 bg-surface hover:bg-gray-50"
            }`}
          >
            Previous
          </button>

          {currentStep === totalSteps ? (
            <button
              type="submit"
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create Listing
            </button>
          ) : (
            <button
              type="button"
              onClick={() =>
                setCurrentStep(Math.min(totalSteps, currentStep + 1))
              }
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
