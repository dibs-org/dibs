import { Link } from "@tanstack/react-router";
import { useListings } from "../../services/listing/useListings";

export const ManageListingsPage = () => {
  const { data: listings = [] } = useListings();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">My Listings</h1>
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
            className="bg-surface overflow-hidden shadow rounded-lg"
          >
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">{listing.name}</h3>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                {listing.description}
              </p>

              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {listing.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <Link
                  to="/manage/listings/$listingId"
                  params={{ listingId: listing.id }}
                  className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-surface hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
          <h3 className="mt-2 text-sm font-medium">No listings</h3>
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
