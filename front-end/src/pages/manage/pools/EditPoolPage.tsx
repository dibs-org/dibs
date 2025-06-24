import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { useState } from "react";
import Button from "../../../components/Button";
import Field from "../../../components/Field";
import Input from "../../../components/Input";
import { usePool } from "../../../services/pools/usePool";
import { PoolForm } from "../../../types";
import { useUpdatePool } from "../../../services/pools/useUpdatePool";

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

export const EditPoolPage = () => {
  const { poolId } = useParams({ from: "/manage/pools/$poolId" });
  const navigate = useNavigate();
  const { data: pool } = usePool({ poolId });
  const { mutate: updatePool, isPending } = useUpdatePool();
  const [hasInitialData, setHasInitialData] = useState(false);
  const [formData, setFormData] = useState<PoolForm>({
    name: "",
    description: pool?.description || "",
    address: pool?.address || "",
    // address: pool?.address || {
    //   street: "",
    //   city: "",
    //   state: "",
    //   zipCode: "",
    // },
    // amenities: pool?.amenities || [],
    // rules:
    //   "No glass containers. No diving. Children must be supervised at all times.",
    // wifiPassword: "poolparty123",
    // contactInstructions:
    //   "Text me at arrival. Parking is available in the driveway.",
    // availability: {
    //   monday: { available: true, startTime: "09:00", endTime: "18:00" },
    //   tuesday: { available: true, startTime: "09:00", endTime: "18:00" },
    //   wednesday: { available: true, startTime: "09:00", endTime: "18:00" },
    //   thursday: { available: true, startTime: "09:00", endTime: "18:00" },
    //   friday: { available: true, startTime: "09:00", endTime: "20:00" },
    //   saturday: { available: true, startTime: "08:00", endTime: "20:00" },
    //   sunday: { available: false, startTime: "09:00", endTime: "18:00" },
    // },
  });

  if (!hasInitialData && pool) {
    setFormData(pool);
    setHasInitialData(true);
  }

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
    updatePool(
      { poolId, pool: formData },
      {
        onSuccess: () => {
          navigate({ to: "/manage/pools" });
        },
      }
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <Link
              to="/manage/pools"
              className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
            >
              ← Back to pools
            </Link>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Edit pool
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Update your pool details
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-surface border border-gray-200 dark:border-gray-900 rounded-2xl"
        >
          <div className="p-6 flex flex-col gap-8">
            {/* Basic Information */}
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
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleInputChange}
                  />
                </Field>
                <Field label="State">
                  <Input
                    type="text"
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleInputChange}
                  />
                </Field>
                <Field label="ZIP Code">
                  <Input
                    type="text"
                    name="address.zipCode"
                    value={formData.address.zipCode}
                    onChange={handleInputChange}
                  />
                </Field> */}
              </div>
            </div>

            {/* Amenities */}
            {/* <div className="flex flex-col gap-6">
              <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100">
                Amenities
              </h2>

              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {AMENITIES.map((amenity) => (
                    <label
                      key={amenity}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.amenities.includes(amenity)}
                        onChange={() => handleAmenityToggle(amenity)}
                        className="rounded border-gray-300 dark:border-gray-700 text-blue-600 focus:ring-blue-500 dark:bg-gray-800"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {amenity}
                      </span>
                    </label>
                  ))}
                </div>
              </div> */}

            {/* <Field label="Pool Rules">
                <textarea
                  name="rules"
                  rows={4}
                  value={formData.rules}
                  onChange={handleInputChange}
                  className="w-full border border-gray-200 dark:border-gray-900 rounded-2xl p-4 bg-surface text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus-visible:border-blue-500 focus-visible:ring-blue-500/50 focus-visible:ring-[3px] focus:outline-none resize-none"
                  placeholder="List any rules or restrictions for pool use..."
                />
              </Field> */}
          </div>

          {/* Availability */}
          {/* <div className="flex flex-col gap-6">
            <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100">
              Availability
            </h2>

            {/* <div className="flex flex-col gap-4">
                {Object.entries(formData.availability).map(
                  ([day, schedule]) => (
                    <div
                      key={day}
                      className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-900 rounded-2xl bg-surface"
                    >
                      <div className="flex-1">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={schedule.available}
                            onChange={(e) =>
                              handleAvailabilityChange(
                                day as keyof PoolForm["availability"],
                                "available",
                                e.target.checked
                              )
                            }
                            className="rounded border-gray-300 dark:border-gray-700 text-blue-600 focus:ring-blue-500 dark:bg-gray-800"
                          />
                          <span className="text-sm font-medium capitalize text-gray-900 dark:text-gray-100">
                            {day}
                          </span>
                        </label>
                      </div>

                      {schedule.available && (
                        <div className="flex items-center gap-2">
                          <input
                            type="time"
                            value={schedule.startTime}
                            onChange={(e) =>
                              handleAvailabilityChange(
                                day as keyof PoolForm["availability"],
                                "startTime",
                                e.target.value
                              )
                            }
                            className="border border-gray-200 dark:border-gray-900 rounded-xl px-3 py-2 bg-surface text-gray-900 dark:text-gray-100 focus-visible:border-blue-500 focus-visible:ring-blue-500/50 focus-visible:ring-[3px] focus:outline-none"
                          />
                          <span className="text-gray-500 dark:text-gray-400">
                            to
                          </span>
                          <input
                            type="time"
                            value={schedule.endTime}
                            onChange={(e) =>
                              handleAvailabilityChange(
                                day as keyof PoolForm["availability"],
                                "endTime",
                                e.target.value
                              )
                            }
                            className="border border-gray-200 dark:border-gray-900 rounded-xl px-3 py-2 bg-surface text-gray-900 dark:text-gray-100 focus-visible:border-blue-500 focus-visible:ring-blue-500/50 focus-visible:ring-[3px] focus:outline-none"
                          />
                        </div>
                      )}
                    </div>
                  )
                )}
              </div> */}
          {/* </div> */}

          {/* Additional Information */}
          {/* <div className="flex flex-col gap-6">
              <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100">
                Additional Information
              </h2>

              <Field label="WiFi Password">
                <Input
                  type="text"
                  name="wifiPassword"
                  value={formData.wifiPassword}
                  onChange={handleInputChange}
                  placeholder="WiFi password to share with guests"
                />
              </Field>

              <Field label="Contact Instructions">
                <textarea
                  name="contactInstructions"
                  rows={4}
                  value={formData.contactInstructions}
                  onChange={handleInputChange}
                  className="w-full border border-gray-200 dark:border-gray-900 rounded-2xl p-4 bg-surface text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus-visible:border-blue-500 focus-visible:ring-blue-500/50 focus-visible:ring-[3px] focus:outline-none resize-none"
                  placeholder="How should guests contact you? Any special instructions for arrival, parking, etc."
                />
              </Field>
            </div>
          </div> */}

          {/* Submit Actions */}
          <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-800">
            <Link to="/manage/pools">
              <Button variant="secondary" disabled={isPending}>
                Cancel
              </Button>
            </Link>
            <Button type="submit" variant="primary" disabled={isPending}>
              {isPending ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
