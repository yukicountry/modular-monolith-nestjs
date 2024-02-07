import { createFileRoute } from "@tanstack/react-router";
import { FC } from "react";
import { CreateEventPresenter } from "./-components";

const CreateEventContainer: FC = () => {
  return <CreateEventPresenter />;
};

export const Route = createFileRoute("/_layout/events/create")({
  component: CreateEventContainer,
});
