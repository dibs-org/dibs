import { createFileRoute } from "@tanstack/react-router";
import { ReservationFormContainer } from "../../pages/reserve/ReservationFormContainer";
import LinkButton from "../../components/LinkButton";

export const Route = createFileRoute("/reserve/$poolId")({
  component: () => {
    return (
      <div className="min-w-screen min-h-[calc(100vh-100px)] flex flex-col items-center justify-start p-4 pb-[78px]">
        <div className="flex gap-4 w-full justify-between">
          <LinkButton to="/" size="small" variant="tertiary">
            Back to home
          </LinkButton>
        </div>
        <ReservationFormContainer />
        <div />
      </div>
    );
  },
});
