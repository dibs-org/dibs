import { Link } from "@tanstack/react-router";
import { usePools } from "../../../services/pools/usePools";
import Button from "../../../components/Button";

export const ManagePoolsPage = () => {
  const { data: pools = [] } = usePools();

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            My Pools
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your pools and availability
          </p>
        </div>
        <Link to="/manage/pools/new">
          <Button variant="primary">Add pool</Button>
        </Link>
      </div>

      {/* Pools Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {pools.map((pool) => (
          <div
            key={pool.id}
            className="bg-surface border border-gray-200 dark:border-gray-900 rounded-2xl overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                {pool.name || pool.address}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-400">
                {pool.description}
              </p>

              <pre className="text-xs">{pool.id}</pre>

              {/* <div className="flex flex-wrap gap-2">
                {pool.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                  >
                    {amenity}
                  </span>
                ))}
              </div> */}

              <Link
                to="/manage/pools/$poolId"
                params={{ poolId: pool.id }}
                className="w-full"
              >
                <Button variant="secondary" className="w-full">
                  Edit
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {pools.length === 0 && (
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
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
            No pools
          </h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Get started by creating your first pool pool.
          </p>
          <div className="mt-6">
            <Link to="/manage/pools/new">
              <Button variant="primary">Add Pool</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
