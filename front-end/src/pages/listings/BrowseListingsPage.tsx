import { Link } from "@tanstack/react-router";
import { useState } from "react";

export const BrowseListingsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState<string>("all");
  const [featureFilter, setFeatureFilter] = useState<string[]>([]);

  // Mock data - in a real app, this would come from an API
  const listings = [
    {
      id: "1",
      name: "Beautiful Backyard Pool",
      description: "A stunning 20x40 pool with spa and outdoor kitchen",
      ownerName: "David Smith",
      location: "Miami, FL",
      pricePerHour: 35,
      rating: 4.8,
      reviewCount: 24,
      features: ["Heated", "Hot Tub", "Pool Bar", "Parking"],
      images: ["/api/placeholder/400/300"],
      available: true,
    },
    {
      id: "2",
      name: "Resort-Style Pool",
      description: "Olympic-sized pool with waterfall and grotto",
      ownerName: "Sarah Johnson",
      location: "Fort Lauderdale, FL",
      pricePerHour: 50,
      rating: 4.9,
      reviewCount: 31,
      features: ["Olympic Size", "Waterfall", "Grotto", "Parking"],
      images: ["/api/placeholder/400/300"],
      available: true,
    },
    {
      id: "3",
      name: "Cozy Family Pool",
      description: "Perfect for families with shallow end and slide",
      ownerName: "Mike Wilson",
      location: "Coral Gables, FL",
      pricePerHour: 25,
      rating: 4.6,
      reviewCount: 18,
      features: ["Shallow End", "Slide", "Family Friendly", "Parking"],
      images: ["/api/placeholder/400/300"],
      available: false,
    },
  ];

  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      listing.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPrice =
      priceFilter === "all" ||
      (priceFilter === "under30" && listing.pricePerHour < 30) ||
      (priceFilter === "30to50" &&
        listing.pricePerHour >= 30 &&
        listing.pricePerHour <= 50) ||
      (priceFilter === "over50" && listing.pricePerHour > 50);

    const matchesFeatures =
      featureFilter.length === 0 ||
      featureFilter.every((feature) => listing.features.includes(feature));

    return matchesSearch && matchesPrice && matchesFeatures;
  });

  const handleFeatureToggle = (feature: string) => {
    setFeatureFilter((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };

  const allFeatures = [
    "Heated",
    "Hot Tub",
    "Pool Bar",
    "Olympic Size",
    "Waterfall",
    "Shallow End",
    "Slide",
    "Parking",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Browse Pools</h1>
        <p className="text-gray-600">
          Find the perfect pool for your next gathering
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="space-y-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <input
              type="text"
              placeholder="Search by pool name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Price Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range
            </label>
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Prices</option>
              <option value="under30">Under $30/hour</option>
              <option value="30to50">$30-$50/hour</option>
              <option value="over50">Over $50/hour</option>
            </select>
          </div>

          {/* Features Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Features
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {allFeatures.map((feature) => (
                <label key={feature} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={featureFilter.includes(feature)}
                    onChange={() => handleFeatureToggle(feature)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{feature}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div>
        <p className="text-sm text-gray-600 mb-4">
          {filteredListings.length} pool
          {filteredListings.length !== 1 ? "s" : ""} found
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={listing.images[0]}
                  alt={listing.name}
                  className="w-full h-48 object-cover"
                />
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">
                      {listing.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      by {listing.ownerName}
                    </p>
                    <p className="text-sm text-gray-500">{listing.location}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm font-medium text-gray-900">
                      {listing.rating}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({listing.reviewCount})
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mt-2">
                  {listing.description}
                </p>

                <div className="mt-3">
                  <div className="flex flex-wrap gap-1">
                    {listing.features.slice(0, 3).map((feature) => (
                      <span
                        key={feature}
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {feature}
                      </span>
                    ))}
                    {listing.features.length > 3 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                        +{listing.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-gray-900">
                      ${listing.pricePerHour}
                    </span>
                    <span className="text-sm text-gray-500">/hour</span>
                  </div>
                  <div className="flex space-x-2">
                    {listing.available ? (
                      <Link
                        to="/listings/$listingId"
                        params={{ listingId: listing.id }}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                      >
                        View Details
                      </Link>
                    ) : (
                      <span className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-400 bg-gray-100">
                        Unavailable
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredListings.length === 0 && (
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
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No pools found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
