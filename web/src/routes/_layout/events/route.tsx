import { createFileRoute } from "@tanstack/react-router";
import { FC } from "react";
import { EventSearchPresenter } from "./-components";

const EventSearchContainer: FC = () => {
  return <EventSearchPresenter />;
};

export const Route = createFileRoute("/_layout/events")({
  component: EventSearchContainer,
});
