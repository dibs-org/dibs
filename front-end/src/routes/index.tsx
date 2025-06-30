import { createFileRoute, Link } from "@tanstack/react-router";
import Button, { makeButtonClasses } from "../components/Button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../components/Drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/Dialog";
import { useAuthUser } from "../services/auth/useAuthUser";
import { useSignOut } from "../services/auth/useSignOut";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data: user } = useAuthUser();
  const { mutate: signOut } = useSignOut();

  return (
    <div className="w-screen min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-start gap-4 max-w-4xl w-full p-4">
        <div className="flex gap-2 items-center justify-between w-full">
          <h3 className="text-2xl font-semibold mb-4">Pool reservation 🏖️</h3>
          {user && (
            <div className="flex gap-2 items-center">
              Welcome {user.email || user.phone}
              <Button
                variant="secondary"
                size="small"
                onClick={() => signOut()}
              >
                Sign out
              </Button>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-8 w-full">
          <div className="w-full">
            <span className="text-sm text-gray-500 font-medium">Auth</span>
            <div className="flex flex-col gap-3 w-full mt-2">
              <Link to="/login-phone" className={makeButtonClasses()}>
                Login with phone
              </Link>
              <Link to="/login" className={makeButtonClasses()}>
                Login
              </Link>
              <Link to="/signup" className={makeButtonClasses()}>
                Signup
              </Link>
            </div>
          </div>

          <div className="w-full">
            <span className="text-sm text-gray-500 font-medium">Owner</span>
            <div className="flex flex-col gap-3 w-full mt-2">
              <Link to="/manage" className={makeButtonClasses()}>
                Owner dashboard
              </Link>
              <Link to="/manage/pools" className={makeButtonClasses()}>
                Manage pools
              </Link>
              <Link to="/manage/pools/new" className={makeButtonClasses()}>
                Create pool
              </Link>
              <Link to="/manage/reservations" className={makeButtonClasses()}>
                Manage reservations
              </Link>
            </div>
          </div>

          <div className="w-full">
            <span className="text-sm text-gray-500 font-medium">Renter</span>
            <div className="flex flex-col gap-3 w-full mt-2">
              <Link
                to="/reserve/$poolId"
                params={{ poolId: "04011455-c63b-445c-8426-aa21fbe5c2ff" }}
                className={makeButtonClasses()}
              >
                Reserve
              </Link>
              <Link to="/reservations" className={makeButtonClasses()}>
                Reservations
              </Link>
            </div>
          </div>
        </div>

        {/* <Link to="/pools">Browse pools (future)</Link>
        <Link to="/pools/$listingId" params={{ listingId: "1" }}>
          Listing details (future)
        </Link> */}
        <Drawer>
          <DrawerTrigger className={makeButtonClasses()}>
            Open drawer
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Welcome to the Drawer</DrawerTitle>
              <DrawerDescription>
                Explore the options available to you.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button variant="primary" className="w-full">
                Proceed
              </Button>
              <DrawerClose>
                <Button className="w-full">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Dialog>
          <DialogTrigger className={makeButtonClasses()}>
            Open dialog
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle size="xl">Welcome to the Dialog</DialogTitle>
              <DialogDescription>
                Here you can find more information and options.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
