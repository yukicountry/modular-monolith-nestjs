import { createFileRoute } from "@tanstack/react-router";
import { FC } from "react";
import { MyGroupsPresenter } from "./-components/MyGroupsPresenter/MyGroupsPresenter";

const MyGroupsContainer: FC = () => {
  return <MyGroupsPresenter />;
};

export const Route = createFileRoute("/_layout/mypage/groups")({
  component: MyGroupsContainer,
});
