import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/mypage/")({
  beforeLoad: () => {
    throw redirect({ to: "/mypage/events" });
  },
});
