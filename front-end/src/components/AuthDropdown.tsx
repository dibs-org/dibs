import { UserCircle } from "lucide-react";
import { useAuthUser } from "../services/auth/useAuthUserQuery";
import { useSignOut } from "../services/auth/useSignOut";
import Button from "./Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./DropdownMenu";
import { Link, useNavigate } from "@tanstack/react-router";
import LinkButton from "./LinkButton";

const AuthDropdown = () => {
  const navigate = useNavigate();
  const { data: user } = useAuthUser();
  const { mutate: signOut } = useSignOut({
    onSuccess: () => {
      navigate({ to: "/" });
    },
  });

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <LinkButton to="/signup" size="small" variant="tertiary">
          Sign up
        </LinkButton>
        <LinkButton to="/login" size="small" variant="primary">
          Log in
        </LinkButton>
      </div>
    );
  }

  return (
    <div className="flex gap-2 items-center">
      {user && (
        <span className="text-sm text-gray-500">
          {user.email || user.phone}
        </span>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            size="small"
            className="rounded-full w-[36px] p-1"
          >
            {user ? (
              <UserCircle className="w-4 h-4 text-blue-700 dark:text-blue-500" />
            ) : (
              <UserCircle className="w-4 h-4 text-gray-500" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                My Account
              </span>
              {user && (
                <span className="text-sm text-gray-500">
                  {user.email || user.phone}
                </span>
              )}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {user ? (
            <>
              <DropdownMenuItem onClick={() => signOut()}>
                Log out
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem asChild>
                <Link to="/login">Log in</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/signup">Sign up</Link>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AuthDropdown;
