import { useParams } from "@tanstack/react-router";
import LinkButton from "../../components/LinkButton";
import Heading from "../../components/Heading";
import {
  Flame,
  Waves,
  Wine,
  ChefHat,
  Armchair,
  Car,
  Wifi,
  Bath,
  Shirt,
  LifeBuoy,
  Home,
  DoorOpen,
  Star,
  MapPin,
  User,
} from "lucide-react";
import { usePool } from "../../services/pools/usePool";

export const PoolDetailPage = () => {
  const { poolId } = useParams({ from: "/pools/$poolId" });
  const { data: poolDetails } = usePool({ poolId: poolId! });

  // Mock data - in a real app, this would be fetched based on poolId
  const poolData = {
    id: poolId,
    name: poolDetails?.name,
    description:
      "A stunning 20x40 pool with spa and outdoor kitchen. Perfect for family gatherings, birthday parties, or just relaxing with friends. The pool is heated year-round and features a beautiful waterfall feature.",
    ownerName: poolDetails?.owner?.name,
    location: poolDetails?.address,
    address: poolDetails?.address,
    rating: 4.8,
    reviewCount: 24,
    features: [
      "Heated Pool",
      "Hot Tub/Spa",
      "Pool Bar",
      "Outdoor Kitchen",
      "BBQ Grill",
      "Poolside Seating",
      "Parking Available",
      "WiFi",
      "Bathroom Access",
    ],
    amenities: [
      "Towels Provided",
      "Pool Floats",
      "Pool Noodles",
      "Changing Room",
    ],
    rules: [
      "No glass containers in pool area",
      "Children must be supervised at all times",
      "No smoking in pool area",
      "Music volume must be respectful to neighbors",
      "Maximum 8 guests",
    ],
    images: [
      "https://fancyhouse-design.com/wp-content/uploads/2024/09/A-softly-bent-swimming-pool-adds-a-whimsical-element-to-the-compact-backyard-making-it-feel-larger-and-more-dynamic.jpg",
      "https://avreecustompools.com/wp-content/uploads/2024/06/Jimi-Smith-Photgoraphy7.jpg",
      "https://www.younghouselove.com/wp-content/uploads/2021/08/Pool-Post-Wide-Shot-Towards-House-No-People-Swimming-1024x768.jpg",
    ],
    availableDays: [1, 2, 3, 4, 5], // Monday to Friday
    availableHours: { start: "08:00", end: "20:00" },
  };

  const getFeatureIcon = (feature: string) => {
    switch (feature) {
      case "Heated Pool":
        return <Flame className="w-4 h-4 text-blue-600" />;
      case "Hot Tub/Spa":
        return <Waves className="w-4 h-4 text-blue-600" />;
      case "Pool Bar":
        return <Wine className="w-4 h-4 text-blue-600" />;
      case "Outdoor Kitchen":
        return <ChefHat className="w-4 h-4 text-blue-600" />;
      case "BBQ Grill":
        return <Flame className="w-4 h-4 text-blue-600" />;
      case "Poolside Seating":
        return <Armchair className="w-4 h-4 text-blue-600" />;
      case "Parking Available":
        return <Car className="w-4 h-4 text-blue-600" />;
      case "WiFi":
        return <Wifi className="w-4 h-4 text-blue-600" />;
      case "Bathroom Access":
        return <Bath className="w-4 h-4 text-blue-600" />;
      default:
        return <Home className="w-4 h-4 text-blue-600" />;
    }
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "Towels Provided":
        return <Shirt className="w-4 h-4 text-green-600" />;
      case "Pool Floats":
        return <LifeBuoy className="w-4 h-4 text-green-600" />;
      case "Pool Noodles":
        return <Waves className="w-4 h-4 text-green-600" />;
      case "Changing Room":
        return <DoorOpen className="w-4 h-4 text-green-600" />;
      default:
        return <Home className="w-4 h-4 text-green-600" />;
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto pb-20 md:pb-0">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Heading
          as="h1"
          size="3xl"
          className="text-gray-900 dark:text-gray-100"
        >
          {poolData.name}
        </Heading>
        <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {poolData.rating}
            </span>
            <span>({poolData.reviewCount} reviews)</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{poolData.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>Hosted by {poolData.ownerName}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Images */}
          <div className="bg-surface border border-gray-200 dark:border-gray-900 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
              <img
                src={poolData.images[0]}
                alt={poolData.name}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="grid grid-cols-2 gap-2">
                {poolData.images.slice(1).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${poolData.name} ${index + 2}`}
                    className="w-full h-31 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-surface border border-gray-200 dark:border-gray-900 rounded-2xl p-6">
            <Heading as="h2" size="lg" className="mb-4">
              About this pool
            </Heading>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {poolData.description}
            </p>
          </div>

          {/* Features */}
          <div className="bg-surface border border-gray-200 dark:border-gray-900 rounded-2xl p-6">
            <Heading as="h2" size="lg" className="mb-6">
              What this place offers
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {poolData.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 mt-0.5 border border-gray-300 dark:border-gray-700 rounded-lg p-1">
                    {getFeatureIcon(feature)}
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {feature}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-surface border border-gray-200 dark:border-gray-900 rounded-2xl p-6">
            <Heading as="h2" size="lg" className="mb-6">
              Included amenities
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {poolData.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 mt-0.5 border border-gray-300 dark:border-gray-700 rounded-lg p-1">
                    {getAmenityIcon(amenity)}
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {amenity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rules */}
          <div className="bg-surface border border-gray-200 dark:border-gray-900 rounded-2xl p-6">
            <Heading as="h2" size="lg" className="mb-3">
              Pool rules
            </Heading>
            <div className="flex flex-col gap-1">
              {poolData.rules.map((rule, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {rule}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Card */}
        <div className="lg:col-span-1 hidden lg:block">
          <div className="bg-surface border border-gray-200 dark:border-gray-900 rounded-2xl p-6 sticky top-4">
            <div className="flex flex-col gap-6">
              {/* <div className="flex items-baseline gap-2">
                <Heading
                  as="h3"
                  size="2xl"
                  className="text-gray-900 dark:text-gray-100"
                >
                  ${poolData.pricePerHour}
                </Heading>
                <span className="text-gray-400 dark:text-gray-400">
                  per hour
                </span>
              </div> */}

              <LinkButton
                href={`/reserve/${poolId}`}
                variant="primary"
                className="w-full"
              >
                Reserve Now
              </LinkButton>

              <div className="flex flex-col gap-2 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  You won't be charged yet
                </p>
                <div className="flex items-center justify-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{poolData.rating}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    · {poolData.reviewCount} reviews
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Footer for Mobile */}
        <div className="fixed md:relative bottom-0 left-0 right-0 pt-8 md:pt-6 p-4 md:p-6 bg-gradient-to-b from-transparent to-30% to-bg-default md:bg-transparent md:from-transparent md:to-transparent block lg:hidden">
          <LinkButton
            href={`/reserve/${poolId}`}
            variant="primary"
            className="w-full"
          >
            Reserve Now
          </LinkButton>
        </div>
      </div>
    </div>
  );
};
