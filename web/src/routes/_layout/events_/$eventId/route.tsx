import { EventDetailPresenter } from "@/routes/_layout/events_/$eventId/-components";
import { createFileRoute } from "@tanstack/react-router";
import { FC } from "react";

const EventDetailContainer: FC = () => {
  return <EventDetailPresenter />;
};

export const Route = createFileRoute("/_layout/events/$eventId")({
  component: EventDetailContainer,
});
