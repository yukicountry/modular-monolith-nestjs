import { FC } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { CreateGroupPresenter } from "./-components";
import { useCreateGroupPresenter } from "./-hooks/useCreateGroupPresenter";

const CreateGroupContainer: FC = () => {
  return <CreateGroupPresenter {...useCreateGroupPresenter()} />;
};

export const Route = createLazyFileRoute("/_layout/groups/create")({
  component: CreateGroupContainer,
});
