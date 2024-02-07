import { FC } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { GroupDetailPresenter } from "./-components";

const GroupDetailContainer: FC = () => {
  return <GroupDetailPresenter />;
};

export const Route = createFileRoute("/_layout/groups/$groupId")({
  component: GroupDetailContainer,
});
