import { Link } from "@tanstack/react-router";

export const ListingsPage = () => {
  // Mock data - in a real app, this would come from an API
  const listings = [
    {
      id: "1",
      name: "Beautiful Backyard Pool",
      description: "A stunning 20x40 pool with spa and outdoor kitchen",
      status: "active",
      reservations: 5,
      monthlyRevenue: 850,
      features: ["Heated", "Hot Tub", "Pool Bar"],
    },
    {
      id: "2",
      name: "Resort-Style Pool",
      description: "Olympic-sized pool with waterfall and grotto",
      status: "active",
      reservations: 8,
      monthlyRevenue: 1200,
      features: ["Olympic Size", "Waterfall", "Grotto"],
    },
    {
      id: "3",
      name: "Cozy Family Pool",
      description: "Perfect for families with shallow end and slide",
      status: "inactive",
      reservations: 0,
      monthlyRevenue: 0,
      features: ["Shallow End", "Slide", "Family Friendly"],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pool Listings</h1>
          <p className="text-gray-600">
            Manage your pool listings and availability
          </p>
        </div>
        <Link
          to="/manage/listings/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add New Listing
        </Link>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {listing.name}
                </h3>
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    listing.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {listing.status}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                {listing.description}
              </p>

              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {listing.features.map((feature) => (
                    <span
                      key={feature}
                      className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Reservations
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    {listing.reservations}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Monthly Revenue
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    ${listing.monthlyRevenue}
                  </p>
                </div>
              </div>

              <div className="flex space-x-2">
                <Link
                  to="/manage/listings/$listingId"
                  params={{ listingId: listing.id }}
                  className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Edit
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {listings.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No listings
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating your first pool listing.
          </p>
          <div className="mt-6">
            <Link
              to="/manage/listings/new"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Listing
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
