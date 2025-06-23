import { Link } from "@tanstack/react-router";
import { useState } from "react";

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
  status: "active" | "inactive";
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

export const EditListingPage = ({ listingId }: { listingId: string }) => {
  // Mock data - in a real app, this would be fetched based on listingId
  const [formData, setFormData] = useState<ListingFormData>({
    name: "Beautiful Backyard Pool",
    description: "A stunning 20x40 pool with spa and outdoor kitchen",
    address: "123 Pool Lane",
    city: "Miami",
    state: "FL",
    zipCode: "33101",
    pricePerHour: 35,
    features: ["Heated Pool", "Hot Tub/Spa", "Pool Lights"],
    amenities: ["Towels Provided", "Parking Available", "Bathroom Access"],
    rules:
      "No glass containers. No diving. Children must be supervised at all times.",
    wifiPassword: "poolparty123",
    contactInstructions:
      "Text me at arrival. Parking is available in the driveway.",
    status: "active",
    availability: {
      monday: { available: true, startTime: "09:00", endTime: "18:00" },
      tuesday: { available: true, startTime: "09:00", endTime: "18:00" },
      wednesday: { available: true, startTime: "09:00", endTime: "18:00" },
      thursday: { available: true, startTime: "09:00", endTime: "18:00" },
      friday: { available: true, startTime: "09:00", endTime: "20:00" },
      saturday: { available: true, startTime: "08:00", endTime: "20:00" },
      sunday: { available: false, startTime: "09:00", endTime: "18:00" },
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
    // TODO: Implement update listing logic
    console.log("Update listing:", { listingId, formData });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link
          to="/manage/listings"
          className="text-gray-600 hover:text-gray-900"
        >
          {"<"} Back to listings
        </Link>
        <br />
        <br />
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-medium">Edit Listing</h1>
            <p className="text-gray-600">Update your pool listing details</p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-surface shadow rounded-lg p-6 space-y-8"
      >
        {/* Basic Information */}
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
              className="mt-1 block w-full border border-gray-400 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500"
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
              className="mt-1 block w-full border border-gray-400 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500"
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
                className="mt-1 block w-full border border-gray-400 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500"
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
                className="mt-1 block w-full border border-gray-400 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500"
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
                className="mt-1 block w-full border border-gray-400 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500"
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
                className="mt-1 block w-full border border-gray-400 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                className="mt-1 block w-full border border-gray-400 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-400 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Features & Amenities */}
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
                    className="rounded border-gray-400 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{feature}</span>
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
                    className="rounded border-gray-400 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{amenity}</span>
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
              className="mt-1 block w-full border border-gray-400 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500"
              placeholder="List any rules or restrictions for pool use..."
            />
          </div>
        </div>

        {/* Availability */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Availability</h2>

          <div className="space-y-4">
            {Object.entries(formData.availability).map(([day, schedule]) => (
              <div
                key={day}
                className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg"
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
                      className="rounded border-gray-400 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
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
                      className="border border-gray-400 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500"
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
                      className="border border-gray-400 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Additional Information */}
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
              className="mt-1 block w-full border border-gray-400 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500"
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
              className="mt-1 block w-full border border-gray-400 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500"
              placeholder="How should guests contact you? Any special instructions for arrival, parking, etc."
            />
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex justify-end space-x-3">
          <Link
            to="/manage/listings"
            className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-surface hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Update Listing
          </button>
        </div>
      </form>
    </div>
  );
};
