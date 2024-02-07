import { createFileRoute } from "@tanstack/react-router";
import { useLocalAuthState } from "@/shared/hooks/useLocalAuthState";
import { redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/groups/create")({
  beforeLoad: async ({ location }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const localAuthState = useLocalAuthState();

    if (!localAuthState.existsLocalAuthState()) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});
