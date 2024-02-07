import { createLazyFileRoute } from "@tanstack/react-router";
import { EventHistoriesPresenter } from "./-components";

const EventHistoriesContainer = () => <EventHistoriesPresenter />;

export const Route = createLazyFileRoute("/_layout/mypage/events")({
  component: EventHistoriesContainer,
});
