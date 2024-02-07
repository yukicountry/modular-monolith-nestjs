import { createLazyFileRoute } from "@tanstack/react-router";
import { FC } from "react";
import { MyFollowsPresenter } from "./-components";

export const MyFollowsContainer: FC = () => <MyFollowsPresenter />;

export const Route = createLazyFileRoute("/_layout/mypage/follows")({
  component: MyFollowsContainer,
});
