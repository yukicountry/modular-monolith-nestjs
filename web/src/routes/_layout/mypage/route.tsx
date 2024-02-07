import { createFileRoute, redirect } from "@tanstack/react-router";
import { FC } from "react";
import { MyPagePresenter } from "./-components";
import { useLocalAuthState } from "@/shared/hooks/useLocalAuthState";
import { useMyPagePresenter } from "./-hooks";

const MyPageContainer: FC = () => <MyPagePresenter {...useMyPagePresenter()} />;

export const Route = createFileRoute("/_layout/mypage")({
  component: MyPageContainer,
  beforeLoad: async ({ location }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const localAuthState = useLocalAuthState();

    if (!localAuthState.existsLocalAuthState()) {
      throw redirect({
        to: "/login",
        search: {
          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: location.href,
        },
      });
    }
  },
});
