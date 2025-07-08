import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Star,
  MapPin,
  User,
  Flame,
  Waves,
  Wine,
  Car,
  Home,
} from "lucide-react";
import Heading from "../../components/Heading";
import Input from "../../components/Input";
import Field from "../../components/Field";
import { usePools } from "../../services/pools/usePools";

const fakeImages = [
  "https://fancyhouse-design.com/wp-content/uploads/2024/09/A-softly-bent-swimming-pool-adds-a-whimsical-element-to-the-compact-backyard-making-it-feel-larger-and-more-dynamic.jpg",
  "https://www.younghouselove.com/wp-content/uploads/2021/08/Pool-Post-Wide-Shot-Towards-House-No-People-Swimming-1024x768.jpg",
  "https://avreecustompools.com/wp-content/uploads/2024/06/Jimi-Smith-Photgoraphy7.jpg",
];

export const BrowsePoolsPage = () => {
  const { data: pools = [] } = usePools();

  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState<string>("all");
  const [featureFilter, setFeatureFilter] = useState<string[]>([]);

  // Mock data - in a real app, this would come from an API
  const poolItems: {
    id: string;
    name: string;
    description: string;
    ownerName: string;
    location: string;
    pricePerHour: number;
    rating: number;
    reviewCount: number;
    features: string[];
    images: string[];
    available: boolean;
  }[] = [
    // {
    //   id: "1",
    //   name: "Beautiful Backyard Pool",
    //   description: "A stunning 20x40 pool with spa and outdoor kitchen",
    //   ownerName: "David Smith",
    //   location: "Miami, FL",
    //   pricePerHour: 35,
    //   rating: 4.8,
    //   reviewCount: 24,
    //   features: ["Heated", "Hot Tub", "Pool Bar", "Parking"],
    //   images: [
    //     "https://fancyhouse-design.com/wp-content/uploads/2024/09/A-softly-bent-swimming-pool-adds-a-whimsical-element-to-the-compact-backyard-making-it-feel-larger-and-more-dynamic.jpg",
    //   ],
    //   available: true,
    // },
    // {
    //   id: "2",
    //   name: "Resort-Style Pool",
    //   description: "Olympic-sized pool with waterfall and grotto",
    //   ownerName: "Sarah Johnson",
    //   location: "Fort Lauderdale, FL",
    //   pricePerHour: 50,
    //   rating: 4.9,
    //   reviewCount: 31,
    //   features: ["Olympic Size", "Waterfall", "Grotto", "Parking"],
    //   images: [
    //     "https://avreecustompools.com/wp-content/uploads/2024/06/Jimi-Smith-Photgoraphy7.jpg",
    //   ],
    //   available: true,
    // },
    // {
    //   id: "3",
    //   name: "Cozy Family Pool",
    //   description: "Perfect for families with shallow end and slide",
    //   ownerName: "Mike Wilson",
    //   location: "Coral Gables, FL",
    //   pricePerHour: 25,
    //   rating: 4.6,
    //   reviewCount: 18,
    //   features: ["Shallow End", "Slide", "Family Friendly", "Parking"],
    //   images: [
    //     "https://www.younghouselove.com/wp-content/uploads/2021/08/Pool-Post-Wide-Shot-Towards-House-No-People-Swimming-1024x768.jpg",
    //   ],
    //   available: false,
    // },
    ...pools.map((pool, index) => ({
      ...pool,
      ownerName: pool.owner.name,
      location: pool.address,
      pricePerHour: 35,
      rating: 4.8,
      reviewCount: 24,
      features: ["Heated", "Hot Tub", "Pool Bar", "Parking"],
      available: true,
      images: [fakeImages[index % fakeImages.length]],
    })),
  ];

  const filteredPools = poolItems.filter((pool) => {
    const matchesSearch =
      pool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pool.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPrice =
      priceFilter === "all" ||
      (priceFilter === "under30" && pool.pricePerHour < 30) ||
      (priceFilter === "30to50" &&
        pool.pricePerHour >= 30 &&
        pool.pricePerHour <= 50) ||
      (priceFilter === "over50" && pool.pricePerHour > 50);

    const matchesFeatures =
      featureFilter.length === 0 ||
      featureFilter.every((feature) => pool.features.includes(feature));

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

  const getFeatureIcon = (feature: string) => {
    switch (feature) {
      case "Heated":
        return <Flame className="w-4 h-4 text-blue-600" />;
      case "Hot Tub":
        return <Waves className="w-4 h-4 text-blue-600" />;
      case "Pool Bar":
        return <Wine className="w-4 h-4 text-blue-600" />;
      case "Olympic Size":
        return <Waves className="w-4 h-4 text-blue-600" />;
      case "Waterfall":
        return <Waves className="w-4 h-4 text-blue-600" />;
      case "Shallow End":
        return <Waves className="w-4 h-4 text-blue-600" />;
      case "Slide":
        return <Waves className="w-4 h-4 text-blue-600" />;
      case "Parking":
        return <Car className="w-4 h-4 text-blue-600" />;
      default:
        return <Home className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <Heading
          as="h1"
          size="3xl"
          className="text-gray-900 dark:text-gray-100"
        >
          Browse Pools
        </Heading>
        <p className="text-gray-600 dark:text-gray-400">
          Find the perfect pool for your next gathering
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-surface border border-gray-200 dark:border-gray-900 rounded-2xl p-6">
        <div className="flex flex-col gap-6">
          {/* Search */}
          <Field label="Search">
            <Input
              type="text"
              placeholder="Search by pool name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Field>

          {/* Price Filter */}
          <Field label="Price Range">
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-800 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-surface"
            >
              <option value="all">All Prices</option>
              <option value="under30">Under $30/hour</option>
              <option value="30to50">$30-$50/hour</option>
              <option value="over50">Over $50/hour</option>
            </select>
          </Field>

          {/* Features Filter */}
          <Field label="Features">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {allFeatures.map((feature) => (
                <label
                  key={feature}
                  className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg border transition-colors ${
                    featureFilter.includes(feature)
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={featureFilter.includes(feature)}
                    onChange={() => handleFeatureToggle(feature)}
                    className="sr-only"
                  />
                  <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 border border-gray-300 dark:border-gray-700 rounded-lg p-1">
                    {getFeatureIcon(feature)}
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {feature}
                  </span>
                </label>
              ))}
            </div>
          </Field>
        </div>
      </div>

      {/* Results */}
      <div className="flex flex-col gap-6">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {filteredPools.length} pool
          {filteredPools.length !== 1 ? "s" : ""} found
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPools.map((pool) => (
            <div
              key={pool.id}
              className="bg-surface border border-gray-200 dark:border-gray-900 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={pool.images[0]}
                  alt={pool.name}
                  className="w-full h-48 object-cover"
                />
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <Heading as="h3" size="lg" className="mb-1">
                      {pool.name}
                    </Heading>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{pool.ownerName}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{pool.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {pool.rating}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      ({pool.reviewCount})
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {pool.description}
                </p>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {pool.features.slice(0, 3).map((feature) => (
                      <span
                        key={feature}
                        className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                      >
                        {feature}
                      </span>
                    ))}
                    {pool.features.length > 3 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400">
                        +{pool.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      ${pool.pricePerHour}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      /hour
                    </span>
                  </div>
                  {pool.available ? (
                    <Link
                      to="/pools/$poolId"
                      params={{ poolId: pool.id }}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
                    >
                      View Details
                    </Link>
                  ) : (
                    <span className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 text-sm font-medium rounded-xl text-gray-400 bg-gray-100 dark:bg-gray-800">
                      Unavailable
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPools.length === 0 && (
          <div className="text-center py-12 bg-surface border border-gray-200 dark:border-gray-900 rounded-2xl">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 text-gray-400 dark:text-gray-600">
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
            </div>
            <Heading as="h3" size="md" className="mb-2">
              No pools found
            </Heading>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Try adjusting your search criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
